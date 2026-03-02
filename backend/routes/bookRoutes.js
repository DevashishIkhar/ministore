// routes/bookRoutes.js
import express from "express";

const router = express.Router();

const products = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic novel set in the Jazz Age about wealth, love, and the American Dream.",
    price: 12.99,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/800px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    stock: 10,
    category: "Books",
  },
  {
    _id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful story of racial injustice and moral growth in the American South.",
    price: 14.99,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    stock: 7,
    category: "Books",
  },
  {
    _id: "3",
    title: "Wireless Headphones",
    author: "Sony",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 2999,
    coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    stock: 15,
    category: "Electronics",
  },
  {
    _id: "4",
    title: "Running Shoes",
    author: "Nike",
    description: "Lightweight and breathable running shoes for all terrain. Maximum comfort.",
    price: 3499,
    coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    stock: 20,
    category: "Footwear",
  },
  {
    _id: "5",
    title: "Leather Wallet",
    author: "Fossil",
    description: "Slim genuine leather bifold wallet with RFID blocking technology.",
    price: 899,
    coverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    stock: 30,
    category: "Accessories",
  },
  {
    _id: "6",
    title: "Ceramic Coffee Mug",
    author: "HomeGoods",
    description: "Hand-crafted ceramic mug with ergonomic handle. Microwave and dishwasher safe.",
    price: 349,
    coverImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    stock: 50,
    category: "Kitchen",
  },
  {
    _id: "7",
    title: "Yoga Mat",
    author: "Liforme",
    description: "Non-slip eco-friendly yoga mat with alignment guides. 6mm thick for comfort.",
    price: 1299,
    coverImage: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop",
    stock: 25,
    category: "Fitness",
  },
  {
    _id: "8",
    title: "Mechanical Keyboard",
    author: "Keychron",
    description: "Compact wireless mechanical keyboard with RGB backlight and hot-swap switches.",
    price: 5499,
    coverImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    stock: 12,
    category: "Electronics",
  },
];

router.get("/", (req, res) => res.json(products));

router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

export default router;