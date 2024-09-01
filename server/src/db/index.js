import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log('db connected successfully')
    } catch (error) {
        console.log('error connecting db', error)
    }
}

export default connectDB;