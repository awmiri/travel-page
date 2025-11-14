import React from 'react'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function Header() {
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false)
    const [userLogin, setUserLogin] = useState(false)
    const [userContent, setUserContent] = useState({})
    const router = useRouter()
    console.log(userContent);


    useEffect(() => {
        const isUserLogin = async () => {
            try {
                const res = await axios.get("/api/auth/me", {
                    withCredentials: true
                })

                if (res.status === 200) {
                    setUserLogin(true)
                    setUserContent(res.data.message)
                }
                if (res.data.message.role === "admin") {
                    setUserAdmin(true)
                }


            } catch (err) {
                const status = err.response?.status;
                if (status === 401) {
                    console.log("user not found");

                }
            }
        }
        isUserLogin()
    }, [])

    const logOutHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get("/api/auth/logout")
            if (res.status === 200) {
                setUserAdmin(false)
                setUserLogin(false)
                toast.success("خروج موفق ,به امید دیدن مجدد")
                setTimeout(() => {
                    router.replace("/")
                }, 3000);
            }
        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
    }, [])
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    // nav component
    return (
        <>
            <div className='border-b border-textLight/40 dark:text-white/25 transition'>
                {/* nav countainer  */}
                <ToastContainer style={{ width: "330px", textWrap: "nowrap", marginRight: "14px", marginTop: "20px" }} autoClose={2700} position='top-right' />
                <div className='mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px] py-[15px] flex items-center justify-between'>
                    {/* desktop unorder list */}
                    <ul className='flex items-center gap-1 md:gap-1.5 max-sm:hidden'>
                        <li className='flex items-center p-1.5 md:p-2.5'>
                            <Image src={"/logo/logo.webp"} width={35} height={35} alt='logo' />
                            <Link href={"/"} className='cursor-pointer   font-iranYekanBold text-textLight dark:text-white text-base md:text-lg query860:text-xl query1000:text-[22px] query1120:text-2xl'>سفرکن</Link>
                        </li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>هتل</li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>تور داخلی</li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>تور خارجی</li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>بیمه مسافرتی</li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white text-[13px] md:text-[15px] query860:text-base query1000:text-lg query1120:text-xl nav_animation'>سفرنامه</li>
                        <li className='cursor-pointer    p-1 md:p-1.5 query860:p-2.5 font-iranYekanRegular text-textLight dark:text-white'>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 md:size-5">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </li>
                    </ul>
                    {/* mobile list component */}
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
                    {/* berger menu dev */}
                    <div className='cursor-pointer sm:hidden' onClick={() => setOpenMobileNav(true)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-textLight dark:text-textDark">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {/* login and sign up content and change page them */}
                    <div className='flex items-center gap-2 query860:gap-2.5 query1120:gap-5 '>
                        {/* change them btn */}
                        <label className="switch" >
                            <span className="sun" onClick={() => setTheme('light')}><svg viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                            <span className="moon" onClick={() => setTheme("dark")}><svg viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
                            <input type="checkbox" className="input" />
                            <span className="slider" onClick={() => setTheme(theme === "light" ? "dark" : 'light')}></span>
                        </label>
                        {/* shop card */}
                        <div className='bg-cusBlue max-sm:hidden p-1.5 md:p-2 query1120:p-3 rounded-full cursor-pointer flex items-center justify-center'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5 md:size-5 query1120:size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                        {/* login btn */}
                        {
                            userLogin ? (
                                <>
                                    <div className='w-[48px] h-[48px] relative z-30 border flex items-center justify-center p-1.5 md:p-2 rounded-full' onClick={() => setOpenUserInfo((prev) => !prev)}>
                                        <svg className="size-9 text-gray-800 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <div className={`w-[220px] ${openUserInfo ? "opacity-100 visible" : "opacity-0 invisible"} transition-all p-3 bg-cusBlue text-white absolute z-20 -bottom-[310px] -right-[170px] rounded-2xl`} openUserInfo>
                                            <div>
                                                <h5 className='mb-3 font-vazirBold text-[17px]'>خوش امدید</h5>
                                                <div className='border-t border-b'>
                                                    <ul className='mt-4 mb-4'>
                                                        <li className='flex items-center gap-2 cursor-pointer font-iranYekanMedium px-2 py-2.5 hover:bg-white/10 delay-75 transition rounded-[10px]'>
                                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                            </svg>
                                                            حساب کاربری
                                                        </li>
                                                        <li className='flex items-center gap-2 cursor-pointer font-iranYekanMedium px-2 py-2.5 hover:bg-white/10 delay-75 transition rounded-[10px]'>
                                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                                            </svg>
                                                            تیکت
                                                        </li>
                                                        {
                                                            userAdmin ? (
                                                                <Link href={"/p-admin"} className='flex items-center gap-2 font-iranYekanMedium px-2 py-2.5 hover:bg-white/10 delay-75 transition rounded-[10px]'>
                                                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                                    </svg>
                                                                    پنل ادمین
                                                                </Link>
                                                            ) : null
                                                        }
                                                    </ul>
                                                </div>
                                                <div className='mt-3 flex items-center gap-2 font-iranYekanMedium px-2 py-2.5 hover:bg-red-500 delay-75 transition rounded-[10px] cursor-pointer' onClick={logOutHandler}>
                                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                                    </svg>
                                                    خروج
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link href={"/signup"} className='cursor-pointer border border-textLight/25 dark:border-white flex items-center gap-1 py-1.5 md:py-2 px-2 query860:px-3 query1000:px-4 rounded-4xl overflow-clip relative group transition-all'>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5 query1120:size-6 text-textLight dark:text-white sm:group-hover:text-white duration-200">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <p className='text-textLight dark:text-white sm:group-hover:text-white font-iranYekanMedium text-[11px] md:text-[13px] query860:text-[15px] query1000:text-[17px] query1120:text-xl duration-200'>حساب کاربری</p>
                                    <div className='bg-cusBlue w-full h-full max-sm:hidden absolute -z-10 -translate-x-39 group-hover:translate-x-2 md:group-hover:translate-x-3 query1000:group-hover:translate-x-4 transition-all duration-200'></div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* bg cus dark */}
            <div className={`bg-black/15 absolute z-10 w-full h-dvh top-0 sm:hidden transition-all duration-200 ${openMobileNav ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpenMobileNav(false)}></div>
            <div className={`bg-[#0006]/30 backdrop-blur-[1px] absolute z-10 w-full h-dvh top-0  transition-all duration-200 ${openUserInfo ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpenUserInfo(false)}></div>
        </>
    )
}



export default Header