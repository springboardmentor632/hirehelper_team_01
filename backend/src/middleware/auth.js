import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { _id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

