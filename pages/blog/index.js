import BlogCart from '@/components/module/BlogCart';
import Header from '@/components/module/Header'
import ConnectDb from '@/config/ConnectDb'
import BlogModel from '@/model/blog'
import Image from 'next/image';
import React from 'react'

function Blog({ blogs }) {
    console.log(blogs);

    return (
        <div>
            <Header />
            <div className='mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px]'>
                <div className='mt-10 flex items-center justify-between'>
                    <div className='flex items-center gap-2.5'>
                        <div className='w-[25px] h-[25px] rounded-[6px] bg-amber-300'></div>
                        <h3 className='text-2xl font-vazirBold'>وبلاگ</h3>
                    </div>
                    <span className='text-2xl font-vazirBold text-black/50 dark:text-white/50'> {blogs.length}مقاله </span>
                </div>
                <div className='mt-10'>
                    <div className='flex items-center gap-5'>
                        <div className='bg-black/20 dark:bg-white/20 flex items-center pl-1.5 rounded-xl '>
                            <input type="text" className='p-3.5 border-0 outline-0 placeholder:text-sm dark:placeholder:text-white font-iranYekanBold text-sm font-vazirBold text-darkFooterBg' placeholder='جستجو' />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='bg-black/20 dark:bg-white/20 w-full px-3 rounded-xl flex items-center  gap-10'>
                            <p className='flex items-center gap-1.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                <span className='text-lg font-iranYekanMedium'>مرتب سازی بر اساس :</span>
                            </p>
                            <ul className='flex items-center text-sm font-vazirBold gap-7'>
                                <li className='p-3.5 cursor-pointer border-y-3 border-dashed border-cusBlue'>عادی</li>
                                <li className='p-3.5 cursor-pointer '>جدید ترین</li>
                                <li className='p-3.5 cursor-pointer '>قدیمی ترین</li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full mt-6 flex items-end justify-end'>
                        <div className='w-[1150px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                blogs.map((item) => (
                                    <BlogCart blogs={item} />
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
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