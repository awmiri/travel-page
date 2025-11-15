import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';
export default function Document() {
  return (

    <Html lang="fa" dir="rtl">
      <Head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="9c54dca6-ca0b-4a4d-b9a2-a43a95764bc3"
          strategy="afterInteractive"
        />
        <link rel="icon" href="/logo/logo.webp" type="image/png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
