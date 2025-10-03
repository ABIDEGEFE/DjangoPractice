import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      const msg = data.message || "Registration successful!";
      setMessage(msg);

      // Navigate if registration was successful
      if (data.name == formData.name) {
        navigate("/");
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
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
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {/* <br />
        <input
          type="password"
          name="password2"
          placeholder="Confirm your password"
          value={formData.password2}
          onChange={handleInputChange}
        />
        <br /> */}
        <input type="submit" value="Register" />
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};