import express from "express";
import {
  sendSignupOtp,
  verifySignupOtp,
  forgotPassword,
  resetPassword
} from "../controllers/otpController.js";

import User from "../models/User.js";

const router = express.Router();

router.post("/send-signup-otp", sendSignupOtp);
router.post("/verify-signup-otp", verifySignupOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
