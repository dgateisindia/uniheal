import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      /*
        Store JWT only after successful login.
        The dashboard will use this token
        to access protected admin APIs.
      */
      sessionStorage.setItem(
        "uniheal_admin_token",
        data.token
      );

      sessionStorage.setItem(
        "uniheal_admin",
        JSON.stringify(data.admin)
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Logo */}
        <div className="admin-login-logo">
          <img
            src="/src/assets/images/logo/uniheal-logo.webp"
            alt="UniHeal"
          />
        </div>

        {/* Heading */}
        <div className="admin-login-heading">
          <h1>Admin Login</h1>

          <p>
            Sign in to access the UniHeal
            administration dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="admin-form-group">
            <label htmlFor="admin-email">
              Email Address
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="admin-form-group">
            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-password-wrapper">

              <input
                id="admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <div className="admin-login-footer">
          <span>UniHeal Healthcare</span>
          <span>•</span>
          <span>Admin Portal</span>
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;