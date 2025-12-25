import express from "express";
import { getTaskFeed } from "../controllers/taskFeedController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// 👤 Member-3: Task Feed
router.get("/feed", requireAuth, getTaskFeed);

export default router;
