import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BlogCart({ blogs }) {
    return (
        <div className='bg-black/30 w-[300PX] h-[460px] rounded-2xl'>
            <Link href={`/blog/${blogs._id}`}>
                <Image src={blogs.img} width={100}
                    height={100} className="w-[350PX] h-[200PX] rounded-b-3xl rounded-t-2xl" />
            </Link>
            <div className='px-3 flex flex-col justify-between h-[260px] '>
                <Link href={`/blog/${blogs._id}`} className='inline-block mt-2.5 font-iranYekanBold text-lg text-justify'>{blogs.title}</Link>
                <div className=' line-clamp-3 mt-2.5 text-sm font-iranYekanMedium text-textLight/60'>{blogs.description}</div>
                <div className='flex items-baseline-last justify-between mt-2.5 text-textLight'>
                    <span className='font-iranYekanBold text-[13px]'>{blogs.author.name} {blogs.author.lastName}</span>
                    <span className='font-iranYekanBold text-sm'>{new Date(blogs.createdAt).toLocaleDateString("fa-IR")}</span>
                </div>
                <div className='text-center gap-1 p-3 border-t mt-2 text-textLight/80 font-vazirBold transition'>
                    <Link href={`/blog/${blogs._id}`} className='text-center hover:text-cusBlue transition'>
                        مشاهده مقاله
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCart