import Image from 'next/image'
import React, { useState } from 'react'

function Gallery() {
    const cityArry = [
        { id: 1, cityName: "تایلند", capitalCity: "پاتایا", img: "/country/tiland.webp", englishName: "tiland" },
        { id: 2, cityName: "بارسلون", capitalCity: "اسپانیا", img: "/country/barcelon.webp", englishName: "spain" },
        { id: 3, cityName: "کلن", capitalCity: "المان", img: "/country/koln.webp", englishName: "germany" }
    ]
    const [number, setNumber] = useState(0)
    const prevPicHandler = () => {
        if (number > 0) setNumber((prev) => prev - 1);
    }
    const nextPicHandler = () => {
        if (number < cityArry.length - 1) setNumber((prev) => prev + 1);

    }
    return (
        <div className='w-full flex items-end justify-end relative'>
            <Image
                src={cityArry[number].img}
                width={600}
                height={700}
                alt={cityArry[number].englishName}
                className="w-full query600:w-[600px] h-[300px] query600:h-[470px] md:h-[500px] query860:h-[640px] fixed-img object-center rounded-4xl"
            />
            <div className='absolute z-10 left-4 query600:left-6 query860:left-10 top-4 query600:top-6 flex items-center flex-col'>
                <div className='w-[110px] query600:w-[150px] query860:w-[200px] h-[110px] query600:h-[140px] query860:h-[170px] flex items-start flex-col justify-center bg-[#FFFFFF9C]/70 border border-[#FFFFFF] rounded-4xl px-1 query600:px-3 query860:px-5 py-1 query600:py-3 query860:py-5'>
                    <span className='flex items-center gap-1 text-white'>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 query600:size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className='font-vazirBold text-sm query600:text-base'>{cityArry[number].cityName}</p>
                    </span>
                    <p className='text-3xl query600:text-4xl mt-3 query600:mt-4 query860:text-6xl text-white font-iranYekanBold'>{cityArry[number].capitalCity}</p>
                </div>
                <div className='flex items-center gap-1 mt-3'>
                    <button disabled={number === cityArry.length - 1} className='text-white disabled:text-white/60' onClick={nextPicHandler}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 query600:size-7">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <span className='text-xl font-vazirBold text-white'>0{number + 1}</span>
                    <button disabled={number === 0} className='text-white disabled:text-white/60' onClick={prevPicHandler}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 query600:size-7">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Gallery