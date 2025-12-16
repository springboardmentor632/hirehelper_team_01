import mongoose from "mongoose";

const uri = "mongodb+srv://teamUser:Team1@cluster0.ku3vknl.mongodb.net/hirehelperDB?retryWrites=true&w=majority";


mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));
