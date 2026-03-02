// models/Cart.js
// No database - cart items are managed in cart.routes.js in-memory array
// This file is kept as a placeholder schema reference

const CartSchema = {
  _id: "string",
  userId: "string (required)",
  productId: "string (required)",
  name: "string",
  price: "number",
  quantity: "number (default: 1)",
};

export default CartSchema;