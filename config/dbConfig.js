import mongoose from "mongoose";
import dotenv from "dotenv";



dotenv.config();


const dbConfig = async () => {
     await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log(err);
    })
}

export default dbConfig;