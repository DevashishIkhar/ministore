import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // Fetch user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/profile")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  // Fetch cart count
  useEffect(() => {
    if (user) {
      API.get("/cart")
        .then((res) => setCartCount(res.data.length))
        .catch(() => {});
    }
  }, [user]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // Close menu when resizing to desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCartCount(0);
    navigate("/");
    setMenuOpen(false); // Close menu after logout
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>MiniStore</span>
        </Link>

        {/* Desktop User Section (visible only on non-mobile) */}
        {!isMobile && (
          <div style={styles.userSection}>
            {user ? (
              <>
                <Link to="/profile" style={styles.profileLink}>
                  <span style={styles.userName}>Hi, {user.name.split(" ")[0]}</span>
                  <div style={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <Link to="/login" style={styles.loginBtn}>Login</Link>
            )}
            <Link to="/cart" style={styles.cartIcon}>
              🛒
              {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </div>
        )}

        {/* Hamburger Button (visible only on mobile) */}
        {isMobile && (
          <button onClick={toggleMenu} style={styles.hamburger}>
            ☰
          </button>
        )}
      </div>

      {/* Mobile Menu (slides down when open) */}
      {isMobile && menuOpen && (
        <div style={styles.mobileMenu}>
          {user ? (
            <>
              <div style={styles.mobileUserInfo}>
                <Link to="/profile" style={styles.mobileProfileLink} onClick={() => setMenuOpen(false)}>
                  <div style={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
                  <span>{user.name}</span>
                </Link>
              </div>
              <div style={styles.mobileButtons}>
                <button onClick={handleLogout} style={styles.mobileLogoutBtn}>Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login" style={styles.mobileLoginBtn} onClick={() => setMenuOpen(false)}>Login</Link>
          )}
          <Link to="/cart" style={styles.mobileCartLink} onClick={() => setMenuOpen(false)}>
            <span style={styles.mobileCartIcon}>🛒</span>
            Cart {cartCount > 0 && <span style={styles.mobileCartBadge}>({cartCount})</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "0.5rem 1rem",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    textDecoration: "none",
  },
  logoText: {
    fontSize: "1.8rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  hamburger: {
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#1a1a2e",
    padding: "0.5rem",
  },
  // Desktop styles
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    textDecoration: "none",
    color: "#1a1a2e",
    padding: "0.3rem 0.8rem",
    borderRadius: "30px",
    transition: "background 0.2s",
  },
  userName: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#e94560",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  logoutBtn: {
    background: "none",
    border: "2px solid #1a1a2e",
    color: "#1a1a2e",
    padding: "0.5rem 1.2rem",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.2s",
  },
  loginBtn: {
    textDecoration: "none",
    color: "#1a1a2e",
    fontWeight: 600,
    border: "2px solid #1a1a2e",
    padding: "0.5rem 1.5rem",
    borderRadius: "30px",
    transition: "all 0.2s",
    fontSize: "0.95rem",
  },
  cartIcon: {
    position: "relative",
    fontSize: "1.8rem",
    textDecoration: "none",
    color: "#1a1a2e",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#e94560",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "3px 7px",
    borderRadius: "50%",
    minWidth: "20px",
    textAlign: "center",
  },
  // Mobile menu styles
  mobileMenu: {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    marginTop: "0.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  mobileUserInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileProfileLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    textDecoration: "none",
    color: "#1a1a2e",
    fontWeight: 600,
  },
  mobileButtons: {
    display: "flex",
    justifyContent: "center",
  },
  mobileLogoutBtn: {
    background: "none",
    border: "2px solid #1a1a2e",
    color: "#1a1a2e",
    padding: "0.5rem 1.5rem",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    width: "100%",
  },
  mobileLoginBtn: {
    textDecoration: "none",
    color: "#1a1a2e",
    fontWeight: 600,
    border: "2px solid #1a1a2e",
    padding: "0.5rem 1.5rem",
    borderRadius: "30px",
    fontSize: "1rem",
    textAlign: "center",
    display: "block",
  },
  mobileCartLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "#1a1a2e",
    fontWeight: 600,
    borderTop: "1px solid #ddd",
    paddingTop: "1rem",
  },
  mobileCartIcon: {
    fontSize: "1.5rem",
  },
  mobileCartBadge: {
    backgroundColor: "#e94560",
    color: "white",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "0.8rem",
    marginLeft: "0.3rem",
  },
};

// Add hover effects
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .profile-link:hover { background-color: #f0f0f0; }
  .logout-btn:hover { background-color: #1a1a2e; color: white; }
  .login-btn:hover { background-color: #1a1a2e; color: white; }
`;
document.head.appendChild(styleTag);

export default Navbar;