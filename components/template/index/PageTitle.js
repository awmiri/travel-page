import Image from 'next/image'
import React from 'react'
import Typewriter from 'typewriter-effect'
function PageTitle() {
    return (
        <div className=''>
            <div className=' border flex items-center gap-1.5 rounded-4xl py-2.5 px-3 bg-cusOrang/20 border-cusOrang/30 text-cusOrang w-[240px]'>
                <Image src={"/header-img/sunrise.webp"} width={20} height={20} alt='sunrise' />
                <p className='text-sm font-vazirBold'>بسیار سفر باید تا پخته شود خامی</p>
            </div>
            <h1 className='text-[65px] mt-7 font-vazirBold w-[453px] h-[293px]'>
                <Typewriter
                    options={{
                        strings: [
                            'دنیا را کشف کنید زندگی را <span class="text-cusBlue">تجربه</span> کنید'
                        ],
                        cursor: "|",
                        loop: true,
                        autoStart: true,
                        deleteSpeed: 1.3,
                        typeSpeed: 0.5,
                        wrapperClassName: 'typewriter-wrapper'
                    }}
                />
            </h1>
            <div className='flex items-center gap-6'>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[70px] h-[70px] flex items-center justify-center border rounded-3xl border-[#40404040]/40 bg-white'>
                        <Image src={"/header-img/tent.webp"} width={35} height={35} alt='tent' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>کمپ</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[70px] h-[70px] flex items-center justify-center border rounded-3xl border-[#40404040]/40 bg-white'>
                        <Image src={"/header-img/beach.webp"} width={35} height={35} alt='beach' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>ساحل</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[70px] h-[70px] flex items-center justify-center border rounded-3xl border-[#40404040]/40 bg-white'>
                        <Image src={"/header-img/city.webp"} width={35} height={35} alt='city' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>شهر</h4>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-[70px] h-[70px] flex items-center justify-center border rounded-3xl border-[#40404040]/40 bg-white'>
                        <Image src={"/header-img/mountain.webp"} width={35} height={35} alt='mountain' />
                    </div>
                    <h4 className='text-sm font-iranYekanBold'>جنگل</h4>
                </div>
            </div>
        </div>
    )
}

export default PageTitle