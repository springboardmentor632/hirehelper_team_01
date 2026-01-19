import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "./src/config/db.js"; // MongoDB connection

import otpRoutes from "./src/routes/otpRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import taskFeedRoutes from "./src/routes/taskFeedRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", otpRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", taskFeedRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
