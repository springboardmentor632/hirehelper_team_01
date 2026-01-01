import Task from "../models/Task.js";

export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id; // ObjectId from JWT

    const tasks = await Task.find({ user_id: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch my tasks",
    });
  }
};
