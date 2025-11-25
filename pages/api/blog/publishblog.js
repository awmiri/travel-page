import ConnectDb from "@/config/ConnectDb"
import BlogModel from "@/model/blog"
import UserModel from "@/model/user"
import { validationToken } from "@/utility/auth"

const publishBlog = async (req, res) => {
    if (req.method !== "PATCH") {
        return res.status(423).json({ message: "method not valid" })
    }

    try {
        await ConnectDb()

        const { ["token"]: token } = req.cookies

        const validate = validationToken(token)

        if (!token || !validate) {
            return res.status(401).json({ message: "token or cookie mot valid" })
        }
        const { author, blogId } = req.body
        if (!author || !blogId) {
            return res.status(400).json({ message: "Author ID and Blog ID are required" });
        }

        const getAdmin = await UserModel.find({ email: validate.email })
        if (!getAdmin) {
            return res.status(404).json({ message: "user not found" })
        }

        if (getAdmin._id !== author) {
            return res.status(405).json({ message: "your not the writer of this blog" })
        }
        const upDateBlog = await BlogModel.findOneAndUpdate({ _id: blogId }, { publish: true }, { new: true })
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or you don't have permission to publish it"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog published successfully",
            blog,
        });
    } catch (error) {
        console.error("Error in publishBlog API:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }

}

export default publishBlog