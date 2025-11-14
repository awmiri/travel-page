import Image from 'next/image'
import React from 'react'
import Typewriter from 'typewriter-effect'
import Gallery from './Gallery'
function PageTitle() {
    return (
        <div className='h-full flex flex-col'>
            <div className=' border flex items-center gap-1.5 rounded-4xl py-2.5 px-3 bg-cusOrang/20 border-cusOrang/30 text-cusOrang w-[200px] query600:w-[170px] sm:w-[180px] md:w-[200px] query900:w-[240px]'>
                <Image src={"/header-img/sunrise.webp"} width={20} height={20} alt='sunrise' />
                <p className='text-[11px] query600:text-[9px] sm:text-[10px] md:text-[11px] text-nowrap query900:text-sm font-vazirBold'>بسیار سفر باید تا پخته شود خامی</p>
            </div>
            <h1 className='text-[25px] sm:text-[28px] md:text-[35px] query900:text-[45px] query1000:text-[55px] query1120:text-[65px] mt-7 font-vazirBold w-full query600:w-[180px] sm:w-[200px] md:w-[250px] query860:w-[320px] query1000:w-[420px] query1120:w-[453px] h-[90px] query400:h-[50px] query600:h-[120px] sm:h-[130px] md:h-[160px] query860:h-[210px] query1000:h-[250px] query1120:h-[293px]'>
                <Typewriter
                    options={{
                        strings: [
                            'دنیا را کشف کنید زندگی را <span class="text-cusBlue">تجربه</span> کنید'
                        ],
                        cursor: "|",
                        loop: true,
                        autoStart: true,
                        typeSpeed: 5,
                    }}
                />
            </h1>
            <div className='query600:hidden'>
                <Gallery />
            </div>
            <div className='flex items-center max-query600:justify-center max-query600:mt-7 flex-wrap gap-6'>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[65px] query600:w-[50px] query860:w-[60px] query900:w-[70px] h-[65px] query600:h-[50px] query860:h-[60px] query900:h-[70px] flex items-center justify-center border rounded-2xl query860:rounded-3xl border-[#40404040]/40 dark:border-[#FFFFFF40]/30 bg-white dark:bg-[#1E1E1E]'>
                        <Image src={"/header-img/tent.webp"} width={35} height={35} alt='tent' className='query600:w-[25px] query860:w-[35px] query600:h-[25px] query860:h-[35px]' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>کمپ</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[65px] query600:w-[50px] query860:w-[60px] query900:w-[70px] h-[65px] query600:h-[50px] query860:h-[60px] query900:h-[70px] flex items-center justify-center border rounded-2xl query860:rounded-3xl border-[#40404040]/40 dark:border-[#FFFFFF40]/30 bg-white dark:bg-[#1E1E1E]'>
                        <Image src={"/header-img/beach.webp"} width={35} height={35} alt='beach' className='query600:w-[25px] query860:w-[35px] query600:h-[25px] query860:h-[35px]' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>ساحل</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[65px] query600:w-[50px] query860:w-[60px] query900:w-[70px] h-[65px] query600:h-[50px] query860:h-[60px] query900:h-[70px] flex items-center justify-center border rounded-2xl query860:rounded-3xl border-[#40404040]/40 dark:border-[#FFFFFF40]/30 bg-white dark:bg-[#1E1E1E]'>
                        <Image src={"/header-img/city.webp"} width={35} height={35} alt='city' className='query600:w-[25px] query860:w-[35px] query600:h-[25px] query860:h-[35px]' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>شهر</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[65px] query600:w-[50px] query860:w-[60px] query900:w-[70px] h-[65px] query600:h-[50px] query860:h-[60px] query900:h-[70px] flex items-center justify-center border rounded-2xl query860:rounded-3xl border-[#40404040]/40 dark:border-[#FFFFFF40]/30 bg-white dark:bg-[#1E1E1E]'>
                        <Image src={"/header-img/mountain.webp"} width={35} height={35} alt='mountain' className='query600:w-[25px] query860:w-[35px] query600:h-[25px] query860:h-[35px]' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>جنگل</h4>
                </div>
            </div>
        </div>
    )
}

export default PageTitle