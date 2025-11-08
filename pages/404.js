import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import Header from '@/template/module/Header';
import Head from 'next/head';

function NotFoundPage() {
    return (
        <div>
            <Head>
                <title>404</title>
            </Head>
            <Header />
            <div className='flex flex-col items-center justify-center h-dvh -mt-22'>
                <div className="w-[400px] sm:w-[500px] md:w-[600px] lg:w-[800px]">
                    <DotLottieReact
                        src="https://lottie.host/a7a0d4b0-06da-4f81-b4a8-0de7801d1289/Psb96j6rFm.lottie"
                        loop
                        autoplay
                    />
                </div>
                <p className='font-iranYekanBold text-base md:text-xl mt-2 text-cusBlue'>متأسفیم! صفحه‌ای که به دنبال آن هستید پیدا نشد.</p>
                <Link href={"/"} className="button type1 mt-6">
                    <span className="btn-txt">رفتن به صفحه اصلی</span>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage