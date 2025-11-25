import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';


function Table({ blogs }) {
    console.log(blogs);
    const publishBlogHandler = () => { }
    return (
        <div className="relative rounded-2xl overflow-x-auto bg-cusBlue/20 shadow border border-black/30">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4">
                <div>
                    <button id="dropdownDefaultButton2" data-dropdown-toggle="dropdown-2" className="inline-flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none" type="button">
                        Action
                        <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" /></svg>
                    </button>
                    <div id="dropdown-2" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-32">
                        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton2">
                            <li>
                                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Reward</a>
                            </li>
                            <li>
                                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Promote</a>
                            </li>
                            <li>
                                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Archive</a>
                            </li>
                            <li>
                                <a href="#" className="inline-flex items-center w-full p-2 text-fg-danger hover:bg-neutral-tertiary-medium rounded">Delete</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-black/30 pointer-events-none">
                        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                    </div>
                    <input type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-black/40 text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" />
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
                        blogs ? (
                            blogs.map((item) => (
                                <tr className="bg-neutral-primary-soft border-b border-black/30 hover:bg-cusBlue/40">
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
                                                <p className='p-2 text-sm font-iranYekanBold bg-red-500 text-white flex items-center justify-center rounded-2xl' onClick={() => publishBlogHandler(item._id)}>منتشر‌نشده</p>
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
                                        <p className="text-lg font-iranYekanBold text-body">بلاگی هنوز ساخته نشده!!</p>
                                        <Link href={"/p-admin/blog/create"} className="text-sm px-6 py-2 flex items-center text-white justify-center rounded-xl font-vazirBold bg-cusOrang hover:bg-cusOrang/80 transition">ساخت بلاگ</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Table