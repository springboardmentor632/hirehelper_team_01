import path from "path";
import fs from "fs";
import Task from "../models/Task.js";
import Request from "../models/Request.js";
import cloudinary from "../config/cloudinary.js";

/* ===============================
   REGISTER TASK
================================ */
export const registerTask = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      start_time,
      end_time,
      status,
      category
    } = req.body;

    const statusNum = Number(status);
    const authUserId = req.user?._id;

    if (
      !authUserId ||
      !title ||
      !description ||
      !location ||
      !start_time ||
      Number.isNaN(statusNum)
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let pictureUrl = "";

    if (req.file) {
      const localPath = path.join(req.file.destination, req.file.filename);
      const uploadRes = await cloudinary.uploader.upload(localPath, {
        folder: "hirehelper/tasks",
        resource_type: "image"
      });
      pictureUrl = uploadRes.secure_url;
      try { fs.unlinkSync(localPath); } catch {}
    }

    const task = await Task.create({
      user_id: authUserId,
      title,
      description,
      location,
      start_time: new Date(start_time),
      end_time: end_time ? new Date(end_time) : null,
      status: statusNum,
      category: category || "",
      picture: pictureUrl
    });

    res.status(201).json({
      success: true,
      message: "Task registered successfully",
      task
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET TASK BY ID
================================ */
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   UPDATE TASK DETAILS
================================ */
export const updateTaskDetails = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (location) task.location = location;

    await task.save();

    res.json({
      success: true,
      message: "Task details updated successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   UPDATE TASK IMAGE
================================ */
export const updateTaskImage = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const localPath = path.join(req.file.destination, req.file.filename);
    const uploadRes = await cloudinary.uploader.upload(localPath, {
      folder: "hirehelper/tasks",
      resource_type: "image"
    });

    task.picture = uploadRes.secure_url;
    await task.save();
    try { fs.unlinkSync(localPath); } catch {}

    res.json({
      success: true,
      message: "Task image updated successfully",
      picture: task.picture
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   DELETE TASK
================================ */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Request.deleteMany({ task_id: task._id });
    await Task.findByIdAndDelete(task._id);

    res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
