import React, { useState } from "react";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error || "Unknown response");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm your password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <br />
        <input type="submit" value="Register" />
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};
