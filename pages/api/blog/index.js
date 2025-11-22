// pages/api/blog.js
import ConnectDb from "@/config/ConnectDb";
import BlogModel from "@/model/blog";
import UserModel from "@/model/user";
import { validationToken } from "@/utility/auth";
import multer from "multer";
import path from "path";
import fs from "fs";

// تنظیمات multer
const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/blogs", // پوشه ذخیره عکس
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("فقط تصاویر مجاز هستند!"));
        }
    },
});

// این برای غیرفعال کردن bodyParser پیش‌فرض next.js هست
export const config = {
    api: {
        bodyParser: false, // خیلی مهم!
    },
};

// middleware برای اجرای multer
const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await ConnectDb();

        // اجرای multer
        await runMiddleware(req, res, upload.single("img"));

        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: "لطفا وارد شوید" });

        const userPayload = validationToken(token);
        if (!userPayload) return res.status(401).json({ message: "توکن نامعتبر" });

        const user = await UserModel.findOne({ email: userPayload.email });

        if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
        if (user.role !== "admin") return res.status(403).json({ message: "دسترسی ممنوع" });

        const { title, content, description } = req.body;

        if (!title?.trim() || !content?.trim() || !description?.trim()) {
            return res.status(400).json({ message: "همه فیلدها الزامی هستند" });
        }

        const existingBlog = await BlogModel.findOne({ title });
        if (existingBlog) {
            return res.status(409).json({ message: "عنوان بلاگ تکراری است" });
        }

        // مسیر عکس آپلود شده
        const imgPath = req.file ? `/uploads/blogs/${req.file.filename}` : null;

        const newBlog = await BlogModel.create({
            title,
            content,
            description,
            author: user._id,
            img: imgPath,
        });

        return res.status(201).json({ message: "بلاگ با موفقیت ایجاد شد", data: newBlog });

    } catch (err) {
        console.error("خطا در ایجاد بلاگ:", err);
        return res.status(500).json({ message: "خطای سرور", error: err.message });
    }
};

export default handler;