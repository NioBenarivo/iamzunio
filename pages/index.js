import Link from 'next/link';
import { useDarkmodeContext } from '@context/darkModeProvider'
import { IoDocument, IoBookOutline } from 'react-icons/io5';

export default function Portfolio() {
  const { darkmode } = useDarkmodeContext()
  const themeClassname = darkmode ? 'dark-mode' : 'light-mode';

  return (
    <div className={themeClassname}>
      <div className='landing-page'>
        <Link href='/media'>
          <a style={{ cursor: 'pointer' }}>
            <IoBookOutline size={48} title="Books" />
            <h2>Books</h2>
          </a>
        </Link>
        <Link href='/profile'>
          <a style={{ cursor: 'pointer' }}>
            <IoDocument size={48} title="Profile" />
            <h2>Profile</h2>
          </a>
        </Link>
      </div>
    </div>
  );
}