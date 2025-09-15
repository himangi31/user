import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,DialogTitle,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
} from '@mui/material';

export default function Category() {
  
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentEditCategoryName, setCurrentEditCategoryName] = useState('');

  // Fetch all  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/fetch');
      setCategories(response.data);
    } catch (error) {
    console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/category/addnew', { category_name: categoryName });
      alert('✅ Category added successfully!');
      setCategoryName('');
      setOpen(false);
      fetchCategories(); // Refresh list
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Failed to add category.');
    }
  };

  // Delete category
  const handleDelete = async (id_category) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/category/delete/${id_category}`);
      console.log('Delete response:', res);
      alert('✅ Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.status, error.response.data);
        alert(`Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server.');
      } else {
        console.error('Request setup error:', error.message);
      }
    }
  };

  // Open edit dialog
  const handleEdit = (id_category, category_name) => {
    setEditId(id_category);
    setCurrentEditCategoryName(category_name);
    setEditOpen(true);
  };

  // Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/category/edit/${editId}`, {
        category_name: currentEditCategoryName,
      });
      alert('✅ Category updated successfully!');
      setEditId(null);
      setCurrentEditCategoryName('');
      setEditOpen(false);
      fetchCategories(); // Refresh list
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('Failed to update category.');
    }
  };

  return (
    <Box sx={{ p: 1}}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Categories
      </Typography>

      {/* Add Category Button */}

      <Box textAlign="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Category
        </Button>
      </Box>

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item.id_category}>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(item.id_category, item.category_name)}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(item.id_category)}>
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
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddCategory} sx={{ mt: 2 }}>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              helperText="Enter a descriptive category name"
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdateCategory} sx={{ mt: 2 }}>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              required
              value={currentEditCategoryName}
              onChange={(e) => setCurrentEditCategoryName(e.target.value)}
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
