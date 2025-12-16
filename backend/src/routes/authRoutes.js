const express = require("express");
const router = express.Router();

const {
  register,
  sendSignupOtp,
  verifySignupOtp,
  login
} = require("../controllers/authController");

router.post("/register", register);
router.post("/send-signup-otp", sendSignupOtp);
router.post("/verify-signup-otp", verifySignupOtp);
router.post("/login", login);

module.exports = router;
