import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Switch, Toolbar, Typography, Divider
} from '@mui/material';
import { Dashboard, AddBox, ListAlt, Logout, DarkMode, LightMode } from '@mui/icons-material';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

// Correct relative paths for nested routes
const navItems = [
  { label: 'Dashboard', icon: <Dashboard />, to: 'dashboard' },
  { label: 'Product List', icon: <ListAlt />, to: 'productlist' },
  { label: 'Add Product', icon: <AddBox />, to: 'productform' },
  { label: 'Capacity', icon: <AddBox />, to: 'capacity' },
  { label: 'Voltage', icon: <AddBox />, to: 'voltage' },
  { label: 'Category', icon: <AddBox />, to: 'category' },
  { label: 'Sub-Category', icon: <AddBox />, to: 'subcategory' },
  { label: 'Sub-SubCategory', icon: <AddBox />, to: 'sub_subcategory' },
];

const Homes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.style.background = darkMode ? '#fff' : '#121212';
  };

  const iconColor = darkMode ? '#cbd5e1' : '#fff';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: iconColor,
            background: darkMode
              ? 'linear-gradient(135deg, #2a2f4a 0%, #3a405a 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>🛒 Admin</Typography>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <List sx={{ flexGrow: 1 }}>
          {navItems.map(({ label, icon, to }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={Link}
                to={to}  // Relative path
                selected={location.pathname.endsWith(to)}
                sx={{
                  color: iconColor,
                  '&.Mui-selected, &:hover': {
                    background: darkMode
                      ? 'linear-gradient(90deg, #4c5c91 0%, #354a78 100%)'
                      : 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
                    borderRadius: 2,
                  },
                }}
              >
                <ListItemIcon sx={{ color: iconColor }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <DarkMode sx={{ color: iconColor }} />
            <Switch checked={darkMode} onChange={toggleMode} color="default" />
            <LightMode sx={{ color: iconColor }} />
          </Box>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{
              color: iconColor,
              '&:hover': { backgroundColor: darkMode ? '#444b6e' : '#fce4ec', borderRadius: 2 }
            }}>
              <ListItemIcon sx={{ color: iconColor }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: darkMode ? '#1e213a' : '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet /> {/* Nested pages render here */}
      </Box>
    </Box>
  );
};

export default Homes;
