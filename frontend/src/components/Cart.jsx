import React, { useEffect, useState } from "react";
import API from "../api/api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    await API.post("/cart/remove", { bookId: id });
    fetchCart();
  };

  const placeOrder = async () => {
    await API.post("/order");
    alert("Order placed!");
    fetchCart();
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? <p>Cart is empty</p> : (
        <>
          {cart.items.map(item => (
            <div key={item.book._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <h3>{item.book.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeItem(item.book._id)}>Remove</button>
            </div>
          ))}
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;