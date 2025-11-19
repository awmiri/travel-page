import React from 'react'

const FilterTravel = () => {
    return (
        <div className='query600:w-[560px] md:w-[630px] query860:w-[710px] query1000:w-[760px] query1120:w-[900px] px-4 md:px-5 py-4 md:py-5 max-query600:gap-3.5 flex max-query600:flex-col query600:items-center justify-between rounded-3xl query600:rounded-full border dark:bg-[#1D1D1D] bg-white border-[#404040]/35 dark:border-[#FFFFFF59]/40'>
            <div className='flex items-center gap-1'>
                <svg className="size-5 md:size-6 text-red-600" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                </svg>
                <p className='font-iranYekanMedium text-[11px] md:text-[12px] md:hover:text-cusBlue transition query860:text-sm'>مقصد خود را انتخاب کنید</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className='flex items-center gap-1'>
                <svg className="size-5 md:size-6 text-gray-800 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                </svg>

                <p className='font-iranYekanMedium text-[11px] md:text-[12px] md:hover:text-cusBlue transition query860:text-sm'>تاریخ ورود</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className='flex items-center gap-1'>
                <svg className="size-5 md:size-6 text-gray-800 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                </svg>

                <p className='font-iranYekanMedium text-[11px] md:text-[12px] md:hover:text-cusBlue transition query860:text-sm'>تاریخ خروج</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className='flex items-center gap-1'>
                <svg className="size-5 md:size-6 text-gray-800 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p className='font-iranYekanMedium text-[11px] md:text-[12px] md:hover:text-cusBlue transition query860:text-sm'>تعداد</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <button className="border border-cusBlue/25 bg-cusBlue hover:bg-cusBlue/85 transition p-1.5 query600:w-22 md:w-25 query860:w-30 rounded-3xl flex items-center justify-center text-[12px] md:text-sm query860:text-base">
                <span className="font-iranYekanMedium text-white">جستجو</span>
            </button>
        </div>
    )
}

export default FilterTravel