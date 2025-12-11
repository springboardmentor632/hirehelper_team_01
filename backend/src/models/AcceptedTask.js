
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const acceptedTaskSchema = new mongoose.Schema(
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

    task_id: {
      type: String,          
      required: true,
      ref: "Task",
    },

    status: {
      type: String,
      enum: ["accepted", "pending", "completed"],
      default: "accepted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcceptedTask", acceptedTaskSchema);
