// pages/api/blog.js
import ConnectDb from "@/config/ConnectDb";
import BlogModel from "@/model/blog";
import UserModel from "@/model/user";
import { validationToken } from "@/utility/auth";
import multer from "multer";
import path from "path";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/blogs",
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
            cb(null, "img-" + uniqueSuffix + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        cb(new Error("فقط فایل تصویری مجاز است"));
    },
});

export const config = { api: { bodyParser: false } };

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) return reject(result);
            resolve(result);
        });
    });
};

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    try {
        await ConnectDb();

        // چون عکس اجباریه → upload.single کاملاً کافیه و بدون خطاست
        await runMiddleware(req, res, upload.single("img"));

        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: "لطفا وارد شوید" });

        const userPayload = validationToken(token);
        if (!userPayload) return res.status(401).json({ message: "توکن نامعتبر" });

        const user = await UserModel.findOne({ email: userPayload.email });
        if (!user || user.role !== "admin") return res.status(403).json({ message: "دسترسی ممنوع" });

        const { title, content, description } = req.body;

        if (!title?.trim() || !content?.trim() || !description?.trim()) {
            return res.status(400).json({ message: "عنوان، محتوا و توضیحات الزامی هستند" });
        }

        const existing = await BlogModel.findOne({ title });
        if (existing) return res.status(409).json({ message: "عنوان تکراری است" });

        // req.file حتماً وجود داره چون عکس اجباریه
        const imgPath = `/uploads/blogs/${req.file.filename}`;

        const newBlog = await BlogModel.create({
            title: title.trim(),
            content: content.trim(),
            description: description.trim(),
            author: user._id,
            publish: false,
            img: imgPath,
        });

        return res.status(201).json({
            message: "بلاگ با موفقیت ایجاد شد (پیش‌نویس)",
            data: newBlog
        });

    } catch (err) {
        console.error("خطا در ایجاد بلاگ:", err);
        return res.status(500).json({
            message: "خطای سرور",
            error: err.message
        });
    }
}