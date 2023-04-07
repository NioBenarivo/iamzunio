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
              Everything about me
            </Link>
          </li>
          <li>
            Books & Blogs -{" "}
            <Link href="/media">
              Personal blogs and notes of books read
            </Link>
          </li>
          <li>
            Compounding Calculator -{" "}
            <Link href="/compounding">
              Calculate your goal to financial freedom!
            </Link>
          </li>
          {/* <li>
            Wedding -{" "}
            <Link href="/wedding">
              Zunio & Abong
            </Link>
          </li> */}
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
                Medium
              </Link>
            </li>
            <li>
              <Link
                href="https://zuniopicks.substack.com/?r=6x19k&utm_campaign=pub&utm_medium=web"
                target="_blank"
                rel="noopener noreferrer"
              >
                Substack
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
