import React from 'react'
import UserNav from '@/components/module/UserNav'

function Layout({ children, info }) {
    return (
        <div className='mx-12 my-8 flex gap-10'>
            <div className='relative'>
                <UserNav info={info} />
            </div>
            <main className='w-full'>
                {children}
            </main>
        </div>
    )
}

export default Layout