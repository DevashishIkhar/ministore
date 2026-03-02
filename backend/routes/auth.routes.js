// routes/auth.routes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();

const router = express.Router();

// Temporary in-memory user store
const users = [];

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = users.find((u) => u.email === email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: String(users.length + 1), name, email, password: hashed };
    users.push(user);

    res.json({ message: "User created", user: { name, email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "7d",
    });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ... your signup and login routes ...

// 👤 GET /api/auth/profile - returns logged-in user
router.get("/profile", auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

export default router;