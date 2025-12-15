import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB || "hirehelperDB";

if (!uri) {
  console.error("MONGO_URI is not set in environment");
} else {
  mongoose
    .connect(uri, { dbName })
    .then(() => console.log(`MongoDB Connected Successfully (db: ${dbName})`))
    .catch(err => console.log("MongoDB Error:", err));
}
