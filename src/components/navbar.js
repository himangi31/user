// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled, keyframes } from "@mui/system";

// ------------------------
// Animation Keyframes
// ------------------------
const slideFadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ------------------------
// Styled Components
// ------------------------
const AnimatedBox = styled(Box)`
  animation: ${slideFadeDown} 0.8s ease forwards;
`;

const NavLinkButton = styled(Button)(({ active }) => ({
  color: "white",
  textTransform: "uppercase",
  fontWeight: 500,
  borderBottom: active ? "2px solid #00ccff" : "2px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#00ccff",
    background: "rgba(255,255,255,0.05)",
    transform: "scale(1.05)",
  },
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    { label: "Home", path: "/homescreen" },
    { label: "Products", path: "/productview" },
    { label: "Company", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        backgroundColor: "#121212a2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                color: "white",
                textAlign: "center",
                "&.Mui-selected": {
                  backgroundColor: "#222",
                },
              }}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(to right, #00ff00ff, #0099ff)",
              color: "#fff",
              mt: 2,
              "&:hover": {
                boxShadow: "0 0 10px #00ffcc",
              },
            }}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          height:"70px",
          backgroundColor: "rgba(14, 15, 14, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "0.4s",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: 1,
          }}
        >
          {/* Logo Section */}
          <AnimatedBox sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src=""
              alt="Logo"
              sx={{
                width: { xs: 40, sm: 60 },
                height: "auto",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              Best Power Equipments
            </Typography>
          </AnimatedBox>

          {/* Desktop Nav */}
          {!isMobile ? (
            <AnimatedBox sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map((item) => (
                <NavLinkButton
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  active={location.pathname === item.path ? 1 : 0}
                >
                  {item.label}
                </NavLinkButton>
              ))}
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #00ffcc, #0099ff)",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    boxShadow: "0 0 12px #00ccff",
                    transform: "scale(1.05)",
                  },
                  transition: "0.3s ease",
                }}
              >
                Register
              </Button>
            </AnimatedBox>
          ) : (
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}
