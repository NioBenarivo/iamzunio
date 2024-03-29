import Link from 'next/link';
import styles from 'styles/contentList.module.css';
import classNames from 'classnames';

const MediaItem = ({ list }) => {
  const renderMedia = () => {
    const allMedia = list?.map((item, index) => {
      const properties = item?.properties || {};
      const name = properties?.Name?.title[0]?.plain_text || '';
      const type = properties?.Type?.select?.name || '';
      const colorType = properties?.Type?.select?.color || '';
      const status = properties?.Status?.select?.name || '';
      const readingTime = properties?.['Reading Time']?.formula?.number || 0;
      const author = properties?.Author?.rich_text[0]?.plain_text || '';
      const mediaID = item?.id;

      const ready = status === 'Finished' || status === 'Reading';
      const content = (
        <>
          <div className={styles.mediaItemHeader}>
            <h5 className={styles.mediaItemTitle}>{name}</h5>
          </div>
          <span className={styles.sub}>by <b>{author}</b></span>
          <div className={styles.mediaItemWrapper}>
            <span className={classNames(styles.mediaItemType, styles[`notion-${colorType}`])}>
              {type}
            </span>
          </div>
          {readingTime !== 0 && (
          <div className={styles.mediaItemFooter}>
            <span className={styles.sub}>
              <b>{readingTime}</b> min read
            </span>
          </div>
          )}
        </>
      );

      if (ready) {
        return (
          <Link href={`/contents/${mediaID}`} key={index} className={styles.mediaItem}>
            {content}
          </Link>
        );
      } else {
        return;
      }
    });

    return allMedia;
  };

  return (
    <div className={styles.mediaSection}>
      {renderMedia()}
    </div>
  );
};

export default MediaItem;
