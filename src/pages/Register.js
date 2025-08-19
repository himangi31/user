import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Alert
} from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
            console.log("📤 Submitting registration:", form);
    try {
    const res = await axios.post('http://localhost:5000/api/register', form);

      setSuccess(res.data.message || 'Registered successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setSuccess('');
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: 55, mt: 18 , alignContent:'center', alignItems:'c'}}>
      <Typography variant="h5" gutterBottom>Admin Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField
        label="Email"
        name="email"
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
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Paper>
  );
};

export default Register;
