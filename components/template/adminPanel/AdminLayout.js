import React from 'react'
import AdminPanelHeader from './AdminPanelHeader'
import PanelNav from './PanelNav'

function AdminLayout({ information, children }) {
    return (
        <div>
            <AdminPanelHeader information={information} />
            <div className='flex gap-5 px-5 h-full'>
                <aside>
                    <PanelNav />
                </aside>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout