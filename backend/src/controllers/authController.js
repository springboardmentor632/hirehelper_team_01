import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email_id, phone_number, password } = req.body;

    
    const exists = await User.findOne({ email_id });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await User.create({
      first_name,
      last_name,
      email_id,
      phone_number,
      password: hashedPassword
    });

    res.json({ message: "User registered successfully." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
