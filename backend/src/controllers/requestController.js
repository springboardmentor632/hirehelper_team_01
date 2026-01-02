import mongoose from "mongoose";
import Task from "../models/Task.js";
import Request from "../models/Request.js";
 
/**
 * MEMBER-1
 * Create a task request
 */
export const createRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskId } = req.body;
 
    // validate taskId
    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Valid MongoDB taskId is required"
      });
    }
 
    // find task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
 
    // prevent self request
    if (task.user_id.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own task"
      });
    }
 
    // prevent duplicate pending request
    const existingRequest = await Request.findOne({
      task_id: taskId,
      requester_id: userId,
      status: 0
    });
 
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent and is pending"
      });
    }
 
    // create request
    const request = await Request.create({
      task_id: taskId,
      requester_id: userId,
      task_owner_id: task.user_id,
      status: 0
    });
 
    return res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: {
        requestId: request._id,
        status: request.status
      }
    });
  } catch (error) {
    console.error("Create request error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * MEMBER-2
 * Get requests received for task owner's tasks
 */
export const getReceivedRequests = async (req, res) => {
  console.log("getReceivedRequests controller hit");

  try {
    const loggedInUserId = req.user._id;

    const receivedRequests = await Request.find({
      task_owner_id: loggedInUserId
    })
      .populate("requester_id", "name email")
      .populate("task_id", "title description location reward")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: receivedRequests.length,
      data: receivedRequests
    });
  } catch (error) {
    console.error("Get received requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch received requests",
      error: error.message
    });
  }
};

export const getMyRequests = async (req, res) => {
  console.log("getMyRequests controller hit");
 
  try {
    const loggedInUserId = req.user._id;
   
    const myRequests = await Request.find({ requester_id: loggedInUserId })
      .populate("task_id", "title description reward location") // Get task details
      .populate("task_owner_id", "name email") // Get task owner's details
      .sort({ createdAt: -1 }); // Newest first
   
    return res.status(200).json({
      success: true,
      count: myRequests.length,
      data: myRequests
    });
   
  } catch (error) {
    console.error("Get my requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your requests",
      error: error.message
    });
  }
};
 
/**
 * MEMBER-4
 * Accept / Reject request & link helper to task
 */
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
 
    // validate status
    if (![1, 2].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
 
    // find request
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }
 
    // only task owner can update
    if (request.task_owner_id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }
 
    // prevent re-processing
    if (request.status !== 0) {
      return res.status(400).json({
        success: false,
        message: "Request already processed"
      });
    }
 
    // if accepted → link helper to task
    if (status === 1) {
      const task = await Task.findById(request.task_id);
 
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found"
        });
      }
 
      // optional safety check
      if (task.assigned_helper) {
        return res.status(400).json({
          success: false,
          message: "Task already has a helper"
        });
      }
 
      task.assigned_helper = request.requester_id;
      await task.save();
    }
 
    // update request status
    request.status = status;
    await request.save();
 
    return res.json({
      success: true,
      message: status === 1 ? "Request accepted" : "Request rejected"
    });
  } catch (error) {
    console.error("Update request status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};