// import express from "express";
// import "./src/config/db.js";
require("dotenv").config()
require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const express = require("express");
 

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
