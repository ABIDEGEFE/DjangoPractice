import React, { useState } from "react";

export const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message || data.error || "User deletion attempted.");
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