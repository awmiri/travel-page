import React from 'react'
import AdminPanelHeader from './AdminPanelHeader'
import PanelNav from './PanelNav'

function AdminLayout({ information, children }) {
    return (
        <div>
            <AdminPanelHeader information={information} />
            <div className='flex gap-5 px-5 pb5'>
                <aside className=' h-dvh'>
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