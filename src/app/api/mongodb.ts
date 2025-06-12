import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const URI = process.env.MONGODB_URI as string;
    if (!URI) throw new Error("Mongodb URI is not defined");

    try {
      await mongoose.connect(URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection error: ", error);
      throw error;
    }
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to set up database connection");
  }
}
