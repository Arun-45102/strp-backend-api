import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
}

export default {
  connectDB,
};
