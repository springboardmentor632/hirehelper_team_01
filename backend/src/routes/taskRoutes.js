import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { registerTask } from "../controllers/taskController.js";
import { requireAuth } from "../middleware/auth.js";
import { getMyTasks } from "../controllers/myTaskController.js";

const router = express.Router();

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
    if (file.mimetype && file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image uploads are allowed"));
  }
});

router.post("/register", requireAuth, upload.single("picture"), registerTask);

router.get(
  "/my",
  requireAuth,
  getMyTasks
);


export default router;
