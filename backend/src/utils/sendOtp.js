import nodemailer from "nodemailer";

export const sendOtp = async (email, otp, purpose = "verification") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your OTP for ${purpose}`,
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  });
};
