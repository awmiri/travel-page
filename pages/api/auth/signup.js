import ConnectDb from '@/config/ConnectDb'
import UserModel from '@/model/user'
import { hashPassword } from '@/utility/auth'


const signup = async (req, rea) => {
    if (req.method !== "POST") {
        return rea.status(500).json({ message: "method not valid" })
    }
    await ConnectDb()

    try {
        const { phone, email, password } = req.body

        if (!phone.trim() || !password.trim() || !email.trim()) {
            return rea.status(400).json({ message: "value are not completely filled blank" })
        }

        const user = await UserModel.findOne({
            $or: [{ phone }, { email }]
        })

        if (user) {
            return rea.status(409).json({ message: "user are login before whit this information" })
        }

        const hashPass = await hashPassword(password)

        const createUser = await UserModel.create({ phone, email, password: hashPass })


    } catch (err) {

    }
}

export default signup