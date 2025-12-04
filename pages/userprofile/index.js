
import React, { useState } from 'react'
import ConnectDb from '@/config/ConnectDb'
import { validationToken } from '@/utility/auth'
import Layout from '@/components/template/userpanel/Layout'
import UserModel from '@/model/user'
import { Camera, X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'

function UserProfile({ user: initialUser }) {
    const [user, setUser] = useState(initialUser);
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

    const [preview, setPreview] = useState(user?.profile || null)
    const handleProfileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.warn("حجم فایل بیش از 5 مگ است")
        }
        setDataForm(prev => ({ ...prev, profile: file }))

        const reRender = new FileReader()
        reRender.onloadend = () => {
            setPreview(reRender.result)
        }
        reRender.readAsDataURL(file)
    }
    const removeProfile = (e) => {
        setPreview(null)
        setDataForm(prev => ({ ...prev, profile: "" }))
        const input = document.getElementById("profile-input")
        if (input) {
            input.value = ""
        }
    }
    const SubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('lastName', dataForm.lastName);
        formData.append('email', dataForm.email);
        formData.append('address', dataForm.address);
        formData.append('identifyId', dataForm.identifyId);

        if (dataForm.profile instanceof File) {
            formData.append('profile', dataForm.profile);
        }
        try {
            await ConnectDb()

            const res = await axios.patch(`/api/generaledit/${user._id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.user) {
                setUser(res.data.user);
                setPreview(res.data.user.profile || null);
                toast.success('پروفایل با موفقیت آپدیت شد');
            }
        } catch (err) {
            console.error(err)
            toast.error("خطا اتصال")
        }
    }
    return (
        <Layout info={user}>
            <div className='border border-black/20 rounded-2xl w-full'>
                <div className='p-4 border-b border-black/20'>
                    <div className={`transition-all flex items-center justify-center duration-200 text-cusBlue gap-1 text-sm font-vazirBold`}>
                        <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                        </svg>
                        <p>profile</p>
                    </div>
                </div>
                <div className='p-4 flex space-y-7 flex-col'>
                    <div className='mt-5 flex flex-col items-center'>
                        {
                            preview ? (
                                <div className='relative group'>
                                    <img src={preview} alt="profile" className="w-30 h-30 object-cover rounded-full border-4 border-dashed hover:border-solid border-cusOrang shadow-2xl transition-all duration-300 group-hover:border-cusOrang/50" />
                                    <button onClick={removeProfile} className='absolute top-0 -right-1 text-white bg-red-600 p-1 rounded-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 cursor-pointer' ><X size={20} /></button>
                                </div>
                            ) : (
                                <label htmlFor="profile-input" className='flex items-center justify-center flex-col border-4 border-dashed border-cusOrang w-30 h-30 rounded-full bg-black/5 group cursor-pointer'>
                                    <Camera size={40} className='text-cusOrang group-hover:scale-125 transition-all duration-200' />
                                    <span className='text-[12px] mt-2 font-vazirBold'>انتخواب‌‌عکس</span>
                                </label>
                            )
                        }
                        <input
                            type="file"
                            id="profile-input"
                            accept="image/*"
                            onChange={handleProfileChange}
                            className="hidden"
                        />
                        <p className="text-xs text-gray-500 text-center mt-3">
                            فرمت‌های مجاز: JPG, PNG, GIF • حداکثر ۵ مگابایت
                        </p>
                    </div>
                    <div className='flex items-center justify-between flex-row-reverse flex-wrap space-y-5 mt-3'>
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
                            <input autoComplete="off" disabled dir='ltr' name="Email" id="Email" className="input text-sm font-iranYekanMedium" type="email" value={dataForm.email} onChange={changeStatesInfoHandler} />
                        </div>
                        <div className="input-group">
                            <label className="label font-vazirBold text-sm" dir='ltr'>شماره‌تلفن</label>
                            <input autoComplete="off" disabled dir='ltr' name="phone " id="Email" className="input text-sm font-iranYekanMedium" type="tel" value={user.phone} onChange={changeStatesInfoHandler} />
                        </div>
                        <div className="input-group mb-4">
                            <label className="label font-vazirBold text-sm" dir='ltr'>کد‌ملی</label>
                            <input autoComplete="off" dir='ltr' name="identifyId" id="Email" className="input text-sm font-iranYekanMedium" type="number" value={dataForm.identifyId} onChange={changeStatesInfoHandler} />
                        </div>
                    </div>
                    <div className="input-group w-full">
                        <label className="label font-vazirBold " dir='ltr'>ادرس</label>
                        <input autoComplete="off" name="address" id="Email" className="input w-full text-sm font-iranYekanMedium" type="email" value={dataForm.address} onChange={changeStatesInfoHandler} />
                    </div>
                    <div className='flex items-center justify-center mt-3'>
                        <button className='text-sm font-vazirBold bg-cusOrang p-3 text-white w-[200px] rounded-2xl relative overflow-hidden shadow transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-orange-300/50 hover:shadow-2xl active:scale-95 group' onClick={SubmitHandler}>
                            اپدیت اطلاعات
                            <span className='absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 duration-700 group-hover:translate-x-[300%]'></span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>

    )
}
export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies

    const validate = validationToken(token)
    console.log(validate);

    if (!token || !validate) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    await ConnectDb()
    const getUser = await UserModel.findOne({ email: validate.email })


    return {
        props: {
            user: JSON.parse(JSON.stringify(getUser))
        }
    }

}

export default UserProfile