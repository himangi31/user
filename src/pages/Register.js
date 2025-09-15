import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
    // Add your login logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Left Gradient Panel */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(to right, #6a11cb, #e100ff)",
          color: "#fff",
          px: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography variant="h3" fontWeight="600" gutterBottom>
          Welcome to website
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, fontSize: 18, maxWidth: 450 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </Typography>
        {/* Decorative overlay shape */}
        <Box
          component="div"
          sx={{
            position: "absolute",
            bottom: -40,
            right: -80,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent)",
            transform: "rotate(45deg)",
          }}
        />
      </Box>

      {/* Right Login Form */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Paper elevation={4} sx={{ width: "100%", maxWidth: 400, p: 4, borderRadius: 2 }}>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ mb: 3, color: "#555", fontWeight: 600, letterSpacing: 1.5 }}
          >
            USER LOGIN
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <FormControlLabel
                control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} />}
                label="Remember me"
              />
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                background: "linear-gradient(to right, #6a11cb, #e100ff)",
                color: "#fff",
                fontWeight: "bold",
                py: 1.4,
                letterSpacing: 2,
                borderRadius: 30,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  background: "linear-gradient(to right, #5d0ecc, #cc00cc)",
                },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
