import User from "../models/User.js";
import bcrypt from "bcrypt";
import {generateOTP} from "../utils/otp.js";
import {sendOtp} from "../utils/sendOtp.js"
import {signupOTPStore,resetOTPStore} from "../utils/otpStore.js";

// send otp after signup 
export const sendSignupOtp = async (req,res) => {
     const {email_id} = req.body;
     const normalizedEmail = email_id.trim().toLowerCase();

     const user = await User.findOne({ email_id: normalizedEmail });
     if(!user) return res.status(404).json({message:"user not found"});

     const otp = generateOTP();

     signupOTPStore[normalizedEmail] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
     };

     await sendOtp(normalizedEmail, otp, "Account Verification");

     res.json({message:"otp sent to the mail"});
}

// verify the signup otp
export const verifySignupOtp = async (req,res) => {
    const { email_id, otp } = req.body;

    const normalizedEmail = (email_id || "").trim().toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ message: "email_id is required" });
    }

    const record = signupOTPStore[normalizedEmail];
    if(!record) return res.status(400).json({message:"otp not found check your mail and try again"});
    
    if(record.expiresAt < Date.now()){
      return res.status(400).json({message:"otp expired"});
    }

    if (String(record.otp) !== String(otp)){
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await User.updateOne({ email_id: normalizedEmail }, { isVerified: true });
    delete signupOTPStore[normalizedEmail];

    return res.json({ message: "OTP verified. User registered successfully." });
}

//   FORGOT PASSWORD – SEND OTP

export const forgotPassword = async (req, res) => {
  const { email_id } = req.body;
  const normalizedEmail = email_id.trim().toLowerCase();
  const user = await User.findOne({ email_id: normalizedEmail });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  resetOTPStore[normalizedEmail] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  await sendOtp(normalizedEmail, otp, "Password Reset");

  res.json({ message: "OTP sent for password reset" });
};


//  RESET PASSWORD (OTP VERIFIED)
export const resetPassword = async (req, res) => {
  const { email_id, otp, newPassword } = req.body;
  const normalizedEmail = email_id.trim().toLowerCase();

  const record = resetOTPStore[normalizedEmail];
  if (!record) return res.status(400).json({ message: "OTP not found" });

  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  if (String(record.otp) !== String(otp))
    return res.status(400).json({ message: "Invalid OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email_id: normalizedEmail }, { password: hashedPassword });

  delete resetOTPStore[normalizedEmail];

  res.json({ message: "Password changed successfully" });
};



