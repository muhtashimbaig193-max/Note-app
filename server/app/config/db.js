import mongoose from "mongoose";

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if(connection){
            console.log("Database connected successfully ", connection.connection.db.databaseName)
        }
    } catch(err){
        console.log("[Database connection failed] ", err.message);
    }
}

export default connectDB;