import ConnectDb from '@/config/ConnectDb';
import UserModel from '@/model/user';
import { validationToken } from '@/utility/auth';
import multer from 'multer';
import path from 'path';


const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads/profiles', // پوشه‌ای که عکس‌ها ذخیره بشن
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // حداکثر ۵ مگابایت
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif/.test(file.mimetype);
        allowed ? cb(null, true) : cb(new Error('فرمت فایل مجاز نیست'));
    }
});


export const config = {
    api: {
        bodyParser: false,
    },
};
const GeneralEditInfo = async (req, res) => {
    try {
        const { id } = req.query
        await ConnectDb()
        const { ["token"]: token } = req.cookies
        if (!token) {
            return res.status(423).json({ message: "token not exist" })
        }

        const payload = validationToken(token);
        if (!payload) {
            return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده' });
        }
        const currentUser = await UserModel.findOne({ email: payload.email })

        if (!currentUser) {
            return res.status(402).json({ message: "invalidation request access " })
        }
        if (currentUser._id.toString() !== id) {
            return res.status(403).json({
                message: "شما فقط می‌توانید پروفایل خودتان را ویرایش کنید"
            });
        }
        if (req.method === "PATCH") {
            try {
                upload.single('profile')(req, res, async (err) => {
                    if (err) {
                        return res.status(403).json({ message: err.message || 'خطا در آپلود فایل' });
                    }

                    const updates = {
                        name: req.body.name || undefined,
                        lastName: req.body.lastName || undefined,
                        email: req.body.email || undefined,
                        address: req.body.address || undefined,
                        identifyId: req.body.identifyId || undefined,
                    };

                    // اگر فایل آپلود شده باشه
                    if (req.file) {
                        updates.profile = `/uploads/profiles/${req.file.filename}`;
                    }

                    // حذف فیلدهای undefined
                    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

                    const updatedUser = await UserModel.findByIdAndUpdate(
                        id,
                        { $set: updates },
                        { new: true }
                    ).select('-password');

                    if (!updatedUser) {
                        return res.status(404).json({ message: 'کاربر یافت نشد' });
                    }

                    return res.status(200).json({
                        message: 'پروفایل با موفقیت آپدیت شد',
                        user: updatedUser
                    });

                });

            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'خطای سرور' });
            }
        }
    } catch (err) {
        console.error('خطا در API admin/user/[id]:', err);
        return res.status(500).json({ success: false, message: 'خطای سرور' });
    }

}

export default GeneralEditInfo