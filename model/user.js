import mongoose from "mongoose";

const schema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11,
        match: /^09\d{9}$/,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.models.User || mongoose.model("User", schema)

export default UserModel