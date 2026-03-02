// routes/cart.routes.js
import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

const cartItems = [];

const products = [
  { _id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/800px-The_Great_Gatsby_Cover_1925_Retouched.jpg" },
  { _id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", price: 14.99, coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg" },
  { _id: "3", title: "Wireless Headphones", author: "Sony", price: 2999, coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
  { _id: "4", title: "Running Shoes", author: "Nike", price: 3499, coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { _id: "5", title: "Leather Wallet", author: "Fossil", price: 899, coverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop" },
  { _id: "6", title: "Ceramic Coffee Mug", author: "HomeGoods", price: 349, coverImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop" },
  { _id: "7", title: "Yoga Mat", author: "Liforme", price: 1299, coverImage: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop" },
  { _id: "8", title: "Mechanical Keyboard", author: "Keychron", price: 5499, coverImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop" },
];

// GET /api/cart
router.get("/", auth, (req, res) => {
  const userCart = cartItems.filter((item) => item.userId === req.user.id);
  res.json(userCart);
});

// POST /api/cart
router.post("/", auth, (req, res) => {
  const { bookId, quantity } = req.body;
  const product = products.find((p) => p._id === bookId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existing = cartItems.find(
    (item) => item.book._id === bookId && item.userId === req.user.id
  );
  if (existing) {
    existing.quantity += 1;
    return res.json({ message: "Quantity updated", item: existing });
  }

  const item = {
    _id: String(Date.now()),
    userId: req.user.id,
    book: product,
    quantity: quantity || 1,
  };
  cartItems.push(item);
  res.json({ message: "Added to cart", item });
});

// PATCH /api/cart/:id — update quantity
router.patch("/:id", auth, (req, res) => {
  const { quantity } = req.body;
  const item = cartItems.find(
    (item) => item._id === req.params.id && item.userId === req.user.id
  );
  if (!item) return res.status(404).json({ message: "Item not found" });
  if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });
  item.quantity = quantity;
  res.json({ message: "Quantity updated", item });
});

// DELETE /api/cart/:id
router.delete("/:id", auth, (req, res) => {
  const index = cartItems.findIndex(
    (item) => item._id === req.params.id && item.userId === req.user.id
  );
  if (index === -1) return res.status(404).json({ message: "Item not found" });
  cartItems.splice(index, 1);
  res.json({ message: "Removed from cart" });
});

export default router;