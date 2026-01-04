import nodemailer from "nodemailer";

export const sendOtp = async (email, otp, purpose = "verification") => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER or MAIL_PASS is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.verify(); // checks credentials/connectivity before sending
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your OTP for ${purpose}`,
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  });
};

export const sendNotificationEmail = async (email, subject, text) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER or MAIL_PASS is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.verify();
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject,
    text
  });
};