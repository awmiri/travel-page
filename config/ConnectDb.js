import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        }
        await mongoose.connect("mongodb://127.0.0.1:27017/travel-page")
        console.log("connect to db");

    } catch (err) {
        console.log("can not connect to db");

    }
}

export default ConnectDb