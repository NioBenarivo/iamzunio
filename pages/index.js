import Link from "next/link";

export default function Portfolio() {
  return (
    <div>
      <div className="landing-page">
        <h1>Hi 👋! Welcome to my depository.</h1>
        <p>You will find all of my personal writings and research here:</p>
        <ul>
          <li>
            Profile -{" "}
            <Link href="/profile">
              <a>Everything about me</a>
            </Link>
          </li>
          <li>
            Books & Blogs -{" "}
            <Link href="/media">
              <a>Personal blogs and notes of books read</a>
            </Link>
          </li>
        </ul>
        <div className="divider" />
        <div>
          <p>Follow me on my social platforms:</p>
          <ul>
            <li>
              <Link
                href="https://medium.com/@zunibenarivo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <a>Medium</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="divider" />
        <div>
          <p>or you can support me for my work here:</p>
          <ul>
            <li>
              <Link
                href="https://paypal.me/NioBen?country.x=ID&locale.x=id_ID"
                target="_blank"
                rel="noopener noreferrer"
              >
                <a>Paypal</a>
              </Link>
            </li>
            <li>
              <Link
                href="https://trakteer.id/zunio-benarivo-7t5wl/tip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <a>Trakteer</a>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.patreon.com/NioBen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <a>Patreon</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
