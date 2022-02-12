import {
  SiZeit,
  SiGithub,
  SiLinkedin,
  SiNextDotJs,
  SiFramer,
  SiNotion,
} from "react-icons/si";
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="flex items-center justify-center">
        <p className="m0">© 2021 Zunio Benarivo</p>
      </div>
      <div className={styles.poweredBy}>
        <p>Powered by</p>
        <SiZeit size={24} title="Vercel" />
        <SiNextDotJs size={24} title="NextJS" />
        <SiFramer size={24} title="Framer Motion" />
        <SiNotion size={24} title="Notion API" />
      </div>
      <div className="flex items-center justify-center">
        <a
          href="https://github.com/NioBenarivo"
          className="mr1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub size={24} title="Github" />
        </a>
        <a
          href="https://www.linkedin.com/in/zunio-benarivo-954679118/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLinkedin size={24} title="LinkedIn" />
        </a>
      </div>
    </div>
  );
}
