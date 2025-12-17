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
    .then(async () => {
      console.log(`MongoDB Connected Successfully (db: ${dbName})`);
      try {
        const collection = mongoose.connection.db.collection("users");
        const indexes = await collection.indexes();
        const hasLegacyEmail = indexes.some(i => i.name === "email_1");
        if (hasLegacyEmail) {
          try {
            await collection.dropIndex("email_1");
            console.log("Dropped legacy unique index on email");
          } catch (e) {
            console.log("Failed to drop legacy index email_1:", e.message);
          }
        }
        try {
          await collection.createIndex({ email_id: 1 }, { unique: true });
          console.log("Ensured unique index on email_id");
        } catch (e) {
          console.log("Ensuring unique index on email_id failed:", e.message);
        }
      } catch (e) {
        console.log("Index maintenance error:", e.message);
      }
    })
    .catch(err => console.log("MongoDB Error:", err));
}