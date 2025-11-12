// import Gallery from "@/template/components/index/Gallery";
import PageTitle from "@/components/template/index/PageTitle";
import Header from "@/components/module/Header";
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
      <main>
        <section className="mt-5">
          <div className="flex items-center mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px]">
            <PageTitle />
            {/* <Gallery /> */}
          </div>
        </section>
      </main>
    </>
  );
}
