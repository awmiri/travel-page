import ConnectDb from "@/config/ConnectDb"
import UserModel from "@/model/user"
import { generateToken, verifyPassword } from "@/utility/auth"
import { serialize } from "cookie"


const login = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "method not valid" })
    }
    await ConnectDb()

    try {
        const { entry, password } = req.body
        if (!entry.trim() || !password.trim()) {
            return res.status(400).json({ message: "value are not completely filled blank" })
        }
        const findUser = await UserModel.findOne({
            $or: [{ email: entry }, { phone: entry }]
        })
        if (!findUser) {
            return res.status(404).json({ message: "user not found" })
        }
        const verifyPass = await verifyPassword(password, findUser.password)

        if (!verifyPass) {
            return res.status(423).json({ message: "data not valid" })
        }

        const token = generateToken({ email: findUser.email })

        return res.setHeader("set-cookie", serialize("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 2
        })).status(200).json({ message: "user login successfully" })

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "server error", error: err.message });
    }
}

export default login