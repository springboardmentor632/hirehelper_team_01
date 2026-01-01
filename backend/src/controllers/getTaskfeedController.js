import Task from "../models/Task.js";
 
export const getTaskFeed = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
 
    console.log("Fetching feed for user:", loggedInUserId);
 
    const filter = {
      user_id: { $ne: loggedInUserId },
      status: 1
    };
 
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .populate({ path: 'user_id', select: 'first_name last_name profile_picture' });
 
    console.log(`Found ${tasks.length} tasks in feed`);
 
    res.status(200).json({
      success: true,
      count: tasks.length,
      message: "Task feed fetched successfully",
      data: tasks
    });
 
  } catch (error) {
    console.error("Error fetching task feed:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching task feed",
      error: error.message
    });
  }
};