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
} from '@mui/material';

export default function Capacity() {
  const [capacity, setCapacity] = useState('');
  const [capacities, setCapacities] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentEditCapacity, setCurrentEditCapacity] = useState('');

  // Fetch all capacities
  const fetchCapacities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/capacity/fetch');
      setCapacities(response.data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
    }
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  // Add new capacity
  const handleAddCapacity = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/capacity/addnew', { capacity });
      setCapacity('');
      setOpen(false);
      fetchCapacities();
    } catch (err) {
      console.error('Error adding capacity:', err);
    }
  };

  // Delete capacity
  const handleDelete = async (id_capacity) => {
    try {
      await axios.delete(`http://localhost:5000/api/capacity/delete/${id_capacity}`);
      fetchCapacities();
    } catch (err) {
      console.error('Error deleting capacity:', err);
    }
  };

  // Open edit dialog
  const handleEdit = (id_capacity, capacity) => {
    setEditId(id_capacity);
    setCurrentEditCapacity(capacity);
    setEditOpen(true);
  };

  // Update capacity
  const handleUpdateCapacity = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/capacity/edit/${editId}`, {
        capacity: currentEditCapacity,
      });
      setEditId(null);
      setCurrentEditCapacity('');
      setEditOpen(false);
      fetchCapacities();
    } catch (err) {
      console.error('Error updating capacity:', err);
    }
  };

  return (
    <Box sx={{ p: 1, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Capacities
      </Typography>

      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Capacity
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Capacity</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {capacities.map((item) => (
              <TableRow key={item.id_capacity}>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.created_at ? new Date(item.created_at).toLocaleString() : 'N/A'}</TableCell>
                <TableCell align="right">
                  <Button color="primary" onClick={() => handleEdit(item.id_capacity, item.capacity)}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(item.id_capacity)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Capacity Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Capacity</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddCapacity} sx={{ mt: 2 }}>
            <TextField
              label="Capacity"
              variant="outlined"
              fullWidth
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Add</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Capacity Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Capacity</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdateCapacity} sx={{ mt: 2 }}>
            <TextField
              label="Capacity"
              variant="outlined"
              fullWidth
              required
              value={currentEditCapacity}
              onChange={(e) => setCurrentEditCapacity(e.target.value)}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
