import Header from '@/components/module/Header'
import ConnectDb from '@/config/ConnectDb'
import BlogModel from '@/model/blog'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BlogShow({ blogs }) {
    console.log(blogs);

    return (
        <>
            <Head>
                <title>{blogs.title}</title>
            </Head>
            <Header />
            <div className='mx-[20px] md:mx-[24px] query1000:mx-[60px] query1120:mx-[71.5px] mt-5 mb-5'>
                <div className='flex items-center gap-1.5 text-[11px] hide-scrollbar text-nowrap overflow-scroll query500:text-xs sm:text-sm font-iranYekanBold text-textLight'>
                    <Link href={'/'} className='hover:text-cusBlue transition-all'>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                    </Link>
                    <span>/</span>
                    <Link href={'/blog'} className='hover:text-cusBlue transition-all'>بلاگ</Link>
                    <span>/</span>
                    <Link href={`/blog/${blogs._id}`} className='hover:text-cusBlue transition-all'>{blogs.title}</Link>
                </div>
                <div className='flex items-center justify-center mt-7'>
                    <div className='bg-cusWhite/70 dark:bg-textLight w-[1000px] p-5 rounded-2xl'>
                        <div className='border-b-2 border-dashed pb-5 border-black/40 font-vazirBold text-xl'>
                            <h1>{blogs.title}</h1>
                        </div>
                        <div className='mt-4'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='flex items-center gap-1 font-iranYekanMedium text-sm text-black/50 dark:text-white/60'>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span>{blogs.author.name} {blogs.author.lastName}</span>
                                </div>
                                <div className='flex items-center gap-1 font-iranYekanMedium text-sm text-black/50 dark:text-white/60'>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    <span>{new Date(blogs.createdAt).toLocaleDateString("fa-IR")}</span>
                                </div>
                            </div>
                            <Image src={blogs.img} width={1000} height={500} alt='blog img' className='rounded-xl w-full h-[400px]' />
                            <div
                                className="prose prose-lg max-w-none text-gray-700 dark:text-white/60 leading-relaxed font-iranYekanMedium mt-6"
                                dangerouslySetInnerHTML={{ __html: blogs.content }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export async function getStaticPaths() {
    await ConnectDb();

    const blogs = await BlogModel.find({ publish: true }).select('_id').lean();

    const paths = blogs.map((blog) => ({
        params: { id: blog._id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}
export async function getStaticProps({ params }) {
    await ConnectDb()
    const blog = await BlogModel.findById(params.id)
        .populate("author", "name lastName avatar")
        .lean();
    if (!blog || !blog.publish) {
        return { notFound: true };
    }
    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blog))
        },
        revalidate: 60 * 60 * 72
    }
}
export default BlogShow