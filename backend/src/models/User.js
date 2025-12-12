// const mongoose = require("mongoose");
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

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Phone number must be a 10-digit",
      },
    },
    email_id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile_picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

