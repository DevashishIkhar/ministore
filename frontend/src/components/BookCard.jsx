// components/BookCard.jsx
import React from "react";

const BookCard = ({ book: product, onAddToCart }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        width: "210px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.1)";
      }}
    >
      {/* Image + Category Badge */}
      <div style={{ position: "relative" }}>
        <img
          src={product.coverImage}
          alt={product.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <span style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          backgroundColor: "#1a1a2e",
          color: "white",
          fontSize: "0.68rem",
          fontWeight: 600,
          padding: "0.2rem 0.55rem",
          borderRadius: "20px",
        }}>
          {product.category}
        </span>
      </div>

      {/* Details */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        padding: "0.9rem",
      }}>
        <div style={{ marginBottom: "0.6rem" }}>
          <h3 style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "0.2rem",
            lineHeight: 1.3,
          }}>
            {product.title}
          </h3>
          <p style={{ fontSize: "0.76rem", color: "#888", marginBottom: "0.35rem" }}>
            {product.author}
          </p>
          <p style={{
            fontSize: "0.75rem",
            color: "#aaa",
            lineHeight: 1.4,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
            {product.description}
          </p>
        </div>

        {/* Price + Button */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "0.6rem",
        }}>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e" }}>
            ₹{product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              backgroundColor: "#1a1a2e",
              color: "white",
              border: "none",
              padding: "0.4rem 0.75rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.78rem",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#e94560"}
            onMouseLeave={e => e.target.style.backgroundColor = "#1a1a2e"}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;