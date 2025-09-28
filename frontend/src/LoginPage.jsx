import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null); // Store user info for display
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data);

      if (data.message === "success") {
        setUserInfo({ username: data.username, email: data.email });
        setMessage("Login successful!");
        navigate('/home')
      } else {
        setMessage(data.message || "Unknown error occurred.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      {userInfo && (
        <div>
          <p>Welcome, {userInfo.username}. This is your email: {userInfo.email}</p>
        </div>
      )}

      <Link to="/register">If you're a new user, register first</Link>
    </div>
  );
};