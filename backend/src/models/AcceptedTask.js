const mongoose = require("mongoose");

const acceptedTaskSchema = new mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcceptedTask", acceptedTaskSchema);
