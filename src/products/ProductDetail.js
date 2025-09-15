import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {Container,Typography,Box,Card,CardMedia,Button,CircularProgress, Collapse} from "@mui/material";
import axios from "axios";




export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [openSpecs, setOpenSpecs] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);

        const similarRes = await axios.get(
          `http://localhost:5000/api/products?category=${res.data.category_id}`
        );
        setSimilarProducts(similarRes.data.filter(p => p.id !== res.data.id));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        minHeight: "100vh",
        py: 1
      }}
    >
      <Container>
        <Button
          component={Link}
          to="/productview"
          variant="outlined"
          sx={{ mb: 4 }}
        >
          ⬅ Back to Products
        </Button>

        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: 6,
            p: { xs: 2, md: 4 },
            mb: 5
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4
            }}
          >
            <CardMedia
              component="img"
              height="350"
              image={
                product.product_image
                  ? `http://localhost:5000/uploads/images/${product.product_image}`
                  : "/placeholder.jpg"
              }
              alt={product.product_name}
              sx={{
                objectFit: "contain",
                flex: 1,
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" }
              }}
            />

      
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {product.product_name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Voltage:</strong> {product.voltage || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Capacity:</strong> {product.capacity || "N/A"}
              </Typography>
              <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                  {product.features
                    ? product.features.split(/,|\n/).map((feature, i) => (
                        <li key={i}>{feature.trim()}</li>
                      ))
                    : "N/A"}
                </Box>
            

            </Box>
          </Box>

          {/* Toggle Buttons */}
          <Box mt={4}>
            {/* Features */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenFeatures(!openFeatures)}
              sx={{
                mb: 2,
                textTransform: "none",
                background: openFeatures
                  ? "linear-gradient(90deg, #32CD32, #FFD700)"
                  : "linear-gradient(90deg, #FFD700, #32CD32)",
                color: "#000",
                fontWeight: "bold"
              }}
            >
              {openFeatures ? "Hide Features" : "Show Features"}
            </Button>
            <Collapse in={openFeatures}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#f9f9f9",
                  mb: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                  {product.features
                    ? product.features.split(/,|\n/).map((feature, i) => (
                        <li key={i}>{feature.trim()}</li>
                      ))
                    : "N/A"}
                </Box>
              </Box>
            </Collapse>

            {/* Technical Description */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenDesc(!openDesc)}
              sx={{
                mb: 2,
                textTransform: "none",
                background: openDesc
                  ? "linear-gradient(90deg, #32CD32, #FFD700)"
                  : "linear-gradient(90deg, #FFD700, #32CD32)",
                color: "#000",
                fontWeight: "bold"
              }}
            >
              {openDesc ? "Hide Technical Description" : "Show Technical Description"}
            </Button>
            <Collapse in={openDesc}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#f9f9f9",
                  mb: 2
                }}
              >
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: product.tech_description || "N/A"
                  }}
                  sx={{ fontSize: "0.9rem" }}
                />
              </Box>
            </Collapse>

            {/* Specification */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenSpecs(!openSpecs)}
              sx={{
                mb: 2,
                textTransform: "none",
                background: openSpecs
                  ? "linear-gradient(90deg, #32CD32, #FFD700)"
                  : "linear-gradient(90deg, #FFD700, #32CD32)",
                color: "#000",
                fontWeight: "bold"
              }}
            >
              {openSpecs ? "Hide Specification" : "Show Specification"}
            </Button>
            <Collapse in={openSpecs}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#f9f9f9"
                }}
              >
                <Typography variant="body1">
                  {product.specification || "N/A"}
                </Typography>
              </Box>
            </Collapse>
          </Box>

          {/* PDF Button */}
          
          {product.pdf_certificate && (
  <Box display="flex" justifyContent="center" mt={4}>
    <Button
      variant="contained"
      sx={{
        px: 4,
        py: 1.5,
        background: "linear-gradient(90deg, #FFD700, #32CD32)",
        color: "#000",
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
          background: "linear-gradient(90deg, #32CD32, #FFD700)"
        }
      }}
      component="a"
      href={`http://localhost:5000/uploads/pdfs/${product.pdf_certificate}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Technical Specification PDF
    </Button>
  </Box>
)}

        </Card>
      </Container>
    </Box>
  );
}
