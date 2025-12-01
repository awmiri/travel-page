import BlogCart from '@/components/module/BlogCart';
import Header from '@/components/module/Header'
import ConnectDb from '@/config/ConnectDb'
import BlogModel from '@/model/blog'
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'

function Blog({ blogs }) {

    const [search, setSearch] = useState("")  // search input value
    const [openModal, setOpenModal] = useState(false)  // open filter modal
    const [dateFilter, setDateFilter] = useState("normal")  // date filter
    // filtered items
    const filterItems = useMemo(() => {
        let result = [...(blogs || [])];

        if (search.trim()) {
            result = result.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (dateFilter === "new") {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (dateFilter === "old") {
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return result;
    }, [blogs, search, dateFilter]);
    // disable or enable scroll
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openModal]);
    return (
        // BLOG MAIN PAGE
        <>
            <Head>
                <title>وبلاگ-سفرکن</title>
            </Head>
            <div className={`overflow-x-hidden`}>
                {/* header component */}
                <Header />
                <div className='mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px]'>
                    {/* top content about count of blogs and page title */}
                    <div className='mt-10 flex items-center justify-between'>
                        <div className='flex items-center gap-2.5'>
                            <div className='w-[25px] h-[25px] rounded-[6px] bg-amber-300'></div>
                            <h1 className='text-2xl font-vazirBold'>وبلاگ</h1>
                        </div>
                        <span className='text-2xl font-vazirBold text-black/50 dark:text-white/50'> {blogs.length}مقاله </span>
                    </div>
                    {/* down content for filter items and blogs shape */}
                    <div className='mt-10'>
                        {/* filter content */}
                        <div className='flex max-query900:flex-col gap-5'>
                            {/* search filter */}
                            <div className='bg-black/20 h-[50px] dark:bg-white/20 flex items-center max-query900:justify-between pl-1.5 rounded-xl '>
                                {/* search input */}
                                <input type="text" className='p-3.5 w-full border-0 outline-0 placeholder:text-sm dark:placeholder:text-white placeholder:font-iranYekanBold text-sm font-vazirBold text-darkFooterBg dark:text-cusWhite2' placeholder='جستجو' value={search} onChange={(e) => setSearch(e.target.value)} />
                                {/* svg */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {/* publish time filter  */}
                            <div className='w-full'>
                                <div className='bg-black/20 dark:bg-white/20 w-full px-3 rounded-xl flex max-query600:justify-center items-center  gap-10' onClick={() => setOpenModal(true)}>
                                    {/* filter title */}
                                    <p className='flex items-center gap-1.5 max-query600:hidden'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                        </svg>
                                        <span className='text-lg font-iranYekanMedium'>مرتب سازی بر اساس :</span>
                                    </p>
                                    {/* mobile show content */}
                                    <p className='flex items-center justify-center gap-1.5 p-2.5 query600:hidden'>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                        </svg>
                                        <span className='text-lg font-iranYekanMedium'>{dateFilter === "normal" ? 'عادی' : dateFilter === "new" ? 'جدید ترین' : 'قدیمی ترین'}</span>
                                    </p>
                                    {/* filter items */}
                                    <ul className='flex items-center text-sm font-vazirBold gap-7 max-query600:hidden'>
                                        <li className={`p-3.5 cursor-pointer transition duration-300 ${dateFilter === 'normal' ? 'border-y-3 border-dashed border-cusBlue' : ''} `} onClick={() => setDateFilter("normal")}>عادی</li>
                                        <li className={`p-3.5 cursor-pointer transition duration-300 ${dateFilter === 'new' ? 'border-y-3 border-dashed border-cusBlue' : ''} `} onClick={() => setDateFilter("new")}>جدید ترین</li>
                                        <li className={`p-3.5 cursor-pointer transition duration-300 ${dateFilter === 'old' ? 'border-y-3 border-dashed border-cusBlue' : ''} `} onClick={() => setDateFilter("old")}>قدیمی ترین</li>
                                    </ul>
                                </div>
                                {/* blog content */}
                                <div className='w-full mt-8 flex  items-end justify-end'>
                                    {/* blogs modal */}
                                    <div className=' w-full grid grid-cols-1 sm:grid-cols-2 query1120:grid-cols-3 gap-6 mb-5'>
                                        {
                                            filterItems.map((item) => (
                                                <BlogCart blogs={item} key={item._id} />
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* filter item in mobile */}
                <div className={`dark:bg-darkFooterBg bg-cusWhite2 fixed bottom-0 w-full z-40 rounded-t-3xl overflow-hidden transition duration-200 ${openModal ? '' : 'opacity-0 invisible'}`}>
                    <div className='flex items-center justify-between p-3.5 dark:bg-amber-50/20 bg-mainBgColorDark/30'>
                        <span className='font-vazirBold'>مرتب سازی بر اساس</span>
                        <span onClick={() => setOpenModal(false)} className='cursor-pointer'>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <ul className='p-3 font-iranYekanMedium text-sm query600:hidden'>
                        <li className='py-4 border-b flex items-center justify-between cursor-pointer' onClick={() => {
                            setDateFilter("normal")
                            setOpenModal(false)
                        }}>
                            <p>عادی</p>
                            <svg viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${dateFilter === "normal" ? '' : 'hidden'}`}>
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className='py-4 border-b flex items-center justify-between cursor-pointer' onClick={() => {
                            setDateFilter("new")
                            setOpenModal(false)
                        }}>
                            <p>جدید ترین</p>
                            <svg viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${dateFilter === "new" ? '' : 'hidden'}`}>
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className='py-4 flex items-center justify-between cursor-pointer' onClick={() => {
                            setDateFilter("old")
                            setOpenModal(false)
                        }}>
                            <p>قدیمی ترین</p>
                            <svg viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${dateFilter === "old" ? '' : 'hidden'}`}>
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </li>
                    </ul>
                </div>
                {/* dark bg */}
                <div className={`absolute w-full h-full top-0 bg-darkFooterBg/20 query600:hidden z-30 ${openModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpenModal(false)}></div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    await ConnectDb()
    const allBlog = await BlogModel.find({ publish: true }).sort({ createdAt: -1 }).populate("author", "name lastName").lean()
    return {
        props: {
            blogs: JSON.parse(JSON.stringify(allBlog))
        },
        revalidate: 60 * 60 * 72
    }
}

export default Blog