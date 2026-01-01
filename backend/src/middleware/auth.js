import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    console.log('[Auth] Header:', authHeader.substring(0, 20) + '...');
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      console.log('[Auth] Missing Bearer token');
      return res.status(401).json({ message: "Unauthorized: Missing Bearer token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    console.log('[Auth] Decoded:', decoded);
    if (!decoded?.userId) {
      console.log('[Auth] No userId in token');
      return res.status(401).json({ message: "Invalid token: missing userId" });
    }

    req.user = { _id: decoded.userId };
    next();
  } catch (err) {
    console.error('[Auth] Error:', err.message);
    return res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};

