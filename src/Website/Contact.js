// src/pages/ContactSales.js

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  queryType: "",
  message: "",
};

const queryOptions = [
  "Product Inquiry",
  "Pricing",
  "Technical Support",
  "Partnership",
  "Other",
];

const Contact = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for reaching out! Our sales team will contact you soon.");
    setFormData(initialState);
  };

  return (

    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Contact Sales
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Fill out the form below and our sales team will be in touch.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Column 1 */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Column 1 */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Company Name"
                value={formData.company}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Full Width Dropdown */}
            <Grid item xs={12}>
              <TextField
                select
                name="queryType"
                label="Query Type"
                value={formData.queryType}
                onChange={handleChange}
                fullWidth
                required
              >
                {queryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Full Width Message */}
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Describe Your Query"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={5}
                fullWidth
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(to right, #0072ff, #00c6ff)",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "8px",
                  "&:hover": {
                    boxShadow: "0 0 12px rgba(0, 114, 255, 0.6)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
