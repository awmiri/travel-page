import ConnectDb from "@/config/ConnectDb"
import BlogModel from "@/model/blog"
import UserModel from "@/model/user"
import { validationToken } from "@/utility/auth"
import mongoose from "mongoose"

const blog = async (req, res) => {
    if (req.method !== "POST") {
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


        const { title, content, description, author, img, url } = req.body
        if (!title?.trim() || !content?.trim() || !description?.trim() || !url?.trim()) {
            return res.status(400).json({ message: "please complite the data" })
        }

        const SearchBlog = await BlogModel.findOne({
            $or: [{ title }, { url }]
        })
        if (SearchBlog) {
            return res.status(409).json({ message: "this blog has already exist" })
        }


        const createBlog = await BlogModel.create({ title, content, description, author: findUser._id, img: img || null, url })
        return res.status(201).json({ data: createBlog })
    } catch (err) {
        console.error("Error creating blog:", err)
        return res.status(500).json({
            message: "internal server error",
            error: err.message
        })
    }
}

export default blog