import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { DeleteUser } from "./DeleteUser";
import { Home } from "./Home";
import { Register } from "./Register";
import { WeatherInfo } from "./WeatherInfo";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route renders LoginPage */}
        <Route path='/' element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path='/register' element={<Register />} />
        <Route path='/weather' element={<WeatherInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
