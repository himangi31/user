import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const API_BASE = "http://localhost:5000";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTech, setSelectedTech] = useState("");

  // State for edit functionality
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [techDialogOpen, setTechDialogOpen] = useState(false); // Separate dialog for tech_description
  const [editData, setEditData] = useState({
    id_product: "",
    product_name: "",
    voltage: "",
    capacity: "",
    tech_description: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/product/fetch`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/api/product/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open technical description viewer
  const handleOpenTech = (techHTML) => {
    setSelectedTech(techHTML);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTech("");
  };

  /** ================== EDIT LOGIC ================== */
  const handleEditOpen = (product) => {
    setEditData({
      id_product: product.id_product,
      product_name: product.product_name || "",
      voltage: product.voltage || "",
      capacity: product.capacity || "",
      tech_description: product.tech_description || "",
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditData({
      id_product: "",
      product_name: "",
      voltage: "",
      capacity: "",
      tech_description: "",
    });
  };

  // Handle form input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated product data
  const handleEditSubmit = async () => {
    try {
      await axios.put(`${API_BASE}/api/product/update/${editData.id_product}`, {
        product_name: editData.product_name,
        voltage: editData.voltage,
        capacity: editData.capacity,
        tech_description: editData.tech_description,
      });
      alert("Product updated successfully!");
      fetchProducts();
      handleEditClose();
      setTechDialogOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <Box sx={{ p: 0, width: "100%", overflowX: "hidden" }}>
      <Typography variant="h4" gutterBottom align="center">
        📋 Product List
      </Typography>

      {/* Product Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="product table" size="small">
          <TableHead sx={{ bgcolor: "#eee" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Volt</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Catalogue</TableCell>
              <TableCell>Tech Spec</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((prod, index) => (
              <TableRow key={prod.id_product}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prod.product_name}
                </TableCell>

                <TableCell>
                  {prod.product_image ? (
                    <img
                      src={`${API_BASE}/uploads/images/${prod.product_image}`}
                      alt={prod.product_name}
                      style={{
                        width: 50,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{prod.voltage || "N/A"}</TableCell>
                <TableCell>{prod.capacity || "N/A"}</TableCell>
                <TableCell>
                  {prod.pdf_certificate ? (
                    <Button
                      href={`${API_BASE}/uploads/pdfs/${prod.pdf_certificate}`}
                      target="_blank"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", px: 1 }}
                    >
                      View
                    </Button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleOpenTech(prod.tech_description)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Edit Button */}
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditOpen(prod)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  {/* Delete Button */}
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(prod.id_product)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Technical Spec Viewer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Technical Specification</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              p: 2,
              background: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: 1,
              overflowX: "auto",
              maxHeight: "70vh",
            }}
            dangerouslySetInnerHTML={{ __html: selectedTech }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Product Name"
              name="product_name"
              value={editData.product_name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Voltage"
              name="voltage"
              value={editData.voltage}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Capacity"
              name="capacity"
              value={editData.capacity}
              onChange={handleEditChange}
              fullWidth
            />

            {/* Button to edit tech_description in a larger dialog */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setTechDialogOpen(true)}
            >
              Edit Technical Description
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Large Tech Description Dialog */}
      <Dialog
        open={techDialogOpen}
        onClose={() => setTechDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Edit Technical Description</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="row" gap={3}>
            {/* Left side: Editor */}
            <Box flex={1}>
              <TextField
                label="Technical Description (HTML)"
                name="tech_description"
                value={editData.tech_description}
                onChange={handleEditChange}
                fullWidth
                multiline
                rows={18}
                sx={{ fontFamily: "monospace" }}
              />
            </Box>

            {/* Divider */}
            <Divider orientation="vertical" flexItem />

            {/* Right side: Live Preview */}
            <Box
              flex={1}
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                overflow: "auto",
                maxHeight: "70vh",
                background: "#fafafa",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Live Preview
              </Typography>
              <Box
                dangerouslySetInnerHTML={{ __html: editData.tech_description }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTechDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
