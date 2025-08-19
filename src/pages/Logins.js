import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert
} from "@mui/material";

function Logins({ onLogin }) {
   console.log("✅ Logins component loaded!");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); // Clear any previous error

  try {
    const res = await axios.post("http://localhost:5000/api/login", 
  { email, password },
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }
)
    ;

    console.log("✅ Login response:", res.data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
          onLogin(); 
      // ✅ Use navigate instead of full reload
      navigate("/homes");
    } else {
      setError("Login failed: No token received");
    }
  } catch (err) {
  console.error("❌ Login failed:", err);
  if (err.response) {
    console.error("🧾 Server Response:", err.response.status, err.response.data);
  } else {
    console.error("🚨 Network or CORS error:", err.message);
  }
}
};




  return (
    
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 12 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box textAlign="center" mt={3}>
          <Typography>Don't have an account?</Typography>
          <Button
            onClick={() => navigate("/Register")}
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Logins;
