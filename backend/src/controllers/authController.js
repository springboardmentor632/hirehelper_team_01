const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// let otpStore = {};  Stores OTP for each email temporarily

const OTP_TTL_MS = parseInt("300000", 10); 

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
    });
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp; // Temporarily store OTP

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return res.json({
      message: "User registered successfully. OTP sent to email.",
      userId: user._id,
    });

  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err });
  }
};


exports.verifyOtp = async (req, res) => {
  try {

  } catch (err) {
    return res.status(500).json({ message: "OTP verification failed", error: err });
  }
};


exports.loginUser = async (req, res) => {
  try {
   
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};
