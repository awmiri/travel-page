import Header from "@/template/module/Header";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>سفرکن</title>
        <meta
          name="description"
          content="سفرکن، سامانه هوشمند رزرو بلیط هواپیما، قطار و اتوبوس با بهترین قیمت و پشتیبانی ۲۴ ساعته. سفرت رو سریع و مطمئن شروع کن!"
        />
      </Head>
      <header>
        <Header />
      </header>
    </>
  );
}
