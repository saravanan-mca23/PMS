import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TLDashboard from "./pages/TLDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer />
        <Routes>
          {/* Default route to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/TLDashboard" element={<TLDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
