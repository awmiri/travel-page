import mongoose from "mongoose";

const schema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    }
}, {
    timestamps: true
})