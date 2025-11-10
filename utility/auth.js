import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

const generateToken = (data) => {
    const token = sign({ ...data }, process.env.privetTokenKey, {
        algorithm: "HS256",
        expiresIn: "42h"
    })
    return token
}

export { hashPassword, generateToken } 
