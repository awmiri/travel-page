import ConnectDb from "@/config/ConnectDb"
import UserModel from "@/model/user"

const status = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try {
        await ConnectDb()

        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)

        const yesterdayStart = new Date(startDate)
        yesterdayStart.setDate(yesterdayStart.getDate() - 1)
        const yesterdayEnd = new Date(endDate)
        yesterdayEnd.setDate(yesterdayEnd.getDate() - 1)

        const totalUsers = await UserModel.countDocuments({})

        const todayUser = await UserModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        })
        const yesterDayUser = await UserModel.countDocuments({
            createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd }
        })
        let growthPercentage = 0
        if (yesterDayUser > 0) {
            growthPercentage = ((todayUser - yesterDayUser) / yesterDayUser) * 100
        } else if (todayUser > 0) {
            growthPercentage = 100
        }
        res.status(200).json({
            totalUsers,
            todayUser,
            yesterDayUser,
            growthPercentage: growthPercentage.toFixed(1),
            isPositive: growthPercentage >= 0
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'خطا در دریافت آمار' })
    }

}

export default status