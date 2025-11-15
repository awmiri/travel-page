import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const date = new Date()
    const persianFormat = Intl.DateTimeFormat("fa-IR", {
        day: 'numeric',
        month: 'long',
        calendar: 'persian'
    }).format(date)

    console.log(persianFormat);

    const [stats, setStats] = useState({
        totalUsers: 0,
        todayUsers: 0,
        growthPercentage: 0,
        isPositive: true
    })
    const [countBlog, setCountBlog] = useState()

    const getUserStats = async () => {
        try {
            const res = await axios.get("/api/user/status", {
                withCredentials: true
            })


            if (res.status === 200) {
                setStats(res.data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getUserStats()
        const interval = setInterval(() => {
            getUserStats()
        }, 100000)

        return () => clearInterval(interval)
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
        <AdminLayout>
            <div>
                <div className='flex items-center  gap-10'>
                    <div className='bg-[#33BFFF] w-[220px] h-[70px] p-3 rounded-xl flex items-center justify-between'>
                        <div>
                            <div className='text-white font-vazirBold flex items-center gap-2'>
                                <p>مشتریان</p>
                                {
                                    stats.growthPercentage > 0 ? (
                                        <div className='text-[11px] bg-green-700/70 rounded-xl w-[60px] h-[30px] flex items-center justify-center'>{stats.growthPercentage}%</div>
                                    ) : stats.growthPercentage < 0 ? (
                                        <div className='text-[11px] bg-red-600/70 rounded-xl w-[60px] h-[30px] flex items-center justify-center'>{stats.growthPercentage}%</div>
                                    ) : (
                                        <div className='text-[11px] bg-gray-600/70 rounded-xl w-[60px] h-[30px] flex items-center justify-center'>{stats.growthPercentage}%</div>
                                    )
                                }

                            </div>
                            <p className='text-white font-vazirBold'>{stats.totalUsers}</p>
                        </div>
                        <div className='bg-white/30 p-1 rounded-xl'>
                            <svg class="size-8 text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg>
                        </div>
                    </div>
                    <div className='bg-[#FFCB33] w-[220px] p-3 rounded-xl flex items-center justify-between'>
                        <div>
                            <p className='text-white font-vazirBold'>بلاگ‌‌ها</p>
                            <p className='text-white font-vazirBold'>{countBlog}</p>
                        </div>
                        <div className='bg-white/30 p-1 rounded-xl'>
                            <svg className="size-8 text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
                            </svg>
                        </div>
                    </div>
                    <div className='bg-cusOrang w-[220px] p-3 rounded-xl flex items-center justify-between'>
                        <div>
                            <p className='text-white font-vazirBold'>تاریخ</p>
                            <p className='text-white font-vazirBold text-sm'>{persianFormat}</p>
                        </div>
                        <div className='bg-white/30 p-1 rounded-xl'>
                            <svg class="size-8 text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                            </svg>
                        </div>

                    </div>
                    <div></div>
                </div>
                <div></div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard