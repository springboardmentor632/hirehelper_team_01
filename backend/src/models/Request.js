import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },

    requester_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    task_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: Number,
      default: 0 // 0=pending, 1=accepted, 2=rejected
    }
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
