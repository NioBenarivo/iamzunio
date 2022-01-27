import Head from 'next/head';
import { mediaStatus } from 'constants/mediaStatus';
import { getDatabase, databaseId } from 'notion';
import styles from 'styles/contentList.module.css';
import MediaItem from './MediaItem';

const MediaList = ({ media, finished, reading, summary }) => {
  return (
    <>
      <Head>
        <title>Media</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div style={{ width: '100%' }}>
          <h2>Reading</h2>
          <MediaItem list={reading} />
        </div>
        <div style={{ width: '100%' }}>
          <h2>Finished</h2>
          <MediaItem list={finished} />
        </div>
        <div style={{ width: '100%' }}>
          <h2>Others</h2>
          <MediaItem list={summary} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  // Get books database list
  const options = {
    sorts: [
      {
        property: 'Type',
        timestamp: 'created_time',
        direction: 'descending'
      }
    ]
  };
  const response = await getDatabase(databaseId, options);
  const allMedia = response?.results || [];
  const finished =
    allMedia.filter((item) => item?.properties?.Status?.select?.name === mediaStatus.finished) ||
    [];
  const reading =
    allMedia.filter((item) => item?.properties?.Status?.select?.name === mediaStatus.reading) || [];
  const summary =
    allMedia.filter((item) => item?.properties?.Status?.select?.name === mediaStatus.todo) || [];

  return {
    props: {
      media: allMedia,
      finished: finished,
      reading: reading,
      summary: summary
    },
    revalidate: 10
  };
}

export default MediaList;
