// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

// Register -> create pending & send OTP
router.post("/register", authCtrl.registerUser);

// Verify OTP -> create user
router.post("/verify-otp", authCtrl.verifyOtp);

// Resend OTP for pending registration
router.post("/resend-otp", authCtrl.resendOtp);

// Login -> only for created users
router.post("/login", authCtrl.loginUser);

// Forgot password -> send reset OTP
router.post("/forgot-password", authCtrl.forgotPassword);

// Verify reset OTP -> returns resetToken
router.post("/verify-reset-otp", authCtrl.verifyResetOtp);

// Reset password -> requires resetToken
router.post("/reset-password", authCtrl.resetPassword);

module.exports = router;
