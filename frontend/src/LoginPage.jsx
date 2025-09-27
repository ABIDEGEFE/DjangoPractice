import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password1, password2 } = formData;

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error || "Unknown response");
  };
  const handleNavigate = () => {
    navigate('/deleteUser')
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          name="password1"
          placeholder="Enter your password"
          value={formData.password1}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          name="password2"
          placeholder="Confirm your password"
          value={formData.password2}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Register" />
      </form>

      {message && <p>{message}</p>}
      <button onClick={handleNavigate}>Delete user</button>
    </div>
  );
};