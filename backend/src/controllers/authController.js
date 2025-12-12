// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const OTP_TTL_MS = parseInt(process.env.OTP_TTL_MS || "300000", 10); // 5 min default
const RESET_OTP_TTL_MS = parseInt(process.env.RESET_OTP_TTL_MS || "300000", 10);

// In-memory pending registration store
// Structure: pendingStore[email] = { first_name, last_name, email, phone, passwordHash, otp, expiresAt }
const pendingStore = {};

// In-memory reset OTP store for forgot-password flow
// Structure: resetStore[email] = { otp, expiresAt, resetAllowedToken(optional) }
const resetStore = {};

// Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
  POST /api/auth/register
  -> Create pending registration, send OTP email
 */
exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Block if already an active user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered. Please login." });
    }

    const now = Date.now();

    // If pending exists and not expired -> resend OTP path
    if (pendingStore[email] && pendingStore[email].expiresAt > now) {
      // regenerate OTP and resend
      const otp = Math.floor(100000 + Math.random() * 900000);
      pendingStore[email].otp = otp;
      pendingStore[email].expiresAt = now + OTP_TTL_MS;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code (Resent) - Complete Registration",
        text: `Hello ${pendingStore[email].first_name},\n\nYour OTP is: ${otp}\nIt expires in ${Math.floor(OTP_TTL_MS / 60000)} minutes.\n\nIf you didn't request this, ignore.\n`
      });

      return res.status(200).json({ message: "OTP resent to email. Verify to complete registration." });
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate OTP and store pending registration
    const otp = Math.floor(100000 + Math.random() * 900000);
    pendingStore[email] = {
      first_name,
      last_name,
      email,
      phone,
      passwordHash,
      otp,
      expiresAt: now + OTP_TTL_MS
    };

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code - Complete Registration",
      text: `Hello ${first_name},\n\nYour OTP code is: ${otp}\nThis code expires in ${Math.floor(OTP_TTL_MS / 60000)} minutes.\n\nIf you didn't request this, ignore.\n`
    });

    return res.status(201).json({ message: "OTP sent to email. Verify to complete registration." });
  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

/*
  POST /api/auth/verify-otp
  Body: { email, otp }
  -> Verifies pending OTP, creates user, issues JWT
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const record = pendingStore[email];
    if (!record) return res.status(400).json({ message: "No pending registration found. Please register first." });

    if (Date.now() > record.expiresAt) {
      delete pendingStore[email];
      return res.status(400).json({ message: "OTP expired. Please register again." });
    }

    if (String(record.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Double-check no user was created in the meantime
    const existing = await User.findOne({ email });
    if (existing) {
      delete pendingStore[email];
      return res.status(400).json({ message: "Email already registered. Please login." });
    }

    // Create user
    const newUser = await User.create({
      first_name: record.first_name,
      last_name: record.last_name,
      email: record.email,
      phone: record.phone,
      password: record.passwordHash,
      isVerified: true
    });

    delete pendingStore[email];

    // Issue JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Registration complete. Account created.",
      token,
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

/*
 POST /api/auth/resend-otp
 Body: { email }
 */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const record = pendingStore[email];
    if (!record) return res.status(400).json({ message: "No pending registration found. Please register." });

    const otp = Math.floor(100000 + Math.random() * 900000);
    record.otp = otp;
    record.expiresAt = Date.now() + OTP_TTL_MS;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code (Resent) - Complete Registration",
      text: `Hello ${record.first_name},\n\nYour new OTP code is: ${otp}\nIt expires in ${Math.floor(OTP_TTL_MS / 60000)} minutes.\n\nIf you didn't request this, ignore.\n`
    });

    return res.json({ message: "OTP resent to email." });
  } catch (err) {
    console.error("resendOtp error:", err);
    return res.status(500).json({ message: "Resend OTP failed", error: err.message });
  }
};

/*
  POST /api/auth/login
  Body: { email, password }
 */
exports.loginUser = async (req, res) => {
    
};

/*
  POST /api/auth/forgot-password
  Body: { email }
  -> Send OTP to reset password (keeps entry in resetStore)
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    resetStore[email] = {
      otp,
      expiresAt: Date.now() + RESET_OTP_TTL_MS
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP",
      text: `Hello ${user.first_name},\n\nYour password reset OTP is: ${otp}\nIt expires in ${Math.floor(RESET_OTP_TTL_MS / 60000)} minutes.\n\nIf you didn't request this, ignore.\n`
    });

    return res.json({ message: "Password reset OTP sent to email." });
  } catch (err) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ message: "Forgot password failed", error: err.message });
  }
};

/*
  POST /api/auth/verify-reset-otp
  Body: { email, otp }
  -> Verifies reset OTP and returns a short-lived reset token (not JWT secret)
 */
exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const record = resetStore[email];
    if (!record) return res.status(400).json({ message: "No reset request found. Please initiate forgot-password." });

    if (Date.now() > record.expiresAt) {
      delete resetStore[email];
      return res.status(400).json({ message: "Reset OTP expired. Request again." });
    }

    if (String(record.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Create a temporary reset token (signed JWT with short expiry) to allow password reset
    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "15m" } // 15 minutes to reset password
    );

    // store resetToken optionally to validate later or just send back
    record.resetToken = resetToken;

    return res.json({ message: "Reset OTP verified. Use resetToken to set new password.", resetToken });
  } catch (err) {
    console.error("verifyResetOtp error:", err);
    return res.status(500).json({ message: "Verify reset OTP failed", error: err.message });
  }
};

/*
  POST /api/auth/reset-password
  Body: { email, newPassword, resetToken }
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;
    if (!email || !newPassword || !resetToken) return res.status(400).json({ message: "Email, newPassword and resetToken required" });

    const record = resetStore[email];
    if (!record) return res.status(400).json({ message: "No reset request found. Please initiate forgot-password." });

    if (String(record.resetToken) !== String(resetToken)) {
      return res.status(400).json({ message: "Invalid or mismatched resetToken" });
    }

    // verify resetToken
    try {
      jwt.verify(resetToken, process.env.JWT_SECRET || "your_jwt_secret");
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired resetToken" });
    }

    // All good -> update password
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newHash = await bcrypt.hash(newPassword, 10);
    user.password = newHash;
    await user.save();

    // cleanup resetStore
    delete resetStore[email];

    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: "Reset password failed", error: err.message });
  }
};
