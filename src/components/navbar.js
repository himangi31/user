import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = {
    marginRight: '15px',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold'
  };

  return (
    <nav style={{ padding: '1rem', background: '#e0e0e0' }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/cart" style={linkStyle}>Cart</Link>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
    </nav>
  );
};

export default Navbar;
