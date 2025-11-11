import ConnectDb from "@/config/ConnectDb"
import UserModel from "@/model/user"
import { validationToken } from "@/utility/auth"

const Me = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405), json({ message: "method not validate" })
    }
    try {
        await ConnectDb()

        const { ["token"]: token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "user is not login" })
        }

        const preLoadUser = validationToken(token)
        if (!preLoadUser) {
            return res.status(401).json({ message: "user is not login" })
        }

        const user = await UserModel.findOne({
            email: preLoadUser.email
        })
        return res.status(200).json({ message: user })
    } catch (err) {
        return res.status(500).json({ message: "server err" })
    }


}

export default Me