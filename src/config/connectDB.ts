import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const DB_URI = process.env.MONGO_URI;

    if (!DB_URI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }
    await mongoose.connect(DB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
