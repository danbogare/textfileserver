import mongoose from "mongoose";
const { MONGO_URI } = process.env;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;