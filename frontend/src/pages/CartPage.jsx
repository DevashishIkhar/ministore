// pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to view your cart");
        navigate("/login");
      }
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const updateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await API.patch(`/cart/${itemId}`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "2rem" }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.8rem",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e" }}>
          🛒 Your Cart
          {cart.length > 0 && (
            <span style={{
              marginLeft: "0.7rem",
              backgroundColor: "#e94560",
              color: "white",
              fontSize: "0.82rem",
              padding: "0.2rem 0.65rem",
              borderRadius: "20px",
              fontWeight: 600,
              verticalAlign: "middle",
            }}>
              {cart.length} item{cart.length > 1 ? "s" : ""}
            </span>
          )}
        </h1>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {[
            { label: "← Back to Home", action: () => navigate("/") },
            // { label: "👤 Profile", action: () => navigate("/login") },
            { label: "👤 Profile", action: () => navigate("/profile") },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                backgroundColor: "white",
                color: "#1a1a2e",
                border: "2px solid #1a1a2e",
                padding: "0.5rem 1.1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontWeight: 600,
              }}
              onMouseEnter={e => { e.target.style.backgroundColor = "#1a1a2e"; e.target.style.color = "white"; }}
              onMouseLeave={e => { e.target.style.backgroundColor = "white"; e.target.style.color = "#1a1a2e"; }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "3rem",
          maxWidth: "400px",
          margin: "4rem auto 0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <h2 style={{ color: "#1a1a2e", marginBottom: "0.5rem" }}>Your cart is empty</h2>
          <p style={{ color: "#999", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Browse our store and add something!
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#1a1a2e",
              color: "white",
              border: "none",
              padding: "0.75rem 1.8rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#e94560"}
            onMouseLeave={e => e.target.style.backgroundColor = "#1a1a2e"}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          alignItems: "flex-start",
          maxWidth: "1100px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}>
          {/* Cart Items */}
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQty={updateQty}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            width: "300px",
            flexShrink: 0,
            backgroundColor: "white",
            borderRadius: "14px",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            position: "sticky",
            top: "80px",
          }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.2rem" }}>
              📋 Order Summary
            </h2>

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "1rem" }}>
              {cart.map((item) => (
                <div key={item._id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                  fontSize: "0.86rem",
                  color: "#555",
                }}>
                  <span style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.book.title} ×{item.quantity}
                  </span>
                  <span>₹{(item.book.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: "2px solid #1a1a2e",
              marginTop: "1rem",
              paddingTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.2rem",
            }}>
              <span style={{ fontWeight: 700, fontSize: "1rem" }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#1a1a2e" }}>
                ₹{total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout", { state: { cartItems: cart, cartTotal: total } })}
              style={{
                width: "100%",
                backgroundColor: "#e94560",
                color: "white",
                border: "none",
                padding: "0.85rem",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "0.8rem",
              }}
              onMouseEnter={e => e.target.style.backgroundColor = "#c73652"}
              onMouseLeave={e => e.target.style.backgroundColor = "#e94560"}
            >
              Proceed to Checkout →
            </button>

            <button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "#1a1a2e",
                border: "2px solid #1a1a2e",
                padding: "0.75rem",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
              onMouseEnter={e => { e.target.style.backgroundColor = "#1a1a2e"; e.target.style.color = "white"; }}
              onMouseLeave={e => { e.target.style.backgroundColor = "white"; e.target.style.color = "#1a1a2e"; }}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;