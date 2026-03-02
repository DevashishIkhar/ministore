// routes/product.routes.js
import express from "express";

const router = express.Router();

// Local static products
const products = [
  { _id: "1", name: "Book", price: 299 },
  { _id: "2", name: "Laptop", price: 50000 },
  { _id: "3", name: "Headphones", price: 1500 },
];

// Seed route - just returns the static products (no DB to seed)
router.get("/seed", (req, res) => {
  res.json({ message: "Products already loaded (static data)", products });
});

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

export default router;