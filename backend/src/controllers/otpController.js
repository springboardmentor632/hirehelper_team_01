import User from "../models/User.js";
import bcrypt from "bcrypt";
import {generateOTP} from "../utils/otp.js";
import {sendOtp} from "../utils/sendOtp.js"
import {signupOTPStore,resetOTPStore} from "../utils/otpStore.js";

// send otp after signup 

export const sendSignupOtp = async (req,res) => {
     const {email_id} = req.body;
     const user = await User.findOne({email_id});
     if(!user) return res.status(404).json({message:"user not found"});

    //  if the user is existing we can now sent the otp to their mail

    const otp = generateOTP();

    signupOTPStore[email_id] = {
        otp,
        expiresAt:Date.now() + 5 * 60 * 1000
    };

    await sendOtp(email_id,otp,"Account Verification");

    res.json({message:"otp send to the mail"});





}

// verify the signup otp
export const verifySignupOtp = async (req,res) => {
        const {email_id,otp} = req.body;
        
        // checking the email record was existing in the store 
        const record = signupOTPStore[email_id];
        if(!record) return res.status(400).json({message:"otp not found check your mail and try again"});
         
        // checking was otp was expired or not
        if(record.expiresAt < Date.now()){
             return res.status(400).json({message:"otp expired"});
        }

        // checking the otp was correct or not
          if (record.otp !== otp){
            return res.status(400).json({ message: "Invalid OTP" });
          }
       
       await User.updateOne({ email_id }, { isVerified: true });
         delete signupOTPStore[email_id];

        res.json({ message: "OTP verified. User registered successfully." });

}      

//   FORGOT PASSWORD – SEND OTP

export const forgotPassword = async (req, res) => {
  const { email_id } = req.body;

  const user = await User.findOne({ email_id });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  resetOTPStore[email_id] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  await sendOTP(email_id, otp, "Password Reset");

  res.json({ message: "OTP sent for password reset" });
};


//  RESET PASSWORD (OTP VERIFIED)
export const resetPassword = async (req, res) => {
  const { email_id, otp, newPassword } = req.body;

  const record = resetOTPStore[email_id];
  if (!record) return res.status(400).json({ message: "OTP not found" });

  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email_id }, { password: hashedPassword });

  delete resetOTPStore[email_id];

  res.json({ message: "Password changed successfully" });
};




