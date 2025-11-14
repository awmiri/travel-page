import UserModel from '@/model/user'
import { validationToken } from '@/utility/auth'
import React from 'react'

const index = () => {
    return (
        <div>index</div>
    )
}
export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies
    const isValidateToken = validationToken(token)

    if (!token && !isValidateToken) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    const getAdmin = await UserModel.findOne({
        email: isValidateToken.email
    })
    if (getAdmin.role !== "admin") {
        return {
            redirect: {
                destination: "/"
            }
        }
    }
    return {
        props: {
            data: JSON.parse(JSON.stringify(getAdmin))
        }
    }
}

export default index