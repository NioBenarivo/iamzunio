import classNames from 'classnames';
import styles from './NotionText.module.css';

const NotionText = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={`${value}-${index}`}
        className={classNames(styles[color], {
          [styles.bold]: bold,
          [styles.code]: code,
          [styles.italic]: italic,
          [styles.strikethrough]: strikethrough,
          [styles.underline]: underline,
        })}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export default NotionText;