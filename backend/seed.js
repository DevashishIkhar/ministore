// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from './models/Book.js';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedBooks = async () => {
  try {
    await Book.deleteMany(); // Clear existing books
    await Book.create([
      { title: "Book 1", author: "Author A", price: 299, image: "/placeholder.png" },
      { title: "Book 2", author: "Author B", price: 399, image: "/placeholder.png" },
      { title: "Book 3", author: "Author C", price: 499, image: "/placeholder.png" }
    ]);
    console.log("Books seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedBooks();