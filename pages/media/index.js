import Head from 'next/head';
import { mediaStatus } from 'constants/mediaStatus';
import { getDatabase, databaseId } from 'notion';
import styles from 'styles/contentList.module.css';
import MediaItem from './MediaItem';

const MediaList = ({ finished, reading, summary }) => {
  return (
    <>
      <Head>
        <title>Media</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container}>
          <MediaItem title="Finished" list={finished} />
          <MediaItem title="Reading" list={reading} />
          <MediaItem title="No Summary" list={summary} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Get books database list
  const options = {
    sorts: [
      {
        property: 'Type',
        timestamp: 'created_time',
        direction: 'descending',
      }
    ]
  }
  const response = await getDatabase(databaseId, options);
  const allMedia = response?.results || [];
  const finished = allMedia.filter(item => item?.properties?.Status?.select?.name === mediaStatus.finished) || [];
  const reading = allMedia.filter(item => item?.properties?.Status?.select?.name === mediaStatus.reading) || [];
  const summary = allMedia.filter(item => item?.properties?.Status?.select?.name === mediaStatus.todo) || [];

  return {
    props: {
      media: allMedia,
      finished: finished,
      reading: reading,
      summary: summary,
    },
    revalidate: 1
  }
}

export default MediaList;