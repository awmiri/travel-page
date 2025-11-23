import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function Create() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")
    const disabledBtn = !title || !content || !description || !img
    const [preview, setPreview] = useState('')
    const handlerAddImg = (e) => {
        const file = e.target.files[0]
        if (!file) {
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.warn("حجم فایل بیش از 10 مگ است")
        }
        setImg(file)
        console.log(file);


        const rerender = new FileReader()

        rerender.onloadend = () => {
            setPreview(rerender.result)
        }
        rerender.readAsDataURL(file)
    }
    const removeImgHandler = (e) => {
        setPreview(null)
        setImg("")
        const input = document.getElementById("img")
        if (input) {
            input.value = ""
        }
    }
    const createBlog = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("description", description);
        if (img) {
            formData.append("img", img);
        }
        try {
            const res = await axios.post("/api/blog", formData, {
                withCredentials: true
            })
            if (res.status === 201) {
                toast.success("بلاگ با موفقیت اضافه شد😊")
                setTitle("");
                setContent("");
                setDescription("");
                setImg("");
                setPreview("");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <AdminLayout>
            <ToastContainer />
            <div className=' flex items-start justify-center w-full'>
                <div className="flex flex-col items-center justify-center bg-cusBlue rounded-2xl w-[400px]">
                    <div className="w-full max-w-md shadow-md p-6">
                        <h2 className="text-2xl font-vazirBold mb-4 text-white">ثبت بلاگ</h2>

                        <form className="flex flex-col flex-wrap">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full ml-[2%]"
                                placeholder="عنوان بلاگ"
                            />

                            <textarea
                                name="message"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full h-25 ml-[2%]"
                                placeholder="محتوا"
                            ></textarea>
                            <textarea
                                name="message"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-white/20 ring-white placeholder:text-white/50 placeholder:font-iranYekanBold placeholder:text-sm  text-white font-iranYekanBold border-0 rounded-md p-2.5 mb-5 focus:bg-white/40 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150 w-full ml-[2%]"
                                placeholder="توضیح گوتاه"
                            ></textarea>

                            <div class={`max-w-md mx-auto rounded-2xl md:max-w-xl  ${preview ? 'relative group ' : 'overflow-hidden'}`}>
                                {
                                    preview ? (
                                        <>
                                            <img src={preview} alt="" className='rounded-xl  object-center h-[200px]' />
                                            <div className='p-1 bg-red-500 absolute rounded-full text-white -top-2 -right-3 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" onClick={removeImgHandler}>
                                                    <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="md:flex">
                                            <div className="w-full">
                                                <div className="relative h-40 rounded-2xl border-2 border-white bg-white/50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                    <div className="absolute flex flex-col items-center">
                                                        <img alt="File Icon" className="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png" />
                                                        <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                                                        <span className="block text-white font-normal mt-1"> or click to upload</span>
                                                    </div>
                                                    <input id='img' name="" className="h-full w-full opacity-0 cursor-pointer" type="file" accept="image/*"
                                                        onChange={handlerAddImg} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <button disabled={disabledBtn} onClick={createBlog} className="bg-cusOrang disabled:bg-cusOrang/20 mt-5 p-2.5 rounded-lg text-white font-vazirBold cursor-pointer hover:bg-cusOrang/95 transition">
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