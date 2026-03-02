import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartTotal } = location.state || { cartItems: [], cartTotal: 0 };

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No items to checkout</h2>
        <button onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          bookId: item.book._id,
          title: item.book.title,
          quantity: item.quantity,
          price: item.book.price,
        })),
        total: cartTotal,
        shippingAddress: address,
        paymentMethod,
      };
      await API.post("/orders", orderData);
      // Optionally clear cart here (if you have a cart clear endpoint)
      // For now, just navigate to a success page or home
      navigate("/order-success");
    } catch (error) {
      console.error("Order failed", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "1.5rem" }}>Checkout</h1>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {/* Order Summary */}
          <div style={{ flex: "1 1 300px", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Order Summary</h2>
            {cartItems.map(item => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>{item.book.title} x{item.quantity}</span>
                <span>₹{(item.book.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr style={{ margin: "1rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Form */}
          <div style={{ flex: "2 1 400px", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label>Address Line 1 *</label>
                <input type="text" name="line1" value={address.line1} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", borderRadius: "6px", border: "1px solid #ccc" }} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Address Line 2</label>
                <input type="text" name="line2" value={address.line2} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", borderRadius: "6px", border: "1px solid #ccc" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label>City *</label>
                  <input type="text" name="city" value={address.city} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div>
                  <label>Postal Code *</label>
                  <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Country *</label>
                <input type="text" name="country" value={address.country} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", borderRadius: "6px", border: "1px solid #ccc" }} />
              </div>

              <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>Payment Method</h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
                </label>
                <label style={{ display: "block" }}>
                  <input type="radio" name="payment" value="Card" checked={paymentMethod === "Card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card (Demo)
                </label>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={() => navigate("/cart")} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Back to Cart
                </button>
                <button type="submit" disabled={loading} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#e94560", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;