// import mongoose from "mongoose";

const mongoose = require("mongoose");

// const uri = "mongodb+srv://teamUser:Team1@cluster0.ku3vknl.mongodb.net/hirehelperDB?retryWrites=true&w=majority";
const uri = process.env.MONGO_URI;


mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));
