const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
