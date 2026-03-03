import mongoose from "mongoose";

let cached = (global as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;

if (!cached) {
  cached = (global as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached!.conn) return cached!.conn;

  const URI = process.env.MONGODB_URI;
  if (!URI) throw new Error("MONGODB_URI is not defined");

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(URI).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
