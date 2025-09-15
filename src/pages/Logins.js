import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function Logins({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login/alogin",
        { email: email.trim(), password: password.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.message === "Login successful") {
        if (onLogin) onLogin();
        navigate("/homes");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Invalid email or password");
      } else {
        setError("Network or server error");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Left side */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #2ecc71, #f1c40f)", // green-yellow gradient
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to <br /> <span style={{ fontWeight: "900" }}>website</span>
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat volutpat.
        </Typography>

        {/* Decorative shapes - you can add these if you want by absolutely positioned divs */}
      </Box>

      {/* Right side */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#555",
            mb: 4,
            fontWeight: "bold",
          }}
        >
          User Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="User Name"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1, color: "#888" }} />,
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: "#888" }} />,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Remember Me"
            />
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 4,
              background:
                "linear-gradient(90deg, #2ecc71 0%, #f1c40f 100%)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              borderRadius: 3,
              "&:hover": {
                background:
                  "linear-gradient(90deg, #27ae60 0%, #f39c12 100%)",
              },
            }}
          >
            Login
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box textAlign="center" mt={3} color="#555">
            <Typography variant="body2">Don't have an account?</Typography>
            <Button
              onClick={() => navigate("/Register")}
              variant="text"
              sx={{ mt: 1 }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Logins;
