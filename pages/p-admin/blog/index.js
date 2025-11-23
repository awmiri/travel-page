import Table from '@/components/module/Table'
import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import React from 'react'

function index() {
    return (
        <AdminLayout>
            <div className='w-full rounded-2xl'>
                <Table />
            </div>
        </AdminLayout>
    )
}

export default index