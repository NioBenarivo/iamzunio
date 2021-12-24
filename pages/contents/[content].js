import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { Client } from '@notionhq/client';
import ScrollArrow from 'components/ScrollToTop';
import NavBar from 'components/Navbar';
import NotionText from 'components/NotionText';
import styles from 'styles/contentList.module.css';
import { getBlocks, getPage, getDatabase, databaseId } from 'notion';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const MediaContent = ({ 
  pageData,
  blocksWithChildren,
}) => {
  const renderHead = () => {
    // Head Data
    const headData = pageData || {};
    const icon = headData.icon || {};
    const emoji = icon.emoji || '';

    const properties = headData.properties || {};
    const author = properties?.Author?.rich_text[0]?.plain_text || '';
    const year = properties?.Year?.multi_select[0]?.name || '';

    const title = headData.parent?.type === 'page_id' ? 
      properties?.title?.title[0]?.plain_text : properties?.Name?.title[0]?.plain_text;
    
    return (
      <div>
        <h1 className={styles.title}>{title}</h1>
        {
          headData.parent?.type !== 'page_id' &&
          <div className={styles.subtitle}>
            <span>{emoji}</span>
            <span>{author}</span>
            <span>{year}</span>
          </div>
        }
      </div>
    )
  }

  const renderBlock = (block) => {
    const { type, id: index } = block;
    const value = block[type];
    switch (type) {
      case "heading_1":
        return <h1 className={styles.heading1} key={index}>{value?.text[0].plain_text}</h1>;
      case "heading_2":
        return <h2 className={styles.heading2} key={index}>{value?.text[0].plain_text}</h2>;
      case "heading_3":
        return <h3 className={styles.heading3} key={index}>{value?.text[0].plain_text}</h3>;
      case 'bulleted_list_item':
        return (
          <ul key={index} className={styles.ul}>
            <li className={styles.li}>
              <NotionText text={value?.text} />
              {value?.children?.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </li>
          </ul>
        );
      case 'numbered_list_item':         
        return (
          <ul key={index} className={styles.ul}>
            <li className={styles.li}>
              <NotionText text={value?.text} />
              {value?.children?.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </li>
          </ul>
        );
      case 'quote': 
        return (
          <blockquote className='blockquote' key={index}>
            <p className={styles.paragraph}>
              <NotionText text={value?.text} />
            </p>
          </blockquote>
        );
      case 'callout':
        return (
          <div key={index} className='callout'>
            <span>{value?.icon?.emoji}</span>
            <p><NotionText text={value?.text} /></p>
          </div>
        );
      case 'paragraph':
        return (
          <p className={styles.paragraph} key={index}>
            <NotionText text={value?.text} />
          </p>
        );
      case 'image':
        const src =
          value.type === "external" ? value?.external?.url : value?.file?.url;
        const caption = value?.caption ? value?.caption[0]?.plain_text : "";
        return (
          <figure>
            <img src={src} alt={caption} />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      case 'child_page':
        return (
          <Link href={`/contents/${index}`}>
            <a className={styles.link}>{value?.title}</a>
          </Link>
        )
      default:
        return `❌ Not Yet Implemented (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
    }
  }
  
  const titleContent = pageData?.properties?.Name?.title[0]?.plain_text || '';
  return (
    <>
      <Head>
        <title>{titleContent}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <NavBar title={titleContent} />
        <div className={styles.contentWrapper}>
          {renderHead()}
          {blocksWithChildren?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        <ScrollArrow />
        </div>
      </div>
    </>
  )
}

const fetchBlocks = async (block) => {
  let fetchMoreBlocksCombined = [];

  const fetchSingleBlock = async (blockId, startCursor = undefined) => {
    try {
      let options;
      if (startCursor) {
        options = {
          block_id: blockId,
          start_cursor: startCursor
        }
      } else {
        options = {
          block_id: blockId
        }
      }
  
      const blocksData = await notion.blocks.children.list(options);
      fetchMoreBlocksCombined = [...fetchMoreBlocksCombined, ...blocksData?.results];
      if (!blocksData?.has_more) {
        return fetchMoreBlocksCombined;
      } else {
        return await fetchSingleBlock(blockId, blocksData?.next_cursor)
      }
    } catch (err) {
      console.log(err)
    }
  }

  await fetchSingleBlock(block);
  
  return fetchMoreBlocksCombined;
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.results.map((page) => ({ params: { content: page.id } })),
    fallback: true,
  };
};

export async function getStaticProps(context) {
  const { content } = context.params;
  const pageData = await getPage(content);
  const allBlocks = await fetchBlocks(content);

  const childBlocks = await Promise.all(
    allBlocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = allBlocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      pageData,
      blocksWithChildren
    }
  };
}

export default MediaContent;