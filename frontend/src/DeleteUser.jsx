import React, { useState } from "react";

export const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    return <p>Please log in to delete a user.</p>;
  }

  const handleDeleteButton = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/delete", {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    // setMessage(data.message || data.error || "User deletion attempted.");
    if (response.ok) {
      setMessage(data.message || "User deleted successfully.");
    } else {
      setMessage(data.error || "Failed to delete user.");
    }
  };

  return (
    <div>
      <form onSubmit={handleDeleteButton}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email to delete"
        />
        <input type="submit" value="Delete" />
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};