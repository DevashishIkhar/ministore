import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Books", "Electronics", "Footwear", "Accessories", "Kitchen", "Fitness"];

// Image mapping function – returns a relevant Unsplash image URL based on product category/title
const getProductImage = (product) => {
  const category = product.category?.toLowerCase();
  const title = product.title?.toLowerCase();

  // Books
  if (category === "books" || title?.includes("book") || title?.includes("gatsby") || title?.includes("mockingbird")) {
    return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop";
  }
  // Electronics – headphones or keyboard
  if (category === "electronics") {
    if (title?.includes("headphone")) {
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
    }
    if (title?.includes("keyboard")) {
      return "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop";
    }
  }
  // Footwear – shoes
  if (category === "footwear" || title?.includes("shoe") || title?.includes("running")) {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop";
  }
  // Accessories – wallet
  if (category === "accessories" || title?.includes("wallet")) {
    return "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop";
  }
  // Kitchen – pan or mug
  if (category === "kitchen") {
    if (title?.includes("pan")) {
      return "https://images.unsplash.com/photo-1584990347442-b6b7a7e0e4f9?w=200&h=200&fit=crop";
    }
    if (title?.includes("mug") || title?.includes("coffee")) {
      return "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop";
    }
  }
  // Fitness – mat or dumbbells
  if (category === "fitness") {
    if (title?.includes("yoga") || title?.includes("mat")) {
      return "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop";
    }
    if (title?.includes("dumbbell")) {
      return "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200&h=200&fit=crop";
    }
  }
  // Fallback image
  return `https://picsum.photos/200/200?random=${product._id}`;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/books");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // Fallback mock data
        const mockProducts = [
          { _id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Books", description: "A classic novel set in the Jazz Age about wealth, love, and the American dream.", price: 12.99 },
          { _id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Books", description: "A powerful story of racial injustice and moral growth in the Deep South.", price: 14.99 },
          { _id: 3, title: "Wireless Headphones", brand: "Sony", category: "Electronics", description: "Premium noise-cancelling wireless headphones with 30-hour battery life.", price: 299.99 },
          { _id: 4, title: "Running Shoes", brand: "Nike", category: "Footwear", description: "Lightweight and breathable running shoes for all terrains.", price: 89.99 },
          { _id: 5, title: "Leather Wallet", brand: "Fossil", category: "Accessories", description: "Slim genuine leather bifold wallet with RFID blocking technology.", price: 49.99 },
          { _id: 6, title: "Non-Stick Pan", brand: "T-fal", category: "Kitchen", description: "Durable non-stick frying pan, dishwasher safe.", price: 34.99 },
          { _id: 7, title: "Yoga Mat", brand: "Gaiam", category: "Fitness", description: "Eco-friendly non-slip yoga mat with carrying strap.", price: 29.99 },
          { _id: 8, title: "Dumbbells Set", brand: "CAP", category: "Fitness", description: "10kg pair of neoprene dumbbells for home workouts.", price: 39.99 },
          { _id: 9, title: "Mechanical Keyboard", brand: "Keychron", category: "Electronics", description: "RGB backlit mechanical keyboard with Cherry MX switches.", price: 129.99 },
          { _id: 10, title: "Ceramic Coffee Mug", brand: "Le Creuset", category: "Kitchen", description: "Stoneware coffee mug with colorful glaze, holds 12 oz.", price: 24.99 },
        ];
        setProducts(mockProducts);
      }
    };
    fetchProducts();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to add items to cart", "warning");
      return;
    }
    try {
      await API.post("/cart", { bookId: product._id, quantity: 1 });
      showToast(`"${product.title}" added to cart!`, "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to add to cart", "error");
    }
  };

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  const toastColors = {
    success: { bg: "#1a1a2e", icon: "✅", border: "#4caf50" },
    error: { bg: "#1a1a2e", icon: "❌", border: "#e94560" },
    warning: { bg: "#1a1a2e", icon: "⚠️", border: "#ff9800" },
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast && (
        <div
          className="toast"
          style={{
            ...styles.toast,
            borderLeft: `4px solid ${toastColors[toast.type].border}`,
          }}
        >
          <span style={styles.toastIcon}>{toastColors[toast.type].icon}</span>
          <div style={styles.toastMessage}>
            <p style={styles.toastText}>{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} style={styles.toastClose}>✕</button>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Mini Store</h1>
        <p style={styles.productCount}>{products.length} products available</p>
      </div>

      {/* Category Tabs */}
      <div className="category-container" style={styles.categoryContainer}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="category-btn"
            style={{
              ...styles.categoryBtn,
              backgroundColor: activeCategory === cat ? "#1a1a2e" : "white",
              color: activeCategory === cat ? "white" : "#1a1a2e",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid" style={styles.productGrid}>
        {filtered.map(product => (
          <div key={product._id} className="product-card" style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={getProductImage(product)}
                alt={product.title}
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/200/200?random=fallback";
                }}
              />
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p style={styles.productAuthor}>
                {product.author || product.brand}
              </p>
              <p style={styles.productDescription}>
                {product.description.substring(0, 60)}...
              </p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  style={styles.addToCartBtn}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#c73652")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#e94560")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive & Hover Styles */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .category-btn {
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          border: 2px solid #1a1a2e;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .product-card {
          transition: transform 0.2s, box-shadow 0.2s;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
        /* Responsive grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .category-container {
            gap: 0.5rem;
          }
          .category-btn {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
          .toast {
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
            max-width: none !important;
          }
        }
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
          .category-container {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }
          .category-btn {
            flex-shrink: 0;
          }
          .container {
            padding: 1rem !important;
          }
          .title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

// Styles object (kept for base styling)
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  toast: {
    position: "fixed",
    top: "80px",
    right: "24px",
    zIndex: 9999,
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "1rem 1.4rem",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    minWidth: "280px",
    maxWidth: "360px",
    animation: "slideIn 0.3s ease",
  },
  toastIcon: {
    fontSize: "1.3rem",
  },
  toastMessage: {
    flex: 1,
  },
  toastText: {
    fontSize: "0.92rem",
    fontWeight: 600,
    margin: 0,
  },
  toastClose: {
    background: "none",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    fontSize: "1rem",
    padding: 0,
    lineHeight: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.3rem",
  },
  productCount: {
    fontSize: "1.1rem",
    color: "#666",
  },
  categoryContainer: {
    display: "flex",
    gap: "0.8rem",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryBtn: {
    // base styles moved to CSS class
  },
  productGrid: {
    // moved to CSS class for better responsiveness
  },
  card: {
    // most styles in CSS class, keep minimal inline
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  cardContent: {
    padding: "1.2rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  productTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1a1a2e",
    marginBottom: "0.3rem",
  },
  productAuthor: {
    fontSize: "0.9rem",
    color: "#e94560",
    fontWeight: 500,
    marginBottom: "0.5rem",
  },
  productDescription: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "1rem",
    lineHeight: 1.4,
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1a1a2e",
  },
  addToCartBtn: {
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "background-color 0.2s",
  },
};

export default Home;