import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import CategoryIcon from "@mui/icons-material/Category";
import Navbar from "../components/Navbar";


export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/fetch");
        setProducts(res.data);

        const uniqueCategories = [
          ...new Set(res.data.map((p) => p.category_name)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "" || p.category_name === selectedCategory
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
   <> 
   <Navbar/>
    <Box
      sx={{
        display: "flex",
        py: 5,
        px: { xs: 2, md: 5 },
        background: "linear-gradient(135deg, #67dd06bd, #f8f8f6ff)",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "0", md: 240 },
          flexShrink: 0,
          position: { xs: "relative", md: "sticky" },
          top: { md: 100 },
          mr: { md: 4 },
          display: { xs: "none", md: "block" },
          p: 3,
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "linear-gradient(90deg,#0c08da,#32CD32)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <CategoryIcon fontSize="small" /> Categories
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedCategory === ""}
              onClick={() => setSelectedCategory("")}
              sx={{
                borderRadius: "12px",
                mb: 1,
                transition: "0.3s",
                "&.Mui-selected": {
                  background:
                    "linear-gradient(90deg, rgba(12,8,218,0.12), rgba(50,205,50,0.12))",
                  fontWeight: "bold",
                },
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(12,8,218,0.08), rgba(50,205,50,0.08))",
                },
              }}
            >
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
          {categories.map((cat) => (
            <ListItem key={cat} disablePadding>
              <ListItemButton
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  transition: "0.3s",
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(90deg, rgba(12,8,218,0.12), rgba(50,205,50,0.12))",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(12,8,218,0.08), rgba(50,205,50,0.08))",
                  },
                }}
              >
                <ListItemText primary={cat} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id_product} xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                component={Link}
                to={`/productdetail/${product.id_product}`}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: "360px",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(6px)",
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.1), inset 0 0 10px rgba(50,205,50,0.15)",
                  transition: "0.4s",
                  "&:hover": {
                    boxShadow:
                      "0 10px 35px rgba(0,0,0,0.2), inset 0 0 15px rgba(12,8,218,0.15)",
                  },
                }}
              >
                {/* Category Badge */}
                <Chip
                  label={product.category_name}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "linear-gradient(90deg,#0c08da,#32CD32)",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                />

                <CardMedia
                  component="img"
                  height="190"
                  image={
                    product.product_image
                      ? `http://localhost:5000/uploads/images/${product.product_image}`
                      : "/placeholder.jpg"
                  }
                  alt={product.product_name}
                  sx={{
                    objectFit: "contain",
                    p: 2,
                    background: "#fff",
                  }}
                />
                <CardContent
                  sx={{ flexGrow: 1, textAlign: "center", px: 2 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      background: "linear-gradient(90deg,#0c08da,#32CD32)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {product.product_name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      flexWrap: "wrap",
                      mt: 1,
                    }}
                  >
                    <Chip
                      label={`Voltage: ${product.voltage || "N/A"}`}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: "0.75rem" }}
                    />
                    <Chip
                      label={`Capacity: ${product.capacity || "N/A"}`}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
}

