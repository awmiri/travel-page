import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllUser() {
    const [allUser, setAllUsers] = useState([])

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get("/api/user")
                if (res.status === 200) {

                    setAllUsers(res.data.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
        getUser()
    }, [])
    return (
        <AdminLayout>
            <div className='grid items-center justify-between w-full gap-10 grid-cols-4'>
                {
                    allUser?.map((user) => (
                        <div key={user._id} className='border border-black/50 shadow-2xl p-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-1.5'>
                                    <span>
                                        <svg className="size-6 text-black/50 hover:text-green-600 transition" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                        </svg>
                                    </span>
                                    <span>
                                        <svg className="size-5 text-black/50 hover:text-red-500 transition" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <p className='text-[13px] font-vazirBold'>{user.role}</p>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center justify-end gap-6'>
                                    <div className='flex flex-col'>
                                        <span>ali</span>
                                        <span>21</span>
                                    </div>
                                    <div className='w-[40px] h-[40px] flex items-center justify-center border border-black/30 rounded-lg '>
                                        {
                                            user.img ? (
                                                <img src={user.img} alt="" />
                                            ) : (
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth="1.5" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <span className='flex justify-end items-center w-full gap-1.5'>
                                    <span className='text-[12px] font-iranYekanBold'>{user.email}</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-black/50 hover:text-black/70 transition">
                                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                    </svg>
                                </span>
                                <span className='flex justify-end items-center w-full gap-1.5'>
                                    <span className='text-[12px] font-iranYekanBold'>{user.phone}</span>
                                    <svg className="size-4 text-black/50 hover:text-black/70 transition" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                                    </svg>
                                </span>
                                {
                                    user.role === "admin" ? (
                                        <span className='flex justify-end items-center w-full gap-1.5'>
                                            <span className='text-[12px] font-iranYekanBold'>{user.blog ? user.blog.length : "0"}</span>
                                            <svg className="size-4 text-black/50 hover:text-black/70 transition" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>

                                    ) : null


                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </AdminLayout>
    )
}

export default AllUser