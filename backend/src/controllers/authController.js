import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";
import { signupOTPStore } from "../utils/otpStore.js";
import { sendOtp } from "../utils/sendOtp.js";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email_id, phone_number, password } = req.body;

    const normalizedEmail = email_id.trim().toLowerCase();

    const exists = await User.findOne({ email_id: normalizedEmail });
    if (exists) {
      if (!exists.isVerified) {
        const otp = generateOTP();
        signupOTPStore[normalizedEmail] = {
          otp,
          expiresAt: Date.now() + 5 * 60 * 1000
        };

        await sendOtp(normalizedEmail, otp, "Account Verification");

        return res.json({
          message: "User already exists but not verified. OTP resent."
        });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      first_name,
      last_name,
      email_id: normalizedEmail,
      phone_number,
      password: hashedPassword,
      isVerified: false
    });

    const otp = generateOTP();

    signupOTPStore[normalizedEmail] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    };

    await sendOtp(normalizedEmail, otp, "Account Verification");

    return res.json({
      message: "OTP sent for verification"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email_id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture,
        isVerified: user.isVerified
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
