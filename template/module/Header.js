import React from 'react'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className='border-b border-textLight/40 dark:text-white/25 transition'>
            <div className='mx-[71.5px] py-[15px] flex items-center justify-between'>
                <ul className='flex items-center gap-1.5'>
                    <li className='flex items-center p-2.5'>
                        <Image src={"/logo/logo.webp"} width={35} height={35} alt='logo' />
                        <Link href={"/"} className='font-iranYekanBold text-textLight dark:text-white text-2xl'>سفرکن</Link>
                    </li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl nav_animation'>هتل</li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl nav_animation'>تور داخلی</li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl nav_animation'>تور خارجی</li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl nav_animation'>بیمه مسافرتی</li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl nav_animation'>سفرنامه</li>
                    <li className='p-2.5 font-iranYekanRegular text-textLight dark:text-white text-xl'>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>
                    </li>
                </ul>
                <div className='flex items-center gap-5'>
                    <div className={`${theme === "light" ? "bg-gray-600/30" : "bg-amber-400/30"}  p-3 rounded-full`} onClick={() => setTheme(theme === "light" ? "dark" : 'light')}>
                        {
                            theme === "light" ? (
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 text-amber-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            )
                        }
                    </div>
                    <div className='bg-cusBlue p-3 rounded-full'>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <div className='border border-textLight/25 dark:border-white flex items-center gap-1 py-2 px-4 rounded-4xl overflow-clip relative group transition-all'>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-textLight dark:text-white group-hover:text-white duration-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p className='text-textLight dark:text-white group-hover:text-white font-iranYekanMedium text-xl duration-200'>حساب کاربری</p>
                        <div className='bg-cusBlue w-full h-full absolute -z-10 -translate-x-39 group-hover:translate-x-4 transition-all duration-200'></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header