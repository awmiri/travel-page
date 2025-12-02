
import React from 'react'
import ConnectDb from '@/config/ConnectDb'
import { validationToken } from '@/utility/auth'
import Layout from '@/components/template/userpanel/Layout'
import UserModel from '@/model/user'

function UserProfile({ user }) {
    return (
        <Layout info={user}>
            <div>dsfdsf</div>
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