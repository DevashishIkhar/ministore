// middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  // Support "Bearer <token>" format
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}