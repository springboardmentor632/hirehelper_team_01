import express from "express";
import "./src/config/db.js";  // MongoDB connection file
// import otpRoutes from "./src/routes/otpRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js"
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(express.json());

//Use the authentication routes
app.use("/api/auth", authRoutes);

// otp verify route
app.use("/api/auth",otpRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
