import React from 'react'
import AdminPanelHeader from './AdminPanelHeader'
import PanelNav from './PanelNav'

function AdminLayout({ information, children }) {
    return (
        <div className=' h-full'>
            <AdminPanelHeader information={information} />
            <div className='flex gap-5 px-5 pb-5 h-dvh pt-20'>
                <aside className=' '>
                    <PanelNav />
                </aside>
                <main className='flex justify-end w-full'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout