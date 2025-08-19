import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProductForm() {
  const [product_name, setProductName] = useState('');
  const [product_price, setProductPrice] = useState('');
  const [product_category, setProductCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [brochure, setBrochure] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('product_price', product_price);
    formData.append('product_category', product_category);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('brochure', brochure);

    try {
      const res = await axios.post('http://localhost:5000/api/products/', formData);
      alert('✅ Product submitted successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Failed to submit product.');
    }
  };

  return (
    
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '80%',
          maxWidth: 500,
          bgcolor: '#fff',
          boxShadow: 5,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add Product
        </Typography>

        <Stack spacing={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="product_name">Product Name</InputLabel>
            <Input
              id="product_name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="product_price">Price</InputLabel>
            <Input
              id="product_price"
              value={product_price}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="product_category">Category</InputLabel>
            <Input
              id="product_category"
              value={product_category}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </FormControl>

          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Upload Brochure
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setBrochure(e.target.files[0])}
            />
          </Button>

          
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            type="submit"
            sx={{ fontSize: '16px', py: 1.5 }}
            
          >

            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
    
  );
}