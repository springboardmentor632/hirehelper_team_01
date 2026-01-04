import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    start_time: {
      type: Date,
      required: true,
    },

    end_time: {
      type: Date,
      default: null,
    },

    status: {
      type: Number, 
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    assigned_helper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;