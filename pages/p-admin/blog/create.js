import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import React from 'react'

function Create() {
    return (
        <AdminLayout>
            <div className=' flex items-start justify-center w-full'>
                <div class="flex flex-col items-center justify-center bg-cusBlue rounded-2xl w-[400px]">
                    <div class="w-full max-w-md shadow-md p-6">
                        <h2 class="text-2xl font-vazirBold mb-4 text-white">ثبت بلاگ</h2>

                        <form class="flex flex-col flex-wrap">
                            <input
                                type="text"
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full ml-[2%]"
                                placeholder="عنوان بلاگ"
                            />

                            <textarea
                                name="message"
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full ml-[2%]"
                                placeholder="توضیح"
                            ></textarea>
                            <textarea
                                name="message"
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full h-25 ml-[2%]"
                                placeholder="محتوا"
                            ></textarea>

                            <div class="max-w-md mx-auto rounded-2xl overflow-hidden md:max-w-xl">
                                <div class="md:flex">
                                    <div class="w-full">
                                        <div class="relative h-40 rounded-2xl border-2 border-white bg-white/50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                            <div class="absolute flex flex-col items-center">
                                                <img alt="File Icon" class="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png" />
                                                <span class="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                                                <span class="block text-white font-normal mt-1"> or click to upload</span>
                                            </div>
                                            <input name="" class="h-full w-full opacity-0 cursor-pointer" type="file" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="bg-cusOrang mt-5 p-2.5 rounded-lg text-white font-vazirBold cursor-pointer hover:bg-cusOrang/95 transition">
                                ساخت بلاگ
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Create