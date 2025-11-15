import ConnectDb from "@/config/ConnectDb"
import BlogModel from "@/model/blog"
import UserModel from "@/model/user"
import { validationToken } from "@/utility/auth"

const GrtAllBlogs = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "method not valid" })
    }
    try {
        await ConnectDb()
        const { ["token"]: token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "token not provided" })
        }
        const checkValidateToken = validationToken(token)
        if (!checkValidateToken) {
            return res.status(423).json({ message: "you haven't the legal token" })
        }
        const findUser = await UserModel.findOne({ email: checkValidateToken.email })
        if (!findUser) {
            return res.status(404).json({ message: "user not found" })
        }

        if (findUser.role !== "admin") {
            return res.status(430).json({ message: "your role is not admin" })
        }
        const getAllBlog = await BlogModel.find({})

        return res.status(200).json({
            message: "get blog successfully",
            data: getAllBlog,
            cuntBlog: getAllBlog.length
        })
    } catch (err) {
        console.error("Error creating blog:", err)
        return res.status(500).json({
            message: "internal server error",
            error: err.message
        })
    }
}

export default GrtAllBlogs