// components/CartItem.jsx
import React from "react";

const CartItem = ({ item, onRemove, onUpdateQty }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1.2rem",
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "1rem 1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      border: "1px solid #f0f0f0",
    }}>
      {/* Product Image */}
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "10px",
        overflow: "hidden",
        flexShrink: 0,
        backgroundColor: "#f5f5f5",
      }}>
        <img
          src={item.book.coverImage}
          alt={item.book.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      {/* Product Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#1a1a2e",
          marginBottom: "0.15rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {item.book.title}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "0.6rem" }}>
          by {item.book.author}
        </p>

        {/* Quantity Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => onUpdateQty(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              backgroundColor: item.quantity <= 1 ? "#f5f5f5" : "white",
              color: item.quantity <= 1 ? "#ccc" : "#1a1a2e",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            −
          </button>
          <span style={{
            minWidth: "32px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#1a1a2e",
            backgroundColor: "#f0f2f5",
            padding: "0.2rem 0.6rem",
            borderRadius: "6px",
          }}>
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQty(item._id, item.quantity + 1)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              color: "#1a1a2e",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#1a1a2e" && (e.target.style.color = "white")}
            onMouseLeave={e => { e.target.style.backgroundColor = "white"; e.target.style.color = "#1a1a2e"; }}
          >
            +
          </button>
          <span style={{ fontSize: "0.82rem", color: "#aaa", marginLeft: "0.3rem" }}>
            × ₹{item.book.price}
          </span>
        </div>
      </div>

      {/* Subtotal + Remove */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
        flexShrink: 0,
      }}>
        <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1a1a2e" }}>
          ₹{(item.book.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => onRemove(item._id)}
          style={{
            backgroundColor: "#fff0f3",
            color: "#e94560",
            border: "1px solid #e94560",
            padding: "0.35rem 0.85rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.target.style.backgroundColor = "#e94560"; e.target.style.color = "white"; }}
          onMouseLeave={e => { e.target.style.backgroundColor = "#fff0f3"; e.target.style.color = "#e94560"; }}
        >
          Remove ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;