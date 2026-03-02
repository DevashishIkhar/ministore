import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // uses your existing axios instance

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API automatically includes the token (same as in CartPage)
        const { data } = await API.get("/auth/profile");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        if (error.response?.status === 401) {
          // Token invalid/expired → redirect to login
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading profile...</div>;
  if (!user) return <div style={{ textAlign: "center", padding: "2rem" }}>Could not load profile. Please log in again.</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "1.5rem" }}>👤 My Profile</h2>
        <div style={{ borderTop: "2px solid #f0f0f0", paddingTop: "1.5rem" }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "2rem",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            padding: "0.75rem 1.8rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e94560")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a1a2e")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;