import Gallery from "@/components/template/index/Gallery";
import PageTitle from "@/components/template/index/PageTitle";
import Header from "@/components/module/Header";
import Head from "next/head";
import FilterTravel from "@/components/template/index/FilterTravel";


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
      <main className="overflow-x-hidden">
        <section className="mt-5">
          <div className="flex max-query600:flex-col justify-between mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px] relative">
            <div className=" mt-7 max-query600:w-full">
              <PageTitle />
            </div>
            <div className="w-[370px] sm:w-[400px] md:w-[430px] query860:w-[490px] query1120:w-[540px] min-w-[370px] sm:min-w-[400px] md:min-w-[430px] query860:min-w-[490px] query1120:min-w-[540px] hidden query600:block">
              <Gallery />
            </div>
            <div className="query600:absolute max-query600:mt-8 bottom-0.5 md:bottom-8 right-1/35 sm:right-1/14 query1280:right-1/7">
              <FilterTravel />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
