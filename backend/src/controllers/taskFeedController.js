import Task from "../models/Task.js";

export const getTaskFeed = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // ObjectId

    const tasks = await Task.find({
      user_id: { $ne: loggedInUserId },
      status: 1, // Only fetch tasks with status = 1 (open tasks)
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      message: "Task feed fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching task feed",
    });
  }
};
