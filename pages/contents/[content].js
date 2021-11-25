import { Fragment } from 'react';
import { Client } from '@notionhq/client';
import classNames from 'classnames';
import styles from 'styles/contentList.module.css';
import { getBlocks, getPage } from 'notion';

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
    const title = properties?.Name?.title[0]?.plain_text || '';
    const author = properties?.Author?.rich_text[0]?.plain_text || '';
    const year = properties?.Year?.multi_select[0]?.name || '';
    
    return (
      <div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subtitle}>
          <span>{emoji}</span>
          <span>{author}</span>
          <span>{year}</span>
        </div>
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
        const bulletedItems = value?.text?.map((bullet, idx) => {
          const bulletClass = classNames({
            'bold': bullet.annotations.bold,
            'italic': bullet.annotations.italic,
            'underline': bullet.annotations.underline
          })
  
          return <span key={idx} className={bulletClass}>{bullet.plain_text}</span>
        });
        return (
          <ul key={index} className={styles.ul}>
            <li className={styles.li}>
              {bulletedItems}
              {value?.children?.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </li>
          </ul>
        );
      case 'numbered_list_item': 
        const numberedItems = value?.text?.map((num, idx) => {
          const bulletClass = classNames({
            'bold': num.annotations.bold,
            'italic': num.annotations.italic,
            'underline': num.annotations.underline
          })
  
          return <span key={idx} className={bulletClass}>{num.plain_text}</span>
        });
        
        return (
          <ul key={index} className={styles.ul}>
            <li className={styles.li}>
              {numberedItems}
              {value?.children?.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </li>
          </ul>
        );
      case 'quote': 
        return (
          <blockquote className={styles.blockquote} key={index}>
            <p className={styles.paragraph}>{value?.text[0]?.plain_text}</p>
          </blockquote>
        );
      case 'callout':
        return (
          <div key={index} className={styles.callout}>
            <span>{value?.icon?.emoji}</span>
            <p>{value?.text[0].plain_text}</p>
          </div>
        );
      case 'paragraph':
        const paragraph = value?.text?.map((p, idx) => {
          const paragraphClass = classNames({
            'bold': p.annotations.bold,
            'italic': p.annotations.italic,
            'underline': p.annotations.underline
          })
  
          return <span key={idx} className={paragraphClass}>{p.plain_text}</span>
        });
        return <p className={styles.paragraph} key={index}>{paragraph}</p>;
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
      default:
        return `❌ Not Yet Implemented (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
    }
  }
  
  return (
    <div className={styles.content}>
      <div className={styles.contentWrapper}>
        {renderHead()}
        {blocksWithChildren?.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </div>
    </div>
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

export async function getServerSideProps(context) {
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