import { Client } from '@notionhq/client';
import Link from 'next/link';
import styles from 'styles/contentList.module.css';
import { useDarkmodeContext } from '@context/darkModeProvider'

const MediaList = ({ media }) => {
  const { darkmode, toggleMode } = useDarkmodeContext()
  const themeClassname = darkmode ? 'dark-mode' : 'light-mode';
  // console.log(media, "MEDIA")
  const renderList = () => {
    const allMedia = media?.map((item, index) => {
      const icon = item?.icon?.emoji;
      const properties = item?.properties || {};
      const name = properties?.Name?.title[0]?.plain_text || '';
      const type = properties?.Type?.select?.name || '';
      const status = properties?.Status?.select?.name || '';
      const year = properties?.Year?.multi_select[0]?.name || '';
      const author = properties?.Author?.rich_text[0]?.plain_text || '';
      const mediaID = item?.id;

      const ready = status === 'Finished' || status === 'Reading';

      const content = (
        <>
          <div className={styles.itemHeader}>
            <div className={styles.itemIcon}>{icon}</div>{' '}
            <h5 className={styles.itemTitle}>{name}</h5>
          </div>
          <div className={styles.itemWrapper}>
            <span className={styles.sub}>Author: <b>{author}</b></span>
            <span className={styles.sub}>Year: <b>{year}</b></span>
          </div>
          <div className={styles.itemWrapper}>
            {/* <span className={styles.itemType}>{type}</span> */}
            <span className={styles.itemStatus}>{status}</span>
          </div>
        </>
      )

      if (ready) {
        return (
          <Link 
            href={`/contents/${mediaID}`} 
            key={index}
          >
            <a className={styles.item}>
              {content}
            </a>
          </Link>
        )
      } else {
        return (
          <div className={styles.item} key={index}>
            {content}
          </div>
        )
      }
    })

    return allMedia;
  }

  return (
    <div className={themeClassname}>
      <div className={styles.container}>{renderList()}</div>
    </div>
  );
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

export default MediaList;