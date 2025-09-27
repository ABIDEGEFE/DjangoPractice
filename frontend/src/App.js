import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { DeleteUser } from "./DeleteUser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route renders LoginPage */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;
