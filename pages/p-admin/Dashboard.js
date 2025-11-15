import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        todayUsers: 0,
        growthPercentage: 0,
        isPositive: true
    })
    console.log(stats);

    useEffect(() => {
        const getUserStats = async () => {
            try {
                const res = await axios.get("/api/user/status", {
                    withCredentials: true
                })
                console.log(res);

                if (res.status === 200) {
                    setStats(res.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getUserStats()
    }, [])

    return (
        <AdminLayout>
            <div>
                <div>
                    <div className='bg-[#33BFFF] w-[220px] p-3 rounded-xl flex items-center justify-between'>
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
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard