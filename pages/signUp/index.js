import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { validationToken } from '@/utility/auth';
import { redirect } from 'next/navigation';

function SignUp() {
    const route = useRouter()

    // form phone value and focus 
    const [phoneValue, setPhoneValue] = useState("")
    const [phoneFocus, setPhoneFocus] = useState(false)

    // email phone value and focus
    const [emailValue, setEmailValue] = useState("")
    const [emailFocus, setEmailFocus] = useState(false)

    // password phone value and focus and show value
    const [passwordValue, setPasswordValue] = useState("")
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [ShowPassword, setShowPassword] = useState(false)

    // regex and test for phone
    const regexPhone = /^09\d{9}$/
    const checkNumber = regexPhone.test(phoneValue.trim())

    // regex and test for email
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const checkEmail = regexEmail.test(emailValue.trim())

    // password and test for email
    const regexPass = /^[A-Z][A-Za-z0-9!@#$%^&*._-]{7,}$/
    const checkPass = regexPass.test(passwordValue.trim())

    // diseabel sign up btn
    const disabled =
        !checkNumber ||
        !checkEmail ||
        !checkPass
    // load state 
    const [loading, setLoading] = useState(false);
    // sign up handler
    const SubmitFormHandler = async (e) => {
        e.preventDefault()
        const user = {
            phone: phoneValue,
            email: emailValue,
            password: passwordValue
        }
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/signup", user, {
                "withCredentials": true
            })
            if (res.status === 201) {
                toast.success("ثبت نام با موفقیت انجام شد خوش امدید")
                setPhoneValue("")
                setEmailValue("")
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
                    case 409:
                        toast.error("این کاربر از قبل ثبت‌نام کرده است!");
                        break;
                    case 500:
                        toast.error("مشکلی در سرور رخ داده است. لطفاً دوباره تلاش کنید!");
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
                <title>ثبت‌نام</title>
            </Head>
            {/* main content */}
            <div className="flex sm:items-center justify-center h-dvh overflow-hidden">
                <ToastContainer style={{ width: "330px", textWrap: "nowrap", marginRight: "14px", marginTop: "20px" }} autoClose={2500} position='top-right' />
                <div className="flex items-center max-sm:gap-5 justify-end sm:justify-between max-sm:flex-col-reverse w-[1100px] max-sm:h-[730px]  p-6 sm:p-4 overflow-hidden">
                    {/* sign up container */}
                    <div>
                        <h2 className="text-2xl hidden md:block query860:text-3xl font-vazirBold mb-3">خوش آمدید</h2>
                        {/* sign up form */}
                        <form className="flex flex-col p-2 sm:p-5 query860:p-10 w-[320px] md:w-[350px] lg:w-[400px]">
                            {/* sign up title */}
                            <h2 className="text-xl font-iranYekanMedium mb-8">ثبت نام</h2>
                            {/* phone input content */}
                            <div className={`border transition-all shadow ${phoneFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'}  flex flex-col relative rounded-3xl`}>
                                <label htmlFor="phone" className={`cursor-pointer absolute transition-all ${phoneFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>شماره همراه</label>
                                <input id='phone' placeholder={phoneFocus ? 'شماره همراه خود‌را وارد کنید' : ''} autoComplete='off' type="number" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} className='placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20  p-2 border-0 outline-0 cursor-pointer text-[15px] font-medium' onFocus={() => setPhoneFocus(true)} onBlur={() => {
                                    if (phoneValue.trim().length === 0) {
                                        setPhoneFocus(false)
                                    }
                                }} />
                            </div>
                            {/* phone input validation text */}
                            {
                                phoneValue.trim().length > 0 && phoneFocus ? (
                                    !checkNumber ? (
                                        <div className='mt-1 mr-3 text-[12px] font-iranYekanMedium text-red-500 '>لطفا شماره معتبر وارد کنید</div>
                                    ) : (
                                        <div className='mt-1 mr-3 text-[12px] font-iranYekanMedium text-green-600 '>شماره صحیح است</div>
                                    )
                                ) : null
                            }
                            {/* email input content */}
                            <div className={`border transition-all mt-6 ${emailFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
                                <label htmlFor="email" className={`cursor-pointer absolute transition-all ${emailFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>ایمیل</label>
                                <input id='email' type="text" placeholder={emailFocus ? 'ایمیل خود‌را وارد کنید' : ''} autoComplete='off' className='p-2 border-0 outline-0 placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20  cursor-pointer text-[15px] font-medium' value={emailValue} onChange={e => setEmailValue(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => {
                                    if (emailValue.trim().length === 0) {
                                        setEmailFocus(false)
                                    }
                                }} />
                            </div>
                            {/* email input validation text */}
                            {
                                emailValue.trim().length > 0 && emailFocus ? (
                                    !checkEmail ? (
                                        <div className='mt-1 mr-3 text-[12px] font-iranYekanMedium text-red-500 '>لطفا ایمیل معتبر وارد کنید</div>
                                    ) : (
                                        <div className='mt-1 mr-3 text-[12px] font-iranYekanMedium text-green-600 '>ایمیل صحیح است</div>
                                    )
                                ) : null
                            }
                            {/* password input content */}
                            <div className={`border transition-all mt-6 ${passwordFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
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
                            {/* password input validation text */}
                            <div className={` flex items-center gap-4 ${passwordValue.trim().length > 0 && passwordFocus ? 'opacity-100 visible mt-1 mr-3' : 'opacity-0 invisible'}`}>
                                {
                                    passwordValue.trim().charAt(0) === passwordValue.trim().charAt(0).toUpperCase() &&
                                        /[A-Z]/.test(passwordValue.trim().charAt(0)) ? (
                                        <p className='text-[11px] sm:text-[12px] font-iranYekanMedium text-green-600 text-nowrap '>حرف اول بزرگ است</p>
                                    ) : (
                                        <p className='text-[11px] sm:text-[12px] font-iranYekanMedium text-red-500 text-nowrap'>حرف اول باید بزرگ باشد</p>
                                    )
                                }
                                {
                                    passwordValue.trim().length < 8 ? (
                                        <p className='text-[11px] sm:text-[12px] font-iranYekanMedium text-red-500 text-nowrap'>پسورد باید بیشتر از 8 کاراکتر باشد</p>
                                    ) : passwordValue.trim().length === 8 ? (
                                        <p className='text-[11px] sm:text-[12px] font-iranYekanMedium text-amber-400text-nowrap' >پسورد دقیقا 8 کاراکتر</p>
                                    ) : (
                                        <p className='text-[11px] sm:text-[12px] font-iranYekanMedium text-green-600  text-nowrap'>پسورد بیشتر از 8 کاراکتره</p>
                                    )

                                }
                            </div>
                            {/* login btn */}
                            <button type='submit' className='shadow p-2  mt-4 rounded-3xl transition-all duration-200 text-white bg-cusBlue hover:bg-cusBlue/50 disabled:bg-[#E2E2E2] dark:disabled:bg-[#2F2F2F] cursor-pointer disabled:cursor-auto font-iranYekanBold' disabled={disabled || loading} onClick={SubmitFormHandler}>
                                {
                                    loading ? "در حال ثبت‌نام..." : "ثبت نام"
                                }
                            </button>
                        </form>
                        {/* forget password btn */}
                        <span className='text-center text-[13px] lg:text-sm font-iranYekanBold flex items-center justify-center gap-1 text-textLight dark:text-white mt-1.5 sm:-mt-2.5'>رمز عبور خود را فراموش کرده اید؟<Link href={"/"} className='text-cusBlue'>بازیابی رمز عبور</Link></span>
                        {/* login btn */}
                        <div className='relative cus-line_signup flex items-center justify-center mt-4'>
                            <span className=' bg-mainBgColor dark:bg-mainBgColorDark px-5 text-[#A6A6A6] font-iranYekanRegular text-sm'>ثبت نام</span>
                        </div>
                        <span className='text-center text-[13px] lg:text-sm font-iranYekanBold flex items-center justify-center gap-1 text-textLight dark:text-white mt-2.5'>عضو سفرکن هستید؟<Link href={"/login"} className='text-cusBlue'>ورود</Link></span>
                    </div>
                    {/* img container */}
                    <div className="relative w-full sm:w-[300px] md:w-[400px] query860:w-[470px] lg:w-[600px] h-[220px] sm:h-[470px] md:h-[520px] query860:h-[570px] lg:h-[650px] flex-shrink-0">
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
    );
}

export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies

    if (!token) {
        return {
            props: {}
        }
    }
    const isValidationToken = await validationToken(token)
    if (isValidationToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {}
    };
}


export default SignUp;
