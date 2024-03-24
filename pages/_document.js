import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Script async="" src="https://www.googletagmanager.com/gtag/js?id=G-6DCXD6R4FZ" />

          <Script dangerouslySetInnerHTML={{
            __html:`
            
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-6DCXD6R4FZ');
          

            `
          }}>


          </Script>
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="google-site-verification"
            content="heGqArkiwYNAQgzcJxjgh6QFvCxpHSCbVdwTwjYlowM"
          />
          <meta name="theme-color" content="#16a34a" />

          <link rel="icon" type="image/svg+xml" href="/images/logo.svg"></link>
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
