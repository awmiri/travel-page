import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


function Table({ blogs }) {
    const [openModal, setOpenModal] = useState(false)
    const [blogId, setBlogId] = useState(false)
    const [author, setAuthor] = useState(false)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [filterBlog, setFilterBlog] = useState(blogs || [])
    const publishBlogHandler = async () => {
        try {
            const data = {
                blogId,
                author
            }
            const res = await axios.patch("/api/blog/publishblog", data)
            if (res.status === 200) {
                toast.success("بلاگ با موفقیت منتشر شد")
                setOpenModal(false)
            }
        } catch (err) {
            const status = err.response?.status
            if (status === 405) {
                toast.warn("این بلاگ توسط شما نوشته نشده")
                setOpenModal(false)
            } else if (status === 404) {
                toast.warn("کاربر یا بلاگ پیدا نشده")
                setOpenModal(false)
            } else if (status === 400) {
                toast.warn("فیلدا به درستی پرنشدن")
                setOpenModal(false)
            }

        }
    }

    useEffect(() => {
        let result = blogs || []
        if (statusFilter === "published") {
            result = result.filter(item => item.publish === true)
        } else if (statusFilter === "unpublished") {
            result = result.filter(item => item.publish === false)
        } else {
            result = blogs
        }

        if (search.trim()) {
            result = result.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                `${item.author.name} ${item.author.lastName}`.toLowerCase().includes(search.toLowerCase())
            )
        }

        setFilterBlog(result)
    }, [search, blogs, statusFilter])
    return (
        <>
            <ToastContainer autoClose={2500} />
            <div className="relative rounded-2xl overflow-x-auto bg-cusBlue/20 shadow border border-black/30">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4">
                    <div>
                        <div className="inline-flex group items-center justify-center border shadow-xs rounded-lg text-sm px-3 py-2 relative" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                            </svg>

                            <ul className=" w-[140px] text-center bg-white shadow-2xl top-10 right-0 rounded-xl absolute overflow-hidden opacity-0 h-0 invisible group-hover:opacity-100 group-hover:h-fit group-hover:visible transition-all duration-300 " aria-labelledby="dropdownDefaultButton2">
                                <li className={`px-3.5 py-3 text-xs font-vazirBold hover:bg-cusOrang/90 hover:text-white transition ${statusFilter === "all" ? 'bg-cusOrang/90 text-white' : ''}`} onClick={() => setStatusFilter("all")}>
                                    همه
                                </li>
                                <li className={`px-3.5 py-3 text-xs font-vazirBold hover:bg-cusOrang/90 hover:text-white transition ${statusFilter === "publish" ? 'bg-cusOrang/90 text-white' : ''}`} onClick={() => setStatusFilter("publish")}>
                                    منتشر‌شده
                                </li>
                                <li className={`px-3.5 py-3 text-xs font-vazirBold hover:bg-cusOrang/90 hover:text-white transition ${statusFilter === "unpublished" ? 'bg-cusOrang/90 text-white' : ''}`} onClick={() => setStatusFilter("unpublished")}>
                                    منتشر‌نشده
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-black/30 pointer-events-none">
                            <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        </div>
                        <input type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 border border-black/40 text-sm font-iranYekanMedium rounded-2xl shadow-xs" placeholder="جستجو" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-black/30">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                عنوان مغاله
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                نویسنده
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                تاریخ انتشار
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                وضعیت انتشار
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`${!blogs ? ' flex items-center justify-center w-full' : ''}`}>
                        {
                            filterBlog?.length > 0 ? (
                                filterBlog?.map((item) => (
                                    <tr key={item._id} className="bg-neutral-primary-soft border-b border-black/30 hover:bg-cusBlue/40">
                                        <th scope="row" className="flex items-center px-6 py-4 text-heading whitespace-nowrap font-vazirBold text-[13px]">
                                            <p className='hover:text-black/50'>{item.title}</p>
                                        </th>
                                        <td className="px-6 py-4">
                                            <p className='font-iranYekanBold text-sm'>{item.author.name} {item.author.lastName}</p>
                                            <p className='font-iranYekanBold text-xs text-black/50 mt-1'>{item.author._id}</p>
                                        </td>
                                        <td className="px-6 py-4 font-iranYekanBold text-sm">
                                            {new Date(item.updatedAt).toLocaleDateString('fa-IR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                item.publish ? (
                                                    <p className='p-2 text-sm font-iranYekanBold bg-green-500 text-white flex items-center justify-center rounded-2xl'>منتشر‌شده</p>
                                                ) : (
                                                    <p className='p-2 text-sm font-iranYekanBold cursor-pointer bg-red-500 hover:bg-red-500/50 transition-all text-white flex items-center justify-center rounded-2xl' onClick={() => {
                                                        setBlogId(item._id)
                                                        setAuthor(item.author._id)
                                                        setOpenModal(true)
                                                    }}>منتشر‌نشده</p>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-5">
                                            <DotLottieReact
                                                src="https://lottie.host/769c06ae-72dc-4031-a8b2-2e071687c3d5/DFySAlId5o.lottie"
                                                loop
                                                autoplay
                                                className="w-55 h-55"
                                            />
                                            {
                                                statusFilter === "unpublished" ? (
                                                    <div>
                                                        <p className="text-lg font-iranYekanBold text-body">بلاگ منتشر نشده ای پیدا نشد</p>
                                                        <span className="text-sm px-6 py-2 flex items-center text-white justify-center rounded-xl font-vazirBold bg-cusOrang hover:bg-cusOrang/80 transition" onClick={() => setStatusFilter("all")}>همه بلاگ‌ها</span>
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col'>
                                                        <p className="text-lg font-iranYekanBold text-body">بلاگی هنوز ساخته نشده!!</p>
                                                        <Link href={"/p-admin/blog/create"} className="text-sm px-6 py-2 flex items-center text-white justify-center rounded-xl font-vazirBold bg-cusOrang hover:bg-cusOrang/80 transition">ساخت بلاگ</Link>
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className={`bg-white absolute inset-0 m-auto w-[270px] h-[160px] top-0 p-2.5 z-20 rounded-xl transition ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className='w-full flex items-end justify-end '>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-black/60 hover:text-red-600 transition" onClick={() => setOpenModal(false)}>
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className='text-center font-iranYekanBold mt-5'>ایا از انتشار این بلاگ اطمینان دارید؟</p>
                <div className='flex items-center justify-between gap-3 mt-5'>
                    <button className='p-2 bg-green-600 hover:bg-green-600/80 transition duration-200 text-white w-full rounded-2xl' onClick={publishBlogHandler}>بله</button>
                    <button className='p-2 bg-red-500 hover:bg-red-500/80 transition duration-200 text-white w-full rounded-2xl'>خیر</button>
                </div>
            </div>
            <div className={`${openModal ? 'bg-darkFooterBg/50 opacity-100 visible' : 'invisible opacity-0'} transition w-full h-full absolute inset-0 z-10`} onClick={() => setOpenModal(false)}></div>
        </>

    )
}

export default Table