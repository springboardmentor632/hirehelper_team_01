const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
