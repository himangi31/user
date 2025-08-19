import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Home,
  AddBox,
  ListAlt,
  Logout,
  DarkMode,
  LightMode,
  Dashboard
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <Dashboard />, to: '/Homes' },
  { label: 'Add Product', icon: <AddBox />, to: '/ProductForm' },
  { label: 'Product List', icon: <ListAlt />, to: '/ProductList' }
];

const Homes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("📦 Sending token:", token);

  axios.get("http://localhost:5000/api/homes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => console.log("🏠 Home response:", res.data))
    .catch((err) => console.error("Unauthorized", err));
}, []);



  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Theme toggle
  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.style.background = darkMode ? '#fff' : '#121212';
  };

  const iconColor = darkMode ? '#000' : '#fff';
  const bgColor = darkMode ? '#fff' : '#2C2C2C';
  const textColor = darkMode ? '#000' : '#fff';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: bgColor,
          color: textColor,
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          🛒 Admin
        </Typography>
      </Toolbar>
      <Divider />
           {data && (
  <Box sx={{ p: 2 }}>
    <Typography variant="subtitle1">{data}</Typography>
  </Box>
)}

      <List>
        {navItems.map(({ label, icon, to }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              selected={location.pathname === to}
              sx={{
                transition: 'background 0.3s',
                '&:hover': {
                  backgroundColor: darkMode ? '#f0f0f0' : '#3d3d3d'
                },
              }}
            >
              <Tooltip title={label} placement="right">
                <ListItemIcon sx={{ color: iconColor }}>{icon}</ListItemIcon>
              </Tooltip>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <DarkMode sx={{ color: iconColor }} />
          <Switch checked={darkMode} onChange={toggleMode} />
          <LightMode sx={{ color: iconColor }} />
        </Box>

        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: iconColor }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Homes;
