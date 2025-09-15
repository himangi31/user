import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Homes from "./pages/Homes";
import ProductForm from "./products/ProductForm";
import ProductList from "./products/ProductList";
import Register from "./pages/Register";
import Logins from "./pages/Logins";
import Homescreen from "./components/Homescreen";
import Capacity from "./products/Capacity";
import Category from "./products/Category";
import Subcategory from "./products/Subcategory";
import Voltage from "./products/Voltage";
import Sub_subcategory from "./products/Sub_subcategory";
import Dashboard from "./pages/Dashboard";
import ProductView from "./products/ProductView";
import ProductDetail from "./products/ProductDetail";
import Navbar from "./components/Navbar";
import Datacenter from "./Website/Datacenter";
import Contact from "./Website/Contact";

function App() {
  // ========================
  // AUTH STATE MANAGEMENT
  // ========================
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on app start
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ========================
  // PRIVATE ROUTE COMPONENT
  // ========================
  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to /homescreen */}
        <Route path="/" element={<Navigate to="/homescreen" />} />

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/assets/*" element={null} />
        <Route path="/homescreen" element={<Homescreen />} />
        <Route path="/login" element={<Logins onLogin={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productview" element={<ProductView />} />
        <Route path="/navbar" element={<Navbar />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/datacenter" element={<Datacenter />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />

        {/* ---------- PRIVATE ROUTES ---------- */}
        <Route element={<PrivateRoute />}>
          <Route path="/homes" element={<Homes logout={logout} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="productform" element={<ProductForm />} />
            <Route path="capacity" element={<Capacity />} />
            <Route path="category" element={<Category />} />
            <Route path="voltage" element={<Voltage />} />
            <Route path="subcategory" element={<Subcategory />} />
            <Route path="sub_subcategory" element={<Sub_subcategory />} />
            <Route path="productlist" element={<ProductList />} />
          
          </Route>
        </Route>

        {/* ---------- 404 FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/homescreen" />} />
      </Routes>
    </Router>
  );
}

export default App;
