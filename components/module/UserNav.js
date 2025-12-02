
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation"
import axios from 'axios'
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify'

function UserNav({ info: user }) {
    const pathname = usePathname()
    const router = useRouter()

    const logOutHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get("/api/auth/logout")
            if (res.status === 200) {
                toast.success("خروج موفق ,به امید دیدن مجدد")
                setTimeout(() => {
                    router.replace("/")
                }, 3000);
            }
        } catch (err) {
            console.log(err);

        }
    }
    return (
        <div className='p-4 bg-cusWhite dark:bg-cusWhite2 rounded-xl w-[250px]'>
            <ToastContainer autoClose={2800} />
            <div className='flex items-center justify-between gap-3.5 border-b border-[#a3a3a3] pb-4'>
                <div className='flex items-center gap-1.5'>
                    {
                        user?.profile ? (
                            <Image src={user.profile} width={50} height={50} alt='profile' className='rounded-full' />
                        ) : (
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )
                    }
                    <div className='flex flex-col gap-1'>
                        <span className='text-xs font-vazirBold text-darkFooterBg/70'>{user.name || ''} {user.lastName || ""}</span>
                        <span className='text-xs font-vazirBold text-darkFooterBg/70'>{user.phone}</span>
                    </div>
                </div>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 text-[#a3a3a3] hover:text-red-600 transition" onClick={logOutHandler}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </div>
            <div>
                <span className='text-cusBlue/50 font-vazirBold text-xs my-3 block'>دسترسی‌سریع</span>
                <ul className='space-y-4'>
                    <Link href={"/userprofile"} className={`flex items-center gap-2 font-iranYekanBold transition-all duration-300 ${pathname === "/userprofile" ? 'bg-cusBlue p-2 rounded-xl text-white' : 'text-black/50 hover:text-cusBlue'}`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p>حساب کاربری</p>
                    </Link>
                    <Link href={"/userprofile/ticket"} className={`flex items-center gap-2 font-iranYekanBold transition-all duration-300 ${pathname.startsWith("/userprofile/ticket") ? 'bg-cusBlue p-2 rounded-xl text-white' : 'text-black/50 hover:text-cusBlue'}`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <p>تیکت‌ها</p>
                    </Link>
                    <Link href={"/userprofile/transactions"} className={`flex items-center gap-2 font-iranYekanBold ${pathname.includes("/userprofile/transactions") ? 'bg-cusBlue p-2 rounded-xl text-white' : 'text-black/50 hover:text-cusBlue'}`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                        <p>تراکنش‌ها</p>
                    </Link>
                    <Link href={"/userprofile/travels"} className={`flex items-center gap-2 font-iranYekanBold ${pathname.includes("/userprofile/travels") ? 'bg-cusBlue p-2 rounded-xl text-white' : 'text-black/50 hover:text-cusBlue'}`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                        </svg>
                        <p>سفرهای من</p>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default UserNav