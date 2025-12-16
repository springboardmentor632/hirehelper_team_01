const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const notificationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,   
      unique: true,
    },

    user_id: {
      type: String,      
      required: true,
      ref: "User",
    },

    body: {
      type: String,      
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
