
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    img: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true
})

const BlogModel = mongoose.models?.Blog || mongoose.model("Blog", schema)

export default BlogModel