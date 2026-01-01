import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./src/config/db.js";  // MongoDB connection file
import otpRoutes from "./src/routes/otpRoutes.js"
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import taskFeedRoutes from "./src/routes/taskFeedRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Use the authentication routes
app.use("/api/auth", authRoutes);

// otp verify route
app.use("/api/auth",otpRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/tasks", taskFeedRoutes);  // feed route

app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
