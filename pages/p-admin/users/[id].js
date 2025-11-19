import AdminLayout from '@/components/template/adminPanel/AdminLayout'
import ConnectDb from '@/config/ConnectDb';
import UserModel from '@/model/user';
import React, { useState } from 'react'
import { Camera, X } from "lucide-react";

function FindUser({ user }) {
    const [blogPageOrProfilePage, setBlogPageOrProfilePage] = useState(false)
    const [dataForm, setDataForm] = useState({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        identifyId: user.identifyId || "",
        profile: user.profile || "",
    })


    const changeStatesInfoHandler = (e) => {
        const { name, value } = e.target

        setDataForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <AdminLayout>
            <div className='flex flex-row-reverse gap-5 w-full'>
                <div className='bg-white shadow border border-black/20 rounded-2xl p-3 flex flex-col w-[300px] h-fit items-center gap-5'>
                    {
                        user.profile ? (
                            <div className='w-[85px] h-[85px] border border-cusOrang rounded-full flex items-center justify-center'>
                                <img src={user.profile} alt="profile" />
                            </div>
                        ) : (
                            <div className='w-[85px] h-[85px] border border-cusOrang rounded-full flex items-center justify-center'>
                                <svg className="size-10 text-cusOrang" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                        )
                    }
                    <p></p>
                    <div className='w-full'>
                        <ul className='flex items-end justify-end flex-col gap-2'>
                            <li className='flex items-center flex-row-reverse gap-2'>
                                <svg className="size-5 text-black/50" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                                </svg>
                                <p className='text-[12px] font-vazirBold text-black/50'>{user.phone}</p>
                            </li>
                            <li className='flex items-center flex-row-reverse gap-2'>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-black/50">
                                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
                                <p className='text-[12px] font-vazirBold text-black/50'>{user.email}</p>
                            </li>
                            <li className='flex items-center flex-row-reverse gap-2'>
                                <svg className="size-5 text-black/50" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                                </svg>
                                <p className='text-[12px] font-vazirBold text-black/50'>{user.role}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='border border-black/20 rounded-2xl w-full'>
                    <div className='p-4 border-b border-black/20'>
                        <ul className=' flex items-center flex-row-reverse justify-center gap-10'>
                            <li className={`transition-all duration-200 ${blogPageOrProfilePage ? "text-black/50" : "text-cusBlue"} cursor-pointer flex items-center flex-row-reverse gap-1 text-sm font-vazirBold`} onClick={() => setBlogPageOrProfilePage(false)}>
                                <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                                </svg>
                                <p>profile</p>
                            </li>
                            {
                                user.role === "admin" && (
                                    <li className={` transition-all duration-200 ${blogPageOrProfilePage ? "text-cusBlue" : "text-black/50"} cursor-pointer flex items-center flex-row-reverse gap-1 text-sm font-vazirBold`} onClick={() => setBlogPageOrProfilePage(true)}>
                                        <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd" />
                                        </svg>
                                        <p>Blog</p>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='p-4 flex space-y-7 flex-col'>
                        <div className='flex items-center justify-between flex-row-reverse flex-wrap space-y-5'>
                            <div className="input-group">
                                <label className="label font-vazirBold text-sm" dir='ltr'>نام</label>
                                <input autoComplete="off" name="name" id="Email" className="input text-sm font-iranYekanMedium" type="text" value={dataForm.name} onChange={changeStatesInfoHandler} />
                            </div>
                            <div className="input-group">
                                <label className="label font-vazirBold text-sm" dir='ltr'>نام‌خانوادگی</label>
                                <input autoComplete="off" name="lastName" id="Email" className="input text-sm font-iranYekanMedium" type="text" value={dataForm.lastName} onChange={changeStatesInfoHandler} />
                            </div>
                            <div className="input-group">
                                <label className="label font-vazirBold text-sm" dir='ltr'>ایمیل</label>
                                <input autoComplete="off" dir='ltr' name="Email" id="Email" className="input text-sm font-iranYekanMedium" type="email" value={dataForm.email} onChange={changeStatesInfoHandler} />
                            </div>
                            <div className="input-group">
                                <label className="label font-vazirBold text-sm" dir='ltr'>شماره‌تلفن</label>
                                <input autoComplete="off" disabled dir='ltr' name="phone " id="Email" className="input text-sm font-iranYekanMedium" type="tel" value={user.phone} onChange={changeStatesInfoHandler} />
                            </div>
                            <div className="input-group">
                                <label className="label font-vazirBold text-sm" dir='ltr'>کد‌ملی</label>
                                <input autoComplete="off" dir='ltr' name="identifyId" id="Email" className="input text-sm font-iranYekanMedium" type="number" value={dataForm.identifyId} onChange={changeStatesInfoHandler} />
                            </div>
                        </div>
                        <div className="input-group w-full">
                            <label className="label font-vazirBold " dir='ltr'>ادرس</label>
                            <input autoComplete="off" name="address" id="Email" className="input w-full text-sm font-iranYekanMedium" type="email" value={dataForm.address} onChange={changeStatesInfoHandler} />
                        </div>
                        <div className='flex items-center justify-center mt-5'>
                            <button className='text-sm font-vazirBold bg-cusOrang p-3 text-white w-[200px] rounded-2xl relative overflow-hidden shadow transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-orange-300/50 hover:shadow-2xl active:scale-95 group'>
                                اپدیت اطلاعات
                                <span className='absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 duration-700 group-hover:translate-x-[300%]'></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export async function getServerSideProps(context) {
    await ConnectDb()
    const { id } = context.params
    console.log(id);


    const getUser = await UserModel.findOne({ _id: id }).lean()


    if (!getUser) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(getUser)),
        }
    }
}

export default FindUser