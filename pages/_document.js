import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="google-site-verification" content="heGqArkiwYNAQgzcJxjgh6QFvCxpHSCbVdwTwjYlowM" />
          <meta name="theme-color" content="#fff" />
          <script async src="https://boookito-analytics.iran.liara.run/tracker.js" data-ackee-server="https://boookito-analytics.iran.liara.run" data-ackee-domain-id="6e8a0110-3df3-4019-8033-5d5933b2d2cb"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument