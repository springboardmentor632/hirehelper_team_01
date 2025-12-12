const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const userSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       default: uuidv4,
//       unique: true,
//     },
//     first_name: {
//       type: String,
//       required: true,
//     },
//     last_name: {
//       type: String,
//       required: true,
//     },
//     phone_number: {
//       type: String,
//       required: true,
//     },
//     email_id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profile_picture: {
//       type: String,
//       default: "",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true }, 
  isVerified: { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);


