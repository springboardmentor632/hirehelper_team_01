// import mongoose from "mongoose";

const mongoose = require("mongoose");

// const uri = "mongodb+srv://teamUser:Team1@cluster0.ku3vknl.mongodb.net/hirehelperDB?retryWrites=true&w=majority";
const uri = "mongodb+srv://s4392808_db_user:Fw8zazjgP5h2glkn@cluster0.ojxznkj.mongodb.net/"


mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));
