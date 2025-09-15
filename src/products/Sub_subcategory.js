import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography,Dialog, DialogActions,DialogContent, 
 DialogTitle,Table,TableBody,TableCell,TableContainer,TableHead, TableRow,
 Paper,MenuItem,Select,FormControl,InputLabel} from '@mui/material';


 export default function SubSubcategory() { 
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subSubName, setSubSubName] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editSubSubName, setEditSubSubName] = useState('');
  const [editSelectedCategory, setEditSelectedCategory] = useState('');
  const [editSelectedSubcategory, setEditSelectedSubcategory] = useState('');

  
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category/fetch');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/subcategory/bycategory/${categoryId}`);
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
 const fetchSubSubcategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sub_subcategory/fetch');
      setSubSubcategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubSubcategories();
  }, []);

  // When category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAdd = async (e) => {
  e.preventDefault();
  console.log('Submitting:', { subSubName, selectedCategory, selectedSubcategory });
  try {
    const res = await axios.post('http://localhost:5000/api/sub_subcategory/addnew', {
      sub_subcategory_name: subSubName,
      subcategory_id: selectedSubcategory
    });
    console.log('Response:', res.data);
    alert('✅ Sub-Subcategory added!');
  } catch (err) {
    console.error('Add Error:', err.response ? err.response.data : err);
    alert('Failed to add sub-subcategory.');
  }
};


 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sub_subcategory/delete/${id}`);
      alert('✅ Deleted!');
      fetchSubSubcategories();
    } catch (err) {
      console.error(err);
      alert('Failed to delete.');
    }
  };

  // Open 
  const handleEdit = (subsub) => {
    setEditId(subsub.id_sub_subcategory);
    setEditSubSubName(subsub.sub_subcategory_name);
    setEditSelectedSubcategory(subsub.subcategory_id);
    
    const cat = subcategories.find(sc => sc.id_subcategory === subsub.subcategory_id);
    setEditSelectedCategory(cat ? cat.category_id : '');
    setEditOpen(true);
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editSubSubName || !editSelectedCategory || !editSelectedSubcategory) {
      alert('Please select category, subcategory and enter name.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/sub_subcategory/edit/${editId}`, {
        sub_subcategory_name: editSubSubName,
        subcategory_id: editSelectedSubcategory
      });
      alert('✅ Updated!');
      setEditOpen(false);
      setEditId(null);
      setEditSubSubName('');
      setEditSelectedCategory('');
      setEditSelectedSubcategory('');
      fetchSubSubcategories();
    } catch (err) {
      console.error(err);
      alert('Failed to update.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Sub-Subcategories
      </Typography>
      <Box textAlign="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
       Add New Sub-Subcategory
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subSubcategories.map((ssc) => (
              <TableRow key={ssc.id_sub_subcategory}>
                <TableCell>{ssc.sub_subcategory_name}</TableCell>
                <TableCell>{ssc.subcategory_name}</TableCell>
                <TableCell>{ssc.slug}</TableCell>
                <TableCell>{new Date(ssc.created_at).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="warning" sx={{ mr:1 }} onClick={() => handleEdit(ssc)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(ssc.id_sub_subcategory)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Sub-Subcategory</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAdd} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                {categories.map(cat => (
                  <MenuItem key={cat.id_category} value={cat.id_category}>{cat.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Subcategory</InputLabel>
              <Select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} required>
                {subcategories.map(sc => (
                  <MenuItem key={sc.id_subcategory} value={sc.id_subcategory}>{sc.subcategory_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Sub-Subcategory Name"
              variant="outlined"
              fullWidth
              required
              value={subSubName}
              onChange={(e) => setSubSubName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Add</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Sub-Subcategory</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select value={editSelectedCategory} onChange={(e) => setEditSelectedCategory(e.target.value)} required>
                {categories.map(cat => (
                  <MenuItem key={cat.id_category} value={cat.id_category}>{cat.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Subcategory</InputLabel>
              <Select value={editSelectedSubcategory} onChange={(e) => setEditSelectedSubcategory(e.target.value)} required>
                {subcategories.map(sc => (
                  <MenuItem key={sc.id_subcategory} value={sc.id_subcategory}>{sc.subcategory_name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Sub-Subcategory Name"
              variant="outlined"
              fullWidth
              required
              value={editSubSubName}
              onChange={(e) => setEditSubSubName(e.target.value)}
              sx={{ mb: 3 }}
            />
             <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setEditOpen(false)} color="error">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Update</Button>
             </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
