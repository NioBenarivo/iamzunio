import { Client } from '@notionhq/client';
import styles from 'styles/contentList.module.css';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const MediaContent = ({ pageData, allBlocks }) => {
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

  const renderContent = (block, index) => {
    const type = block.type;
    let el;
    if (type === 'heading_1') {
      el = <h1 className={styles.heading1} key={index}>{block.heading_1.text[0].plain_text}</h1>
    }

    if (type === 'heading_3') {
      el = <h3 key={index}>{block.heading_3.text[0].plain_text}</h3>
    }

    if (type === 'bulleted_list_item') {
      const bulletedItems = block?.bulleted_list_item?.text?.map((bullet, idx) => {
        const boldStyle = bullet.annotations.bold ? 'bold' : '';
        const italicStyle = bullet.annotations.italic ? 'italic' : '';
        const underlineStyle = bullet.annotations.underline ? 'underline' : '';
        const bulletClass = `${boldStyle} ${italicStyle} ${underlineStyle}`;

        return <span key={idx} className={bulletClass}>{bullet.plain_text}</span>
      });
      el = (
        <ul key={index} className={styles.ul}>
          <li className={styles.li}>{bulletedItems}</li>
        </ul>
      )
    }

    if (type === 'quote') {
      el = (
        <blockquote className={styles.blockquote} key={index}>
          <p className={styles.paragraph}>{block.quote.text[0].plain_text}</p>
        </blockquote>
      )
    }

    if (type === 'callout') {
      el = (
        <div key={index} className={styles.callout}>
          <span>{block.callout.icon.emoji}</span>
          <p>{block.callout.text[0].plain_text}</p>
        </div>
      )
    }

    if (type === 'paragraph') {
      const paragraph = block?.paragraph?.text?.map((p, idx) => {
        const boldStyle = p.annotations.bold ? 'bold' : '';
        const italicStyle = p.annotations.italic ? 'italic' : '';
        const underlineStyle = p.annotations.underline ? 'underline' : '';
        const paragraphClass = `${boldStyle} ${italicStyle} ${underlineStyle}`

        return <span key={idx} className={paragraphClass}>{p.plain_text}</span>
      });
      el = <p className={styles.paragraph} key={index}>{paragraph}</p>
    }

    return el;
  }
  
  return (
    <div className={styles.content}>
      <div className={styles.contentWrapper}>
        {renderHead()}
        {allBlocks.map((blockArray, index) => renderContent(blockArray, index))}
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const databaseId = process.env.NOTION_MEDIA_ID;
  const response = await notion.databases.query({
    database_id: databaseId
  })

  return {
    paths: response.results.map((page) => ({ params: { content: page.id } })),
    fallback: true,
  };
};

let allBlocks = [];
const fetchBlocks = async (blockId, startCursor) => {
  const options = {
    block_id: blockId,
    start_cursor: startCursor
  }
  const blocksData = await notion.blocks.children.list(options);
  allBlocks = [...blocksData?.results];

  if (!blocksData?.has_more) return allBlocks

  fetchBlocks(blockId, blocksData?.nextCursor)
}

export const getStaticProps = async (context) => {
  const { content } = context.params;
  let fetchMoreBlocks = [];

  const pageData = await notion.pages.retrieve({
    page_id: content
  })
  const initialBlocksData = await notion.blocks.children.list({
    block_id: content,
  });

  if (initialBlocksData?.has_more) {
    fetchMoreBlocks = await fetchBlocks(content, initialBlocksData?.next_cursor);
  }

  const allBlocks = [...initialBlocksData?.results, ...fetchMoreBlocks];

  return {
    props: {
      pageData,
      allBlocks,
    },
    revalidate: 1,
  };
};

export default MediaContent;