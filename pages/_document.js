import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (

    <Html lang="fa" dir="rtl">
      <Head>
        <link rel="icon" href="/logo/logo.webp" type="image/png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
