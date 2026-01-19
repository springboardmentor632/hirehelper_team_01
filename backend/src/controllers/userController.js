import User from "../models/User.js";
import Task from "../models/Task.js";
import Request from "../models/Request.js";
import Notification from "../models/Notification.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/user/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    //Get MongoDB _id from auth middleware
    const mongoUserId = req.user._id;

    //Find user using MongoDB _id
    const user = await User.findById(mongoUserId).select(
      "-password -otp -__v"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};

/**
 * @desc    Update logged-in user's profile
 * @route   PUT /api/user/update-profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { first_name, last_name, email_id, phone_number } = req.body;

    if (!first_name && !last_name && !email_id && !phone_number) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    //Check email uniqueness (exclude current user by _id)
    if (email_id) {
      const existingUser = await User.findOne({
        email_id,
        _id: { $ne: req.user._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    //Update profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...(first_name && { first_name }),
          ...(last_name && { last_name }),
          ...(email_id && { email_id }),
          ...(phone_number && { phone_number }),
        },
      },
      { new: true }
    ).select("-password -otp -__v");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

/**
 * @desc    Update user's profile picture and bio
 * @route   PUT /api/user/update-profile-picture-bio
 * @access  Private
 */
export const updateProfilePictureAndBio = async (req, res) => {
  try {
    const mongoUserId = req.user._id;
    const { bio } = req.body;

    // Find current user to get old profile picture path
    const currentUser = await User.findById(mongoUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = {};

    // Handle profile picture upload
    if (req.file) {
      // Delete old profile picture if it exists and is a local file
      if (
        currentUser.profile_picture &&
        currentUser.profile_picture.startsWith("uploads/profile/")
      ) {
        const oldFilePath = path.join(__dirname, "../../", currentUser.profile_picture);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Save the relative path to the uploaded file
      updateData.profile_picture = `uploads/profile/${req.file.filename}`;
    }

    // Handle bio update
    if (bio !== undefined) {
      updateData.bio = bio;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    // Update user with new profile picture and/or bio
    const updatedUser = await User.findByIdAndUpdate(
      mongoUserId,
      { $set: updateData },
      { new: true }
    ).select("-password -otp -__v");

    res.status(200).json({
      success: true,
      message: "Profile picture and bio updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile picture and bio:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile picture and bio",
      error: error.message,
    });
  }
};

/**
 * @desc    Remove user's profile picture
 * @route   DELETE /api/user/remove-profile-picture
 * @access  Private
 */
export const removeProfilePicture = async (req, res) => {
  try {
    const mongoUserId = req.user._id;

    // Find current user
    const currentUser = await User.findById(mongoUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete profile picture if it exists and is a local file
    if (
      currentUser.profile_picture &&
      currentUser.profile_picture.startsWith("uploads/profile/")
    ) {
      const filePath = path.join(__dirname, "../../", currentUser.profile_picture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove profile picture from database
    const updatedUser = await User.findByIdAndUpdate(
      mongoUserId,
      { $set: { profile_picture: "" } },
      { new: true }
    ).select("-password -otp -__v");

    res.status(200).json({
      success: true,
      message: "Profile picture removed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error removing profile picture:", error);
    res.status(500).json({
      success: false,
      message: "Error removing profile picture",
      error: error.message,
    });
  }
};
/**
 * @desc    Delete logged-in user's account and all related data
 * @route   DELETE /api/user/delete-account
 * @access  Private
 */
export const deleteMyAccount = async (req, res) => {
  try {
    const mongoUserId = req.user._id;

    if (!mongoUserId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user identity",
      });
    }

    const user = await User.findById(mongoUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete profile picture file if it exists
    try {
      if (
        user.profile_picture &&
        user.profile_picture.startsWith("uploads/profile/")
      ) {
        const filePath = path.join(__dirname, "../../", user.profile_picture);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (err) {
      console.warn("File cleanup skipped:", err.message);
    }

    // Delete all tasks created by this user
    const userTasks = await Task.find({ user_id: mongoUserId });
    const taskIds = userTasks.map(t => t._id);
    
    if (taskIds.length > 0) {
      // Delete all requests related to these tasks
      await Request.deleteMany({ task_id: { $in: taskIds } });
      
      // Delete task pictures from uploads
      for (const task of userTasks) {
        try {
          if (task.picture && task.picture.startsWith("uploads/tasks/")) {
            const filePath = path.join(__dirname, "../../", task.picture);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        } catch (err) {
          console.warn("Task file cleanup skipped:", err.message);
        }
      }
      
      // Delete the tasks
      await Task.deleteMany({ user_id: mongoUserId });
    }

    // Delete all requests where user is the requester
    await Request.deleteMany({ requester_id: mongoUserId });

    // Delete all notifications for this user
    await Notification.deleteMany({ user_id: mongoUserId.toString() });

    // Delete the user account
    await User.findByIdAndDelete(mongoUserId);

    return res.status(200).json({
      success: true,
      message: "Account and all associated data deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};
