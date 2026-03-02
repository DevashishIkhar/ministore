import React, { useEffect, useState } from "react";
import API from "../api/api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books").then(res => setBooks(res.data));
  }, []);

  const addToCart = async (id) => {
    await API.post("/cart/add", { bookId: id, quantity: 1 });
    alert("Added to cart");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {books.map(book => (
        <div key={book._id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>${book.price}</p>
          <button onClick={() => addToCart(book._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;