// components/LoginSignup.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const { data } = await API.post(endpoint, form);

      if (!isLogin) {
        // Signup successful — switch to login form
        setForm({ name: "", email: "", password: "" });
        setIsLogin(true);
        setSuccessMsg("✅ Account created successfully! Please login.");
        return;
      }

      // Login successful — save and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">{isLogin ? "Login to your account" : "Sign up to get started"}</p>

        {/* Success message after signup */}
        {successMsg && (
          <div style={{
            backgroundColor: "#f0fff4",
            border: "1px solid #4caf50",
            color: "#2e7d32",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontWeight: 600,
            marginBottom: "1rem",
          }}>
            {successMsg}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input className="auth-input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          )}
          <input className="auth-input" name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <input className="auth-input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="auth-toggle" onClick={() => { setIsLogin(!isLogin); setSuccessMsg(""); }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="auth-toggle-link">{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;