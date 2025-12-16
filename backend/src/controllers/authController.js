const register = async (req, res) => {
  res.status(200).json({ message: "Register working" });
};

const sendSignupOtp = async (req, res) => {
  res.status(200).json({ message: "OTP sent" });
};

const verifySignupOtp = async (req, res) => {
  res.status(200).json({ message: "OTP verified" });
};

const login = async (req, res) => {
  res.status(200).json({ message: "Login working" });
};

module.exports = {
  register,
  sendSignupOtp,
  verifySignupOtp,
  login
};
