const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const requestSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,     
      unique: true,
    },

    task_id: {
      type: String,         
      required: true,
      ref: "Task",
    },

    requester_id: {
      type: String,         
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
