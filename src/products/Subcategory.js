import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

export default function Subcategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  const [editId, setEditId] = useState(null);
  const [currentEditSubName, setCurrentEditSubName] = useState('');
  const [editSelectedCategory, setEditSelectedCategory] = useState('');

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category/fetch');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch all subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/subcategory/fetch');
      setSubcategories(res.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Add new subcategory
  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!subcategoryName || !selectedCategory) {
      alert('Please select category and enter subcategory name.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/subcategory/addnew', {
        subcategory_name: subcategoryName,
        category_id: selectedCategory
      });
      alert('✅ Subcategory added!');
      setSubcategoryName('');
      setSelectedCategory('');
      setOpen(false);
      fetchSubcategories();
    } catch (err) {
      console.error(err);
      alert('Failed to add subcategory.');
    }
  };

  // Delete subcategory
  const handleDelete = async (id_subcategory) => {
    try {
      await axios.delete(`http://localhost:5000/api/subcategory/delete/${id_subcategory}`);
      alert('✅ Subcategory deleted!');
      fetchSubcategories();
    } catch (err) {
      console.error(err);
      alert('Failed to delete subcategory.');
    }
  };

  // Open edit dialog
  const handleEdit = (sub) => {
    setEditId(sub.id_subcategory);
    setCurrentEditSubName(sub.subcategory_name);
    setEditSelectedCategory(sub.category_id);
    setEditOpen(true);
  };

  // Update subcategory
  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    if (!currentEditSubName || !editSelectedCategory) {
      alert('Please select category and enter subcategory name.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/subcategory/edit/${editId}`, {
        subcategory_name: currentEditSubName,
        category_id: editSelectedCategory
      });
      alert('✅ Subcategory updated!');
      setEditId(null);
      setCurrentEditSubName('');
      setEditSelectedCategory('');
      setEditOpen(false);
      fetchSubcategories();
    } catch (err) {
      console.error(err);
      alert('Failed to update subcategory.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Subcategories
      </Typography>

      {/* Add Subcategory Button */}
      <Box textAlign="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add New Subcategory
        </Button>
      </Box>

      {/* Subcategories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subcategory Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories.map((sub) => (
              <TableRow key={sub.id_subcategory}>
                <TableCell>{sub.subcategory_name}</TableCell>
                <TableCell>{sub.category_name}</TableCell>
                <TableCell>{sub.slug}</TableCell>
                <TableCell>{new Date(sub.created_at).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(sub)}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(sub.id_subcategory)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Subcategory</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddSubcategory} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id_category} value={cat.id_category}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Subcategory Name"
              variant="outlined"
              fullWidth
              required
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Subcategory</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdateSubcategory} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={editSelectedCategory}
                onChange={(e) => setEditSelectedCategory(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id_category} value={cat.id_category}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Subcategory Name"
              variant="outlined"
              fullWidth
              required
              value={currentEditSubName}
              onChange={(e) => setCurrentEditSubName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setEditOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
