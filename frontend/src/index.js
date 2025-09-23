import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { getCookie } from './utils/csrf';

function App() {

  const [feature, setFeature] = useState(null);

  const fetchFeature = async () => {
  const response = await fetch("http://127.0.0.1:8000", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  setFeature(data);
};
  return (
    <div className="App">
      <header className="App-header">
        <h1>Django + React Feature</h1>
        <button onClick={fetchFeature}>Fetch Feature</button>
        {feature && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #4f4f' }}>
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
        )}
      </header>
    </div>
  );


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);