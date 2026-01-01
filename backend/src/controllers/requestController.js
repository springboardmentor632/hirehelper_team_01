import mongoose from "mongoose";
import Task from "../models/Task.js";
import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskId } = req.body;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Valid MongoDB taskId is required"
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    // Prevent self-request
    if (task.user_id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own task"
      });
    }

    // Prevent duplicate request
    const existingRequest = await Request.findOne({
      task_id: taskId,
      requester_id: userId
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent"
      });
    }

    const request = await Request.create({
      task_id: taskId,
      requester_id: userId,
      task_owner_id: task.user_id
    });

    return res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: request
    });

  } catch (error) {
    console.error("Create request error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
