import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
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

export default function Voltage() {
  const [voltage, setVoltage] = useState('');
  const [voltages, setVoltages] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentEditVoltage, setCurrentEditVoltage] = useState('');

  // Fetch all voltages
  const fetchVoltages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/voltage/fetch');
      setVoltages(response.data);
    } catch (error) {
      console.error('Error fetching voltages:', error);
    }
  };

  useEffect(() => {
    fetchVoltages();
  }, []);

  // Add new voltage
  const handleAddVoltage = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/voltage/addnew', { voltage });
      alert('✅ Voltage added successfully!');
      setVoltage('');
      setOpen(false);
      fetchVoltages();
    } catch (err) {
      console.error('Error adding voltage:', err);
      alert('Failed to add voltage.');
    }
  };

  // Open edit dialog
  const handleEdit = (id_voltage, voltage) => {
    setEditId(id_voltage);
    setCurrentEditVoltage(voltage);
    setEditOpen(true);
  };

  // Update voltage
  const handleUpdateVoltage = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/voltage/edit/${editId}`, {
        voltage: currentEditVoltage,
      });
      alert('✅ Voltage updated successfully!');
      setEditId(null);
      setCurrentEditVoltage('');
      setEditOpen(false);
      fetchVoltages();
    } catch (err) {
      console.error('Error updating voltage:', err);
      alert('Failed to update voltage.');
    }
  };

  // Delete voltage
  const handleDelete = async (id_voltage) => {
    try {
      await axios.delete(`http://localhost:5000/api/voltage/delete/${id_voltage}`);
      alert('✅ Voltage deleted successfully!');
      fetchVoltages();
    } catch (error) {
      console.error('Error deleting voltage:', error);
      alert('Failed to delete voltage.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Manage Voltages
      </Typography>

      {/* Add Voltage Button */}
      <Box textAlign="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add New Voltage
        </Button>
      </Box>

      {/* Voltages Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Voltage</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voltages.map((item) => (
              <TableRow key={item.id_voltage}>
                <TableCell>{item.voltage}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(item.id_voltage, item.voltage)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id_voltage)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Voltage</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddVoltage} sx={{ mt: 2 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="voltage">Voltage</InputLabel>
              <Input
                id="voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                required
              />
            </FormControl>
            <DialogActions sx={{ mt: 3 }}>
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
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Voltage</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdateVoltage} sx={{ mt: 2 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="edit-voltage">Voltage</InputLabel>
              <Input
                id="edit-voltage"
                value={currentEditVoltage}
                onChange={(e) => setCurrentEditVoltage(e.target.value)}
                required
              />
            </FormControl>
            <DialogActions sx={{ mt: 3 }}>
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
