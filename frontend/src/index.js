import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// function App() {
//   const [features, setFeatures] = useState([]);  // now store an array

//   const fetchFeature = async () => {
//     const response = await fetch("http://127.0.0.1:8000/", {  // make sure endpoint matches Django
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     setFeatures(data);  // set list of features
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Django + React Feature</h1>
//         <button onClick={fetchFeature}>Fetch Features</button>

//         {features.length > 0 && (
//           <div style={{ marginTop: '20px' }}>
//             {features.map((feature) => (
//               <div
//                 key={feature.id}
//                 style={{
//                   marginBottom: '15px',
//                   padding: '10px',
//                   border: '1px solid #4f4f',
//                 }}
//               >
//                 <h2>{feature.name}</h2>
//                 <p>{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);