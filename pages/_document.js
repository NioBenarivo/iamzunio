import Document, { Html, Head, Main, NextScript } from 'next/document';

const themeScript = `
(function () {
  document.documentElement.style.background = '#212529',
  document.documentElement.style.color = '#F8F9FA'
})();
`;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
