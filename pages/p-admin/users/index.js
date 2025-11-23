import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import ConnectDb from '@/config/ConnectDb'
import BlogModel from '@/model/blog'
import UserModel from '@/model/user'
import { validationToken } from '@/utility/auth'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function AllUser({ admin, allAdmin }) {
    const [allUser, setAllUsers] = useState(allAdmin)
    console.log(allAdmin);

    const [openChangeInfoModal, setOpenChangeInfoModal] = useState(false)
    const [removeUserModal, setRemoveUserModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const [page, setPage] = useState(1);




    const ChangRoleHandler = async (e) => {
        try {
            const res = await axios.put("/api/admin/changerole", {
                userId: userId._id,
                role: 'admin'
            }, {
                withCredentials: true
            })

            if (res.status === 200) {
                toast.success("تغییر نقش موفقیت امیز بود")
                setOpenChangeInfoModal(false)
            }
        } catch (err) {

        }
    }
    const DeleteUserHandler = async (e) => {
        try {
            const res = await axios.delete(`/api/user/${userId._id}`, {
                withCredentials: true
            })

            if (res.status === 200) {
                toast.success("کاربر یا موفقیت حذف شذ")
                setRemoveUserModal(false)
            }
        } catch (err) {

        }
    }
    const currentPage = 8
    const lastIndex = page * currentPage;
    const firstIndex = lastIndex - currentPage;
    const currentUsers = allUser.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(allUser.length / currentPage);
    return (
        <>

            <AdminLayout>
                <ToastContainer position='top-center' autoClose={2500} />
                <div className='flex flex-col justify-between w-full'>
                    <div className='flex items-center flex-row-reverse w-full gap-10 '>
                        {
                            currentUsers?.map((user) => (
                                <div key={user._id} className='border border-black/20 shadow-xl rounded-2xl p-3 w-[250px] h-[190px] dark:bg-white/20'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-1.5'>
                                            <Link href={`/p-admin/users/${user._id}`}>
                                                <svg className="size-6 text-black/50 hover:text-green-600 transition" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                                </svg>
                                            </Link>
                                            <span onClick={() => {
                                                setUserId(user)
                                                setRemoveUserModal(true)
                                            }}>
                                                <svg className="size-5 text-black/50 hover:text-red-500 transition" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div>
                                            <p className='text-[13px] font-vazirBold text-cusBlue hover:text-cusBlue/80 cursor-pointer transition' onClick={() => {
                                                setUserId(user)
                                                setOpenChangeInfoModal(true)
                                            }}>{user.role}</p>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <div className='flex items-center justify-end gap-4'>
                                            <div className='flex flex-col'>
                                                <span className={`text-xs font-vazirBold ${user.name ? "text-black/50" : "text-red-500/50"}`}>{user?.name || "نامشخض"}</span>
                                            </div>
                                            <div className='w-[40px] h-[40px] overflow-hidden flex items-center justify-center border border-black/30 rounded-lg '>
                                                {
                                                    user.profile ? (
                                                        <img src={user.profile} alt="" />
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
                                                    <span className='text-[12px] font-iranYekanBold'>{user?.blogs ? user.blogs.length : "0"}</span>
                                                    <svg className="size-4 text-black/50 hover:text-black/70 transition" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd" />
                                                    </svg>
                                                </span>

                                            ) : null


                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <div className={`w-[300px] h-[200px] z-20 absolute rounded-xl inset-0 m-auto ${openChangeInfoModal ? 'bg-white opacity-100 visible' : 'opacity-0 invisible'}`}>
                            {
                                userId?.role !== "admin" ? (
                                    <div className='p-3 flex flex-col justify-between h-full'>
                                        <p className='text-red-600 text-center font-vazirBold'>ایا میخواهید نقش این کاربر رو به ادمین تغییر بدی؟</p>
                                        <div className=' flex items-center w-full gap-3'>
                                            <button className='bg-green-600 w-full text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-green-500 transition' onClick={ChangRoleHandler}>بله</button>
                                            <button className='bg-red-600 w-full text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-red-500 transition' onClick={() => setOpenChangeInfoModal(false)}>خیر</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='p-3 flex flex-col justify-between h-full'>
                                        <p className='text-red-600 text-center font-vazirBold'>شما نمیتوانید نقش ادمین را حذف کنید</p>
                                        <button className='bg-red-600 text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-red-500 transition' onClick={() => setOpenChangeInfoModal(false)}>بستن</button>
                                    </div>
                                )

                            }
                        </div>
                        <div className={`w-[300px] h-[200px] z-20 absolute rounded-xl inset-0 m-auto ${removeUserModal ? 'bg-white opacity-100 visible' : 'opacity-0 invisible'}`}>
                            {
                                userId?._id === admin._id ? (
                                    <div className='p-3 flex flex-col justify-between h-full'>
                                        <p className='text-red-600 text-center font-vazirBold'>شما نمیتوانید خود را از لیست حذف کنید</p>
                                        <div className=' flex items-center w-full gap-3'>
                                            <button className='bg-red-600 w-full text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-red-500 transition' onClick={() => setRemoveUserModal(false)}>بستن</button>
                                        </div>
                                    </div>
                                ) : userId?.role === "admin" ? (
                                    <div className='p-3 flex flex-col justify-between h-full'>
                                        <p className='text-red-600 text-center font-vazirBold'>شما نمیتوانید نقش ادمین را حذف کنید</p>
                                        <button className='bg-red-600 text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-red-500 transition' onClick={() => setRemoveUserModal(false)}>بستن</button>
                                    </div>
                                ) : (
                                    <div className='p-3 flex flex-col justify-between h-full'>
                                        <p className='text-red-600 text-center font-vazirBold'>ایا از حذف این کاربر اطمینان دارین؟</p>
                                        <div className=' flex items-center w-full gap-3'>
                                            <button className='bg-green-600 w-full text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-green-500 transition' onClick={DeleteUserHandler} >بله</button>
                                            <button className='bg-red-600 w-full text-white p-2 flex items-center justify-center rounded-2xl font-iranYekanBold hover:bg-red-500 transition' onClick={() => setRemoveUserModal(false)}>خیر</button>
                                        </div>
                                    </div>
                                )

                            }
                        </div>
                    </div>
                    <div className="flex flex-row-reverse items-center justify-center gap-2 mt-4">
                        {
                            Array.from({ length: totalPages }, (_, i) => (
                                <div key={i} onClick={() => setPage(i + 1)} className={`border w-[35px] h-[35px] flex items-center justify-center rounded-full transition-all ${i + 1 === page ? 'border-cusOrang' : 'border-black/20'}`}>
                                    <p className={`${i + 1 === page ? 'text-cusOrang' : 'text-black/20'} transition font-vazirBold`}>{i + 1}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </AdminLayout>
            <div className={`w-full h-full absolute top-0 z-10 transition-all ${openChangeInfoModal ? 'bg-black/20 opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpenChangeInfoModal(false)} ></div>
            <div className={`w-full h-full absolute top-0 z-10 transition-all ${removeUserModal ? 'bg-black/20 opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setRemoveUserModal(false)} ></div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;

    await ConnectDb();

    const token = req.cookies?.token || null;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }

    const isValid = validationToken(token);

    if (!isValid) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }

    const getAlreadyAdmin = await UserModel.findOne({ email: isValid.email })
        .select("-password").populate('blogs');

    const getAllAdmin = await UserModel.find({})
        .select("-password").populate('blogs');
    console.log(getAllAdmin);


    if (!getAlreadyAdmin || getAlreadyAdmin.role !== "admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }

    return {
        props: {
            admin: getAlreadyAdmin ? JSON.parse(JSON.stringify(getAlreadyAdmin)) : null,
            allAdmin: getAllAdmin ? JSON.parse(JSON.stringify(getAllAdmin)) : null
        }
    };
}


export default AllUser