import ConnectDb from '@/config/ConnectDb'
import UserModel from '@/model/user'
import { generateToken, hashPassword } from '@/utility/auth'
import { serialize } from 'cookie'


const signup = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "method not valid" })
    }
    await ConnectDb()

    try {
        const { phone, email, password, name, lastName, blog, address, identifyId } = req.body

        if (!phone.trim() || !password.trim() || !email.trim()) {
            return res.status(400).json({ message: "value are not completely filled blank" })
        }

        const user = await UserModel.findOne({
            $or: [{ phone }, { email }]
        })

        if (user) {
            return res.status(409).json({ message: "user are login before whit this information" })
        }

        const hashPass = await hashPassword(password)

        const allUser = await UserModel.find({})

        const createUser = await UserModel.create({ phone, email, password: hashPass, role: allUser.length > 0 ? "user" : "admin", name, lastName, blog, identifyId, address })
        const token = generateToken({ email })

        return res.setHeader("set-cookie", serialize("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 2
        })).status(201).json({ message: "sign up successfully done" })


    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "server error", error: err.message });

    }
}

export default signup