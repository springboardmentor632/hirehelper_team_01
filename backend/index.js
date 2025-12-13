import express from "express";
import "./src/config/db.js";  // MongoDB connection file

import authRoutes from "./src/routes/authRoutes.js";



const app = express();
app.use(express.json());

//Use the authentication routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
