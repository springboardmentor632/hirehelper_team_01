
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateProfilePictureAndBio,
  removeProfilePicture, deleteMyAccount
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";
import upload from "../config/multer.js";
 
const router = express.Router();
 
router.get("/profile", requireAuth, getUserProfile);
router.put("/update-profile", requireAuth, updateUserProfile);
router.put(
  "/update-profile-picture-bio",
  requireAuth,
  upload.single("profile_picture"),
  updateProfilePictureAndBio
);
router.delete("/remove-profile-picture", requireAuth, removeProfilePicture);
router.delete(
  "/delete-account",
  requireAuth,
  deleteMyAccount
);
export default router;