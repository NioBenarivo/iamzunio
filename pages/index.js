import Link from 'next/link';

export default function Portfolio() {
  return (
    <div>
      <div className="landing-page">
        <h1>Hi 👋! Welcome to my depository.</h1>
        <p>You will find all of my personal writings and research here:</p>
        <ul>
          <li>
            Profile -{' '}
            <Link href="/profile">
              <a style={{ cursor: 'pointer' }}>
                <p>Everything about me on this journey of life</p>
              </a>
            </Link>
          </li>
          <li>
            Books -{' '}
            <Link href="/media">
              <a style={{ cursor: 'pointer' }}>
                <p>Content of knowledge accumulated of books I've read</p>
              </a>
            </Link>
          </li>
        </ul>
        <div className="divider" />
        <div>
          <p>Please help support me for my work:</p>
          <ul>
            <li>
              <a
                href="https://paypal.me/NioBen?country.x=ID&locale.x=id_ID"
                target="_blank"
                rel="noopener noreferrer">
                <p>Paypal</p>
              </a>
            </li>
            <li>
              <a
                href="https://trakteer.id/zunio-benarivo-7t5wl/tip"
                target="_blank"
                rel="noopener noreferrer">
                <p>Trakteer</p>
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  );
}
