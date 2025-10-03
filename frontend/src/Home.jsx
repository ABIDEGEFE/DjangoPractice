import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: ""
  });

  const [message, setMessage] = useState('');
  const [features, setFeature] = useState([]);

  const handleFeatureSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status } = formData;

    try {
      const response = await fetch('http://127.0.0.1:8000/feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, status })
      });

      const data = await response.json();
      setMessage(data.message || data.error || 'Unknown error');
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  const handleFetchFeature = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/feature', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      setFeature(data);
    } catch (err) {
      setMessage('Failed to fetch features.');
    }
  };

  const handleShowUserInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
        console.log("User info:", userData);
      } else {
        setMessage("Failed to fetch user info.");
      }
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <p>This is the home page</p>
      <button onClick={() => handleNavigate('/deleteUser')}>Delete user</button>

      <form onSubmit={handleFeatureSubmit}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter description here"
        />
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          placeholder="Enter status here"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name here"
        />
        <button type="submit">Submit Feature</button>
      </form>

      <button onClick={handleFetchFeature} style={{ marginTop: '10px' }}>
        Fetch Features
      </button>

      <div>
        <button onClick={() => handleNavigate('/weather')} style={{ marginTop: '10px' }}>
          Go to Weather Info
        </button>
      </div>

      <div>
        <button style={{position: 'absolute', top: 10, right: 10}} onClick={handleShowUserInfo}>
          show user info
        </button>
        {userInfo && (
          <p>This is your email: {userInfo.email} username: {userInfo.name}</p>
        )}
      </div>

      {message && <p>{message}</p>}

      {features.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #4f4f',
              }}
            >
              <h2>Name :{feature.name}</h2>
              <p>Descripiton: {feature.description}</p>
              <p>Status: {feature.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};