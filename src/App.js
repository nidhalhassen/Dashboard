import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("auth") === "true");
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex font-inter bg-gray-200 min-h-screen">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
                  <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                  <div className="p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/activities" element={<Activities />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
