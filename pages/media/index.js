import { useDarkmodeContext } from '@context/darkModeProvider'
import { mediaStatus } from 'constants/mediaStatus';
import { getDatabase, databaseId } from 'notion';
import styles from 'styles/contentList.module.css';
import MediaItem from './MediaItem';

const MediaList = ({ finished, reading, summary }) => {
  const { darkmode } = useDarkmodeContext()
  const themeClassname = darkmode ? 'dark-mode' : 'light-mode';

  return (
    <div className={themeClassname}>
      <div className={styles.container}>
        <MediaItem title="Finished" list={finished} />
        <MediaItem title="Reading" list={reading} />
        <MediaItem title="No Summary" list={summary} />
      </div>
    </div>
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
    }
  }
}

export default MediaList;