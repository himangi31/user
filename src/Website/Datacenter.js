import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

export default function HeroSection() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/B1.gif"})`, // 👈 अपनी background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "600px",
            padding: "40px",
            background: "rgba(12, 12, 12, 0.8)", // हल्का white transparent bg readability के लिए
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fdf8f8ff" }}
          >
            Data Center<br /> 
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#f8f5f5ff", marginBottom: "20px" }}
          >
           BPE’s ITCube Series is an all-in-one, modular, and energy-efficient data center solution designed for rapid deployment, flexible scalability, 
           and high operational efficiency—empowering businesses with next-generation data center management.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              borderRadius: "25px",
              padding: "10px 25px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#FFC300",
              },
            }}
          >
            Read More
          </Button>
        </Box>
      </Container>
    </div>
  );
}
