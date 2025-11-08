import React from 'react'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

function Header() {
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <>
            <div className='border-b border-textLight/40 dark:text-white/25 transition'>
                <div className='mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px] py-[15px] flex items-center justify-between'>
                    <ul className='flex items-center gap-1 md:gap-1.5 max-sm:hidden'>
                        <li className='flex items-center p-1.5 md:p-2.5'>
                            <Image src={"/logo/logo.webp"} width={35} height={35} alt='logo' />
                            <Link href={"/"} className='font-iranYekanBold text-textLight dark:text-white text-base md:text-lg query860:text-xl query1000:text-[22px] query1120:text-2xl'>سفرکن</Link>
                        </li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>هتل</li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>تور داخلی</li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>تور خارجی</li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>بیمه مسافرتی</li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>سفرنامه</li>
                        <li className='p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white'>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 md:size-5">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </li>
                    </ul>
                    <div className={`flex flex-col sm:hidden absolute z-50 dark:bg-darkFooterBg bg-white shadow right-0 bottom-0 h-full w-[180px] px-2 py-1 transition-all duration-200 ${openMobileNav ? 'translate-x-0' : 'translate-x-[180px] '}`}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center p-1.5 md:p-2.5 '>
                                <Image src={"/logo/logo.webp"} width={35} height={35} alt='logo' />
                                <Link href={"/"} className='font-iranYekanBold text-textLight dark:text-white text-base md:text-lg query860:text-xl query1000:text-[22px] query1120:text-2xl'>سفرکن</Link>
                            </div>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" onClick={() => setOpenMobileNav(false)}>
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <ul className='flex flex-col gap-1 md:gap-1.5 mt-2'>
                            <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-sm'>هتل</li>
                            <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-sm'>تور داخلی</li>
                            <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-sm'>تور خارجی</li>
                            <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-sm'>بیمه مسافرتی</li>
                            <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-sm'>سفرنامه</li>
                        </ul>
                    </div>
                    <div className='cursor-pointer sm:hidden' onClick={() => setOpenMobileNav(true)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-textLight dark:text-textDark">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='flex items-center gap-2 query860:gap-2.5 query1120:gap-5 '>
                        <div className={`cursor-pointer ${theme === "light" ? "bg-gray-600/30" : "bg-amber-400/30"} flex items-center justify-center  p-1.5 md:p-2 query1120:p-3 rounded-full`} onClick={() => setTheme(theme === "light" ? "dark" : 'light')}>
                            {
                                theme === "light" ? (
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5 md:size-5 query1120:size-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                ) : (
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-4.5 md:size-5 query1120:size-6 text-amber-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )
                            }
                        </div>
                        <div className='bg-cusBlue max-sm:hidden p-1.5 md:p-2 query1120:p-3 rounded-full cursor-pointer flex items-center justify-center'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5 md:size-5 query1120:size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                        <div className='cursor-pointer border border-textLight/25 dark:border-white flex items-center gap-1 py-1.5 md:py-2 px-2 query860:px-3 query1000:px-4 rounded-4xl overflow-clip relative group transition-all'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5 query1120:size-6 text-textLight dark:text-white sm:group-hover:text-white duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p className='text-textLight dark:text-white sm:group-hover:text-white font-iranYekanMedium text-[11px] md:text-[13px] query860:text-[15px] query1000:text-[17px] query1120:text-xl duration-200'>حساب کاربری</p>
                            <div className='bg-cusBlue w-full h-full max-sm:hidden absolute -z-10 -translate-x-39 group-hover:translate-x-2 md:group-hover:translate-x-3 query1000:group-hover:translate-x-4 transition-all duration-200'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-black/15 absolute z-10 w-full h-dvh top-0 sm:hidden transition-all duration-200 ${openMobileNav ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpenMobileNav(false)}></div>
        </>
    )
}

export default Header