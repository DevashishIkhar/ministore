import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Profile from "./pages/Profile.jsx";   
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

import express from "express";
import cors from "cors";          // <-- Make sure you have this import
import dotenv from "dotenv";
// ... other imports

dotenv.config();

const app = express();

// ===== ADD CORS CONFIGURATION HERE =====
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.vercel.app', // Replace with your actual Vercel URL after deployment
  'https://your-frontend.netlify.app'  // Replace with your actual Netlify URL after deployment
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// =======================================

// Then your other middleware and routes
app.use(express.json());
app.use("/api/auth", authRoutes);
// ... etc.

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />   
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;