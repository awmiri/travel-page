import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'


function PanelNav() {
    const pathName = usePathname()
    const [userCount, setUserCount] = useState()
    const [countBlog, setCountBlog] = useState()
    useEffect(() => {
        const getUserCount = async () => {
            try {
                const res = await axios.get("/api/user", {
                    "withCredentials": true
                })
                if (res.status === 200) {
                    setUserCount(res.data.number)
                }
            } catch (err) { }
        }
        getUserCount()
    }, [])
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await axios.get("/api/blog/getblogs", {
                    withCredentials: true
                })
                if (res.status === 200) {
                    setCountBlog(res.data.cuntBlog)
                }
            } catch (err) {
                console.error("خطا در دریافت بلاگ‌ها:", err)
            }
        }
        getBlog()
    }, [])

    return (
        <div className='w-[250px] h-full bg-gray-100/20 border border-[#EDEFF2] shadow p-3'>
            <ul className='flex flex-col gap-4'>
                <Link href={"/p-admin/dashboard"} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${pathName === "/p-admin/dashboard" ? 'bg-white shadow' : ''}`}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 text-cusOrang">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                    </svg>
                    <p className='font-vazirBold text-[#6B7A99]'>داشبورد</p>
                </Link>
                <Link href={"/p-admin/users"} className={`flex items-center gap-3 justify-between p-2 transition-all rounded-lg ${pathName === "/p-admin/users" ? 'bg-white shadow' : ''}`}>
                    <div className='flex items-center gap-3'>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 text-[#33BFFF]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <p className='font-vazirBold text-[#6B7A99]'>کاربران</p>
                    </div>
                    <div className=' p-1 font-vazirBold rounded-full bg-white shadow-xl text-[#6B7A99] min-w-[30px] min-h-[30px] flex items-center justify-center'>{userCount}</div>
                </Link>
                <div className={`flex flex-col gap-3 p-2 rounded-lg ${pathName.startsWith("p-admin/blog") ? 'bg-white shadow' : ''}`}>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-3'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 text-[#FFCB33]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <p className='font-vazirBold text-[#6B7A99]'>بلاگ‌ها</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 text-[#6B7A99] text-shadow-lg transition ${pathName === "p-admin/blog" ? "rotate-180" : " rotate-0"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            <div className=' p-1 font-vazirBold rounded-full bg-white shadow-xl text-[#6B7A99] min-w-[30px] min-h-[30px] flex items-center justify-center'>{countBlog}</div>
                        </div>
                    </div>
                    <ul className={`transition-all duration-200 ${pathName === "p-admin/blog" ? "flex flex-col gap-4 px-2.5 opacity-100 h-full visible" : "opacity-0 h-0 invisible hidden"}`}>
                        <Link href={"p-admin/blog/create"} className='flex items-center gap-1'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                            </svg>
                            <p className='font-vazirBold text-[#6B7A99] text-[13px]'>ساخت‌بلاگ</p>
                        </Link>
                        <Link href={"p-admin/blog/allblog"} className='flex items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>

                                <p className='font-vazirBold text-[#6B7A99] text-[13px]'>بلاگ‌</p>
                            </div>
                            <div className=' p-1 font-vazirBold rounded-full bg-white shadow-2xl text-sm text-[#6B7A99] w-[20px] h-[20px] flex items-center justify-center'>{userCount}</div>
                        </Link>
                    </ul>
                </div>
                <Link href={"p-admin/tickets"} className={`flex items-center  gap-3 p-2 rounded-lg ${pathName === "dashboard" ? 'bg-white shadow' : ''}`}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 text-[#E62E7B]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                    <p className='font-vazirBold text-[#6B7A99]'>تیکت‌ها</p>
                </Link>
            </ul>
        </div>
    )
}

export default PanelNav