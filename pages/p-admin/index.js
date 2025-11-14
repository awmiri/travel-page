import AdminPanelHeader from '@/components/template/adminPanel/AdminPanelHeader'
import PanelContent from '@/components/template/adminPanel/PanelContent'
import PanelNav from '@/components/template/adminPanel/PanelNav'
import ConnectDb from '@/config/ConnectDb'
import UserModel from '@/model/user'
import { validationToken } from '@/utility/auth'
import React from 'react'

const index = ({ data }) => {
    return (
        <div>
            <AdminPanelHeader information={data} />
            <div>
                <PanelNav />
                <PanelContent />
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    const { ["token"]: token } = context.req.cookies
    const isValidateToken = validationToken(token)
    await ConnectDb()
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