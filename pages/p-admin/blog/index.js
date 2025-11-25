import Table from '@/components/module/Table'
import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import ConnectDb from '@/config/ConnectDb'
import BlogModel from '@/model/blog'
import React from 'react'

function index({ blog }) {
    return (
        <AdminLayout>
            <div className='w-full rounded-2xl'>
                <Table blogs={blog} />
            </div>
        </AdminLayout>
    )
}
export async function getServerSideProps() {
    await ConnectDb();
    const allBlogs = await BlogModel.find({}).populate("author", "name lastName _id").sort({ createdAt: -1 }).lean()

    return {
        props: {
            blog: JSON.parse(JSON.stringify(allBlogs))
        }
    }
}

export default index