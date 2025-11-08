import React, { useState } from 'react'
import Image from "next/image";

function SignUp() {
    const [phoneValue, setPhoneValue] = useState("")
    const [phoneFocus, setPhoneFocus] = useState(false)

    const [emailValue, setEmailValue] = useState("")
    const [emailFocus, setEmailFocus] = useState(false)

    const [passwordValue, setPasswordValue] = useState("")
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [ShowPassword, setShowPassword] = useState(false)

    const [rePasswordValue, setRePasswordValue] = useState("")
    const [rePasswordFocus, setRePasswordFocus] = useState(false)
    const [ShowRePassword, setShowRePassword] = useState(false)
    const disabled =
        phoneValue.trim().length === 0 ||
        emailValue.trim().length === 0 ||
        passwordValue.trim().length === 0 ||
        rePasswordValue.trim().length === 0 ||
        rePasswordValue.trim() !== passwordValue.trim();
    return (
        <div className="flex items-center justify-center h-dvh overflow-hidden">
            <div className="flex items-center justify-between w-[1100px] rounded-2xl  overflow-hidden">
                <div>
                    <h2 className="text-3xl font-iranYekanBold mb-4">خوش آمدید</h2>
                    <form className="flex flex-col gap-9 p-10 w-[400px]">
                        <h2 className="text-xl font-iranYekanMedium mb-2">ثبت نام</h2>
                        <div className={`border transition-all shadow ${phoneFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'}  flex flex-col relative rounded-3xl`}>
                            <label htmlFor="phone" className={`cursor-pointer absolute transition-all ${phoneFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>شماره همراه</label>
                            <input id='phone' placeholder={phoneFocus ? 'شماره همراه خود‌را وارد کنید' : ''} type="number" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} className='placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20  p-2 border-0 outline-0 cursor-pointer text-[15px] font-medium' onFocus={() => setPhoneFocus(true)} onBlur={() => {
                                if (phoneValue.trim().length === 0) {
                                    setPhoneFocus(false)
                                }
                            }} />
                        </div>
                        <div className={`border transition-all ${emailFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
                            <label htmlFor="email" className={`cursor-pointer absolute transition-all ${emailFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>ایمیل</label>
                            <input id='email' type="text" placeholder={emailFocus ? 'ایمیل خود‌را وارد کنید' : ''} className='p-2 border-0 outline-0 placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20  cursor-pointer text-[15px] font-medium' value={emailValue} onChange={e => setEmailValue(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => {
                                if (emailValue.trim().length === 0) {
                                    setEmailFocus(false)
                                }
                            }} />
                        </div>
                        <div className={`border transition-all ${passwordFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
                            <label htmlFor="password" className={`cursor-pointer absolute transition-all ${passwordFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>رمز عبور</label>
                            <input placeholder={passwordFocus ? 'پسورد خود‌را وارد کنید' : ''} id='password' type={`${ShowPassword ? "text" : "password"}`} className='p-2 border-0 outline-0 placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20 cursor-pointer text-[15px] font-medium' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => {
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
                        <div className={`border transition-all ${rePasswordFocus ? 'border-cusBlue' : 'border-textLight/25 dark:border-white/25'} shadow flex flex-col relative rounded-3xl`}>
                            <label htmlFor="repass" className={`cursor-pointer absolute transition-all ${rePasswordFocus ? '-top-6 right-1 text-[11px] text-cusBlue font-bold' : 'text-[13px] top-2 right-4 text-[#898989] font-iranYekanMedium'}`}>تکرار رمز عبور</label>
                            <input id='repass' placeholder={rePasswordFocus ? 'پسورد را مجدد وارد کیند' : ''} type={`${ShowRePassword ? "text" : "password"}`} className='p-2 border-0 outline-0 placeholder:text-[12px] placeholder:text-black/25 dark:placeholder:text-white/20 cursor-pointer text-[15px] font-medium' value={rePasswordValue} onChange={e => setRePasswordValue(e.target.value)} onFocus={() => setRePasswordFocus(true)} onBlur={() => {
                                if (rePasswordValue.trim().length === 0) {
                                    setRePasswordFocus(false)
                                }
                            }} />
                            <svg className={`w-6 h-6 text-[#898989] absolute top-2 left-3 ${ShowRePassword ? 'hidden' : ''}`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => setShowRePassword(true)}>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <svg className={`w-6 h-6 text-[#898989] absolute top-2 left-3 ${ShowRePassword ? '' : 'hidden'}`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => setShowRePassword(false)}>
                                <path stroke="currentColor" strokeWidth="1" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                <path stroke="currentColor" strokeWidth="1" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </div>
                        <button className='shadow p-2 rounded-3xl transition-all text-white bg-cusBlue disabled:bg-[#E2E2E2] dark:disabled:bg-[#2F2F2F] cursor-pointer disabled:cursor-auto font-iranYekanBold' disabled={disabled}>ثبت نام</button>
                    </form>
                </div>
                <div className="relative w-[600px] h-[650px] flex-shrink-0">
                    <Image
                        src="/sign-login/Login-img.webp"
                        alt="login image"
                        fill
                        className="object-cover rounded-4xl"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
