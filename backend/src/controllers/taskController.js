import path from "path";
import fs from "fs";
import Task from "../models/Task.js";
import cloudinary from "../config/cloudinary.js";

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
    if (!authUserId || !title || !description || !location || !start_time || Number.isNaN(statusNum)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const file = req.file || null;
    let pictureUrl = "";
    if (file) {
      try {
        const localPath = path.join(file.destination, file.filename);
        console.log('Uploading file:', localPath);
        const resUpload = await cloudinary.uploader.upload(localPath, {
          folder: "hirehelper/tasks",
          resource_type: "image"
        });
        pictureUrl = resUpload.secure_url || resUpload.url || "";
        console.log('Cloudinary upload success:', pictureUrl);
        try {
          fs.unlinkSync(localPath);
        } catch {}
      } catch (imgErr) {
        console.warn('Image upload failed (will continue without image):', imgErr.message);
        pictureUrl = "";
      }
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
      message: "Task registered successfully",
      task
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
