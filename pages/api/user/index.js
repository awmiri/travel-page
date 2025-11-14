import ConnectDb from '@/config/ConnectDb'
import UserModel from '@/model/user'


const User = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "method not valid" })
    }

    try {
        await ConnectDb()
        const getUser = await UserModel.find({}, "-password")

        if (!getUser) {
            return res.status(404).json({ message: "user not found" })
        }

        return res.status(200).json({
            success: true,
            number: getUser.length,
            data: getUser
        })
    } catch (err) {
        return res.status(500).json({ message: "data base error" })
    }
}

export default User