const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/auth", require("./src/routes/authRoutes"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
