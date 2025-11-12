import { serialize } from "cookie"
const Logout = async (req, res) => {
    if (req.method !== "GET") {
        return false
    }
    return res.setHeader("set-cookie", serialize("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
    })).status(200).json({ message: "log successfully" })
}

export default Logout