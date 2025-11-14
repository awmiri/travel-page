import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function AdminPanelHeader({ information }) {
    return (
        <div className='flex items-center justify-between p-5'>
            <div className='flex items-center  gap-2'>
                <div className='w-[35px] h-[35px] border flex items-center justify-center rounded-full '>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <div>
                    <p className='text-sm font-iranYekanBold '>{information?.name || ""}سلام</p>
                    <p className='text-sm font-vazirBold text-darkFooterBg'>ادمین</p>
                </div>
            </div>
            <Link href={"/"} className='bg-cusOrang py-2 px-3 w-[130px] flex items-center justify-center rounded-3xl text-white font-iranYekanBold bg_hover-effect z-10'><span className='z-0'>بازگشت</span></Link>
        </div>
    )
}

export default AdminPanelHeader