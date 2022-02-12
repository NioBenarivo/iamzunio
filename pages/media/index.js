import Head from 'next/head';
import { mediaStatus } from 'constants/mediaStatus';
import { getDatabase, databaseId } from 'notion';
import MediaItem from './MediaItem';
import styles from 'styles/contentList.module.css';

const MediaList = ({ books, blogs }) => {
  return (
    <>
      <Head>
        <title>Media</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.mediaWrapper}>
          <h2>Blogs</h2>
          <MediaItem list={blogs} />
        </div>
        <div className={styles.mediaWrapper}>
          <h2>Books</h2>
          <MediaItem list={books} />
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

  const books = allMedia.filter((item) => item?.properties?.Type?.select?.name === 'Book') || [];
  const blogs = allMedia.filter((item) => item?.properties?.Type?.select?.name === 'Blog') || [];

  return {
    props: {
      finished: finished,
      reading: reading,
      books,
      blogs,
    },
    revalidate: 10
  };
}

export default MediaList;
