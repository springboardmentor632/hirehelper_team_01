import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  registerTask,
  getTaskById,
  updateTaskDetails,
  updateTaskImage,
  deleteTask
} from "../controllers/taskController.js";

import { getTaskFeed } from "../controllers/taskFeedController.js";
import { requireAuth } from "../middleware/auth.js";
import { getMyTasks } from "../controllers/myTaskController.js";

const router = express.Router();

/* ---------- MULTER CONFIG ---------- */
const uploadsDir = path.join(process.cwd(), "uploads", "tasks");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    cb(null, `task_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image uploads are allowed"));
    }
  }
});

/* ---------- ROUTES ---------- */

// create task
router.post("/register", requireAuth, upload.single("picture"), registerTask);

// get my tasks
router.get("/my", requireAuth, getMyTasks);

//FEED ROUTE (MUST BE BEFORE :taskId)
router.get("/feed", requireAuth, getTaskFeed);

// get single task (edit page)
router.get("/:taskId", requireAuth, getTaskById);

// update task details
router.put("/:taskId", requireAuth, updateTaskDetails);

// update task image
router.put(
  "/:taskId/image",
  requireAuth,
  upload.single("picture"),
  updateTaskImage
);

// delete task
router.delete("/:taskId", requireAuth, deleteTask);

export default router;
