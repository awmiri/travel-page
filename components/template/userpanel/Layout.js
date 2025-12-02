import React from 'react'
import UserNav from '@/components/module/UserNav'

function Layout({ children, info }) {
    return (
        <div className='mx-12 my-8 flex'>
            <UserNav info={info} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout