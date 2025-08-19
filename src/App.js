import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProductForm from './products/ProductForm';
import Homes from './pages/Homes';
import ProductList from './products/ProductList';
import Register from './pages/Register';
import Logins from './pages/Logins';
import Homescreen from './components/Homescreen'

function App() {
  return (
    <Router>
      <Routes>
        {/* Direct Access Pages */}
        <Route path="/homescreen" element={<Homescreen />} /> {/* ✅ Fixed */}
        <Route path="/homes" element={<Homes />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/register" element={<Register />} />

        {/* Default Route → Always show Homescreen first */}
        <Route path="*" element={<Navigate to="/homescreen" />} />
      </Routes>
    </Router>
  );
}

export default App;
