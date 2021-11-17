import { Client } from '@notionhq/client';
import styles from 'styles/contentList.module.css';

const ContentList = ({ media }) => {
  const renderList = () => {
    const allMedia = media.map((item, index) => {
      const icon = item?.icon?.emoji;
      const properties = item?.properties || {};
      const name = properties?.Name?.title[0]?.plain_text || '';
      const type = properties?.Type?.select?.name || '';
      const status = properties?.Status?.select?.name || '';
      const year = properties?.Year?.multi_select[0]?.name || '';
      const author = properties?.Author?.rich_text[0]?.plain_text || '';

      return (
        <div className={styles.item} key={index}>
          <div className={styles.itemHeader}>
            <div className={styles.itemIcon}>{icon}</div>{' '}
            <h5 className={styles.itemTitle}>{name}</h5>
          </div>
          <div className={styles.itemWrapper}>
            <span className={styles.sub}>Author: <b>{author}</b></span>
            <span className={styles.sub}>Year: <b>{year}</b></span>
          </div>
          <div className={styles.itemWrapper}>
            <span className={styles.itemType}>{type}</span>
            <span className={styles.itemStatus}>{status}</span>
          </div>
        </div>
      )
    })

    return allMedia;
  }

  return <div className={styles.container}>{renderList()}</div>
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  // Get books database list
  const databaseId = process.env.NOTION_MEDIA_ID;
  const response = await notion.databases.query({
    database_id: databaseId
  })

  return {
    props: {
      media: response?.results || [],
    }
  }
}

export default ContentList;