import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f2f5" }}>
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#1a1a2e", marginBottom: "1rem" }}>🎉 Order Placed Successfully!</h1>
        <p style={{ marginBottom: "1.5rem" }}>Thank you for shopping with us.</p>
        <button onClick={() => navigate("/")} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#1a1a2e", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;