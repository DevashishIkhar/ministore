// routes/orderRoutes.js
import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// In-memory orders store
let orders = [];

// Create a new order
router.post("/", auth, (req, res) => {
  const { items, total, shippingAddress, paymentMethod } = req.body;
  const userId = req.user.id;

  if (!items || !total || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newOrder = {
    id: String(orders.length + 1),
    userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get orders for logged-in user
router.get("/", auth, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

export default router;