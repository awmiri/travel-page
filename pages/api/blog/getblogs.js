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