import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = 'http://localhost:5000/uploads/'; // ✅ CHANGE BASED ON YOUR BACKEND

export default function ProductList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/productget')
      .then(res => setRows(res.data))
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setRows(prev => prev.filter(row => row.product_id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const handleEditSave = () => {
    const formData = new FormData();
    formData.append('product_name', editRow.product_name);
    formData.append('product_price', editRow.product_price);
    formData.append('product_category', editRow.product_category);
    formData.append('description', editRow.description);
    if (imageFile) formData.append('image', imageFile);
    if (brochureFile) formData.append('brochure', brochureFile);

    axios.put(`http://localhost:5000/api/products/${editRow.product_id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        fetchProducts();
        setEditRow(null);
        setImageFile(null);
        setBrochureFile(null);
      })
      .catch(err => console.error('Edit error:', err));
  };

  const handlePreview = (type, filename) => {
    if (!filename) return;
    setPreviewType(type);
    setPreviewSrc(`${BASE_URL}${filename}`);
    setPreviewOpen(true);
  };

  const columns = [
    { field: 'product_id', headerName: 'ID', width: 70 },
    { field: 'product_name', headerName: 'Name', width: 130 },
    { field: 'product_price', headerName: 'Price', width: 100 },
    { field: 'product_category', headerName: 'Category', width: 120 },
    { field: 'description', headerName: 'Description', width: 180 },
    {
      field: 'brochure', headerName: 'Brochure', width: 130,
      renderCell: (params) => (
        <Button
          size="small"
          variant="text"
          onClick={() => handlePreview('brochure', params.value)}
        >
          View
        </Button>
      )
    },
    {
      field: 'image', headerName: 'Image', width: 130,
      renderCell: (params) => (
        <img
          src={`${BASE_URL}${params.value}`} // ✅ FULL PATH
          alt="product"
          style={{ width: 50, height: 50, cursor: 'pointer', objectFit: 'cover' }}
          onClick={() => handlePreview('image', params.value)}
        />
      )
    },
    {
      field: 'actions', headerName: 'Actions', width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => setEditRow(params.row)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.product_id)}><DeleteIcon /></IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Paper sx={{ height: 550, width: '100%', boxShadow: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.product_id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          loading={loading}
          sx={{ border: 0 }}
        />

        {editRow && (
          <Dialog open onClose={() => setEditRow(null)} fullWidth>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={editRow.product_name}
                onChange={(e) => setEditRow({ ...editRow, product_name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Price"
                fullWidth
                value={editRow.product_price}
                onChange={(e) => setEditRow({ ...editRow, product_price: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                value={editRow.product_category}
                onChange={(e) => setEditRow({ ...editRow, product_category: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={editRow.description}
                onChange={(e) => setEditRow({ ...editRow, description: e.target.value })}
              />

              <Typography variant="body2" sx={{ mt: 2 }}>Change Image:</Typography>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

              <Typography variant="body2" sx={{ mt: 2 }}>Change Brochure:</Typography>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setBrochureFile(e.target.files[0])} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditRow(null)}>Cancel</Button>
              <Button variant="contained" onClick={handleEditSave}>Save</Button>
            </DialogActions>
          </Dialog>
        )}
      </Paper>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent dividers>
          {previewType === 'image' ? (
            <img src={previewSrc} alt="Preview" style={{ width: '100%' }} />
          ) : (
            <iframe
              src={previewSrc}
              title="Brochure Preview"
              width="100%"
              height="500px"
              style={{ border: 'none' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
