import Link from 'next/link';
import { IoDocument, IoBookOutline } from 'react-icons/io5';

export default function Portfolio() {
  return (
    <div>
      <div className="landing-page">
        <Link href="/profile">
          <a style={{ cursor: 'pointer' }}>
            <IoDocument size={48} title="Profile" />
            <h2>Profile</h2>
            <p>Everything about me on this journey of life</p>
          </a>
        </Link>
        <Link href="/media">
          <a style={{ cursor: 'pointer' }}>
            <IoBookOutline size={48} title="Books" />
            <h2>Books</h2>
            <p>Content of knowledge accumulated of books I've read</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
