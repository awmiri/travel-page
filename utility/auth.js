import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

const verifyPassword = async (password, hashPassword) => {
    const isVerify = await compare(password, hashPassword)
    return isVerify
}

const generateToken = (data) => {
    const token = sign({ ...data }, process.env.privetTokenKey, {
        algorithm: "HS256",
        expiresIn: "42h"
    })
    return token
}
const validationToken = (token) => {
    try {
        const isValidation = verify(token, process.env.privetTokenKey)
        return isValidation
    } catch (err) {
        console.log(err);
        return false
    }
}
export { hashPassword, generateToken, verifyPassword, validationToken } 
