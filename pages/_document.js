import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="google-site-verification"
            content="heGqArkiwYNAQgzcJxjgh6QFvCxpHSCbVdwTwjYlowM"
          />
          <meta name="theme-color" content="#16a34a" />

          <link rel="icon" type="image/svg+xml" href="/last-logo.svg"></link>
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
