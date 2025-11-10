import { validationToken } from '@/utility/auth'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function Login() {
    const route = useRouter()

    // form phone value and focus 
    const [entryValue, setEntryValue] = useState("")
    const [entryFocus, setEntryFocus] = useState(false)

    // password phone value and focus and show value
    const [passwordValue, setPasswordValue] = useState("")
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [ShowPassword, setShowPassword] = useState(false)
    // disabled btn
    const disabled = entryValue.trim().length <= 3 || passwordValue.trim().length <= 3
    // load state 
    const [loading, setLoading] = useState(false);
    // sign up handler
    const loginFormHandler = async (e) => {
        e.preventDefault()
        const user = {
            entry: entryValue,
            password: passwordValue
        }
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/login", user, {
                "withCredentials": true
            })
            if (res.status === 200) {
                toast.success("خوش آمدی! ورودت با موفقیت انجام شد.")
                setEntryValue("")
                setPasswordValue("")
                setTimeout(() => {
                    route.replace("/")
                }, 3000);
            }
        } catch (err) {
            if (err.response) {
                const { status } = err.response;
                switch (status) {
                    case 400:
                        toast.warning("لطفاً تمام فیلدها را پر کنید!");
                        break;
                    case 404:
                        toast.error("کاربر پیدا نشد");
                        break;
                    case 423:
                        toast.error("مقادیر معتبر نیستنئ");
                        break;
                    default:
                        toast.error("خطای ناشناخته‌ای رخ داده است.");
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* page title */}
            <Head>
                <title>ورود</title>
            </Head>
            {/* main content */}
            <div className="flex sm:items-center justify-center h-dvh overflow-hidden">
                <ToastContainer style={{ width: "330px", textWrap: "nowrap", marginRight: "14px", marginTop: "20px" }} autoClose={2700} position='top-right' />
                <div className="flex items-center justify-between max-sm:flex-col-reverse w-[1100px] max-sm:h-[680px] rounded-2xl p-6 sm:p-4 overflow-hidden">
                    {/* sign up container */}
                    <div>
                        <h2 className="text-2xl hidden md:block query860:text-3xl font-vazirBold mb-3">خوش آمدید</h2>
                        {/* sign up form */}
                        <form className="flex flex-col p-2 sm:p-5 query860:p-10 w-[320px] md:w-[350px] lg:w-[400px]">
                            {/* sign up title */}
                            <h2 className="text-xl font-iranYekanBold mb-8">ورود</h2>
                            {/* phone input content */}
                            <div className={`border transition-all shadow ${entryFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'}  flex flex-col relative rounded-3xl`}>
                                <label htmlFor="phone" className={`cursor-pointer absolute transition-all ${entryFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>شماره یا ایمیل</label>
                                <input id='phone' placeholder={entryFocus ? 'شماره همراه  یا ایمیل خود‌را وارد کنید' : ''} autoComplete='off' type="text" value={entryValue} onChange={e => setEntryValue(e.target.value)} className='placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20  p-2 border-0 outline-0 cursor-pointer text-[15px] font-medium' onFocus={() => setEntryFocus(true)} onBlur={() => {
                                    if (entryValue.trim().length === 0) {
                                        setEntryFocus(false)
                                    }
                                }} />
                            </div>
                            {/* password input content */}
                            <div className={`border transition-all mt-8 ${passwordFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
                                <label htmlFor="password" className={`cursor-pointer absolute transition-all ${passwordFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>رمز عبور</label>
                                <input placeholder={passwordFocus ? 'پسورد خود‌را وارد کنید' : ''} autoComplete='off' id='password' type={`${ShowPassword ? "text" : "password"}`} className='p-2 border-0 outline-0 placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20 cursor-pointer text-[15px] font-medium' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => {
                                    if (passwordValue.trim().length === 0) {
                                        setPasswordFocus(false)
                                    }
                                }} />
                                <svg className={`w-6 cursor-pointer h-6 text-[#898989] absolute top-2 left-3 ${ShowPassword ? 'hidden' : ''}`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => setShowPassword(true)}>
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <svg className={`w-6 cursor-pointer h-6 text-[#898989] absolute top-2 left-3 ${ShowPassword ? '' : 'hidden'}`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => setShowPassword(false)}>
                                    <path stroke="currentColor" strokeWidth="1" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="1" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>
                            {/* login btn */}
                            <button type='submit' className='shadow p-2  mt-6 rounded-3xl transition-all duration-200 text-white bg-cusBlue hover:bg-cusBlue/50 disabled:bg-[#E2E2E2] dark:disabled:bg-[#2F2F2F] cursor-pointer disabled:cursor-auto font-iranYekanBold' disabled={disabled || loading} onClick={loginFormHandler}>
                                {
                                    loading ? "در حال ورود..." : "ورود"
                                }
                            </button>
                        </form>
                        {/* forget password btn */}
                        <span className='text-center text-[13px] lg:text-sm font-iranYekanBold flex items-center justify-center gap-1 text-textLight dark:text-white mt-1.5 sm:-mt-2.5'>رمز عبور خود را فراموش کرده اید؟<Link href={"/"} className='text-cusBlue'>بازیابی رمز عبور</Link></span>
                        {/* login btn */}
                        <div className='relative cus-line_signup flex items-center justify-center mt-4'>
                            <span className=' bg-white dark:bg-[#121212] px-5 text-[#A6A6A6] font-iranYekanRegular text-sm'>ورود</span>
                        </div>
                        <span className='text-center text-[13px] lg:text-sm font-iranYekanBold flex items-center justify-center gap-1 text-textLight dark:text-white mt-2.5'>حساب کاربری ندارید؟<Link href={"/signup"} className='text-cusBlue'>ثبت نام</Link></span>
                    </div>
                    {/* img container */}
                    <div className="relative w-full sm:w-[300px] md:w-[400px] query860:w-[470px] lg:w-[600px] h-[300px] sm:h-[470px] md:h-[520px] query860:h-[570px] lg:h-[650px] flex-shrink-0">
                        <Image
                            src="/sign-login/Login-img.webp"
                            alt="login image"
                            fill
                            className="object-center rounded-4xl"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies

    const isValidationToken = validationToken(token)
    if (!token || !isValidationToken) {
        return {
            redirect: {
                destination: "/signup",
                permanent: false
            }
        }
    }


    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}
export default Login