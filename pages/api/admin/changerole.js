import ConnectDb from "@/config/ConnectDb"
import UserModel from "@/model/user"
import { validationToken } from "@/utility/auth"

const changerole = async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "method not valid" })
    }

    await ConnectDb()
    try {
        const { ["token"]: token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "token not valid" })
        }

        const isValidToken = validationToken(token)
        if (!isValidToken) {
            return res.status(402).json({ message: "token not valid" })
        }
        const findUser = await UserModel.findOne({ email: isValidToken.email })
        if (!findUser) {
            return res.status(404).json({ message: "user not found" })
        }
        if (findUser.role !== "admin") {
            return res.status(400).json({ message: "you are not admin" })
        }
        const { userId, role } = req.body;
        if (!userId.trim() || !role.trim()) {
            return res.status(423).json({ message: "data not valid" })
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, { role }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" })
        }
        return res.status(200).json({ message: "role updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
    }
}

export default changerole