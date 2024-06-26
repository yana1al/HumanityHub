import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Client from "../services/apis";
import GoogleLoginButton from "./GoogleLoginButton"

const LogIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/auth/login", {
        usernameOrEmail,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="auth-input"
          autoComplete="username"
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit">LogIn</button>
      </form>
      <GoogleLoginButton /> 
      <p>
        New user? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default LogIn;
