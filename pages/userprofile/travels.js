import Layout from '@/components/template/userpanel/Layout'
import ConnectDb from '@/config/ConnectDb'
import UserModel from '@/model/user'
import { validationToken } from '@/utility/auth'
import Lottie from "lottie-react";
import animationData from "@/public/lotti/emptybox.json"

import React from 'react'
import Link from 'next/link';

function Travels({ user }) {
    return (
        <Layout info={user}>
            <div className='w-full flex items-center justify-center'>
                {
                    user?.travels ? (
                        <p>nothing</p>
                    ) : (
                        <div className='flex items-center justify-center flex-col'>
                            <Lottie animationData={animationData} loop={true} className='w-[320px]' />
                            <p className='mt-5 font-vazirBold'>هنوز هیچ سفری ثبت نکردید :(</p>
                            <Link href={"/travel"} className='border px-7 py-1.5 font-iranYekanBold rounded-2xl transition mt-2 hover:bg-darkFooterBg hover:border-textLight/50 hover:text-white  '>ثبت سفر</Link>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies

    const validate = validationToken(token)

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

export default Travels