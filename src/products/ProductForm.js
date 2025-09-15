import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box,Button,FormControl,InputLabel,TextField,Stack,Typography,MenuItem,Select,} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Visually hidden input for accessibility
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

// Keyframes for fade-in animation
const fadeInKeyframes = {
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

export default function ProductForm() {
  const [productList, setProductList] = useState([]);

  // Form States
  const [product_name, setProductName] = useState('');
  const [product_slug, setProductSlug] = useState('');
  const [category_slug, setCategorySlug] = useState('');
  const [subcategory_slug, setSubcategorySlug] = useState('');
  const [sub_subcategory_slug, setSubSubcategorySlug] = useState('');
  const [product_type, setProductType] = useState('');

  // FILE input for certificate (either PDF or image)
  const [certificate_file, setCertificateFile] = useState(null);

  // For product image (optional)
  const [product_image, setProductImage] = useState(null);

  const [voltage, setVoltage] = useState('');
  const [capacity, setCapacity] = useState('');
  const [short_description, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [technical_specification, setTechnicalSpecification] = useState('');
  const [features, setFeatures] = useState('');

  // Dropdown Data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [voltages, setVoltages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/category/fetch')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/capacity/fetch')
      .then(res => setCapacities(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/voltage/fetch')
      .then(res => setVoltages(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (category_slug) {
      axios.get(`http://localhost:5000/api/subcategory/bycategory/${category_slug}`)
        .then(res => setSubcategories(res.data))
        .catch(err => console.error(err));
    }
  }, [category_slug]);

  useEffect(() => {
    if (subcategory_slug) {
      axios.get(`http://localhost:5000/api/sub_subcategory/bysubcategory/${subcategory_slug}`)
        .then(res => setSubSubcategories(res.data))
        .catch(err => console.error(err));
    }
  }, [subcategory_slug]);

  // Auto-generate slug
  useEffect(() => {
    if (product_name && category_slug) {
      const category = categories.find(cat => cat.id_category === category_slug);
      const slug = `${category?.category_name || ''} ${product_name}`
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setProductSlug(slug);
    }
  }, [product_name, category_slug, categories]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product/fetch');
      setProductList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificate_file) {
      alert('Please upload a certificate file (image or PDF)');
      return;
    }

    const formData = new FormData();

    formData.append('product_name', product_name);
    formData.append('product_type', product_type);
    formData.append('pdf_certificate', certificate_file);  // required
    if (product_image) formData.append('product_image', product_image); // optional

    formData.append('voltage', voltage);
    formData.append('capacity', capacity);
    formData.append('features', features);
    formData.append('tech_description', technical_specification);
    formData.append('specification', description);
    formData.append('slug', product_slug);

    formData.append('category_id', category_slug);
    formData.append('subcategory_id', subcategory_slug);
    formData.append('sub_subcategory_id', sub_subcategory_slug);

    try {
      await axios.post('http://localhost:5000/api/product/addnew', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Product added successfully!');
      fetchProducts();

      // Reset form
      setProductName('');
      setProductSlug('');
      setCategorySlug('');
      setSubcategorySlug('');
      setSubSubcategorySlug('');
      setProductType('');
      setCertificateFile(null);
      setProductImage(null);
      setVoltage('');
      setCapacity('');
      setShortDescription('');
      setDescription('');
      setTechnicalSpecification('');
      setFeatures('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product.');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" gutterBottom align="center">Manage Products</Typography>

      {/* Product Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 800,
          mx: 'auto',
          bgcolor: '#fff',
          p: 4,
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          mb: 5,
          animation: 'fadeIn 0.5s ease-out',
          ...fadeInKeyframes,
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          },
        }}
      >
        <Stack spacing={2}>
          <TextField label="Product Name" value={product_name} onChange={e => setProductName(e.target.value)} required />
          <TextField
            label="Product Slug"
            value={product_slug}
            InputProps={{ readOnly: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category_slug} onChange={e => setCategorySlug(e.target.value)}>
              {categories.map(cat => (
                <MenuItem key={cat.id_category} value={cat.id_category}>{cat.category_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select value={subcategory_slug} onChange={e => setSubcategorySlug(e.target.value)}>
              {subcategories.map(sub => (
                <MenuItem key={sub.id_subcategory} value={sub.id_subcategory}>{sub.subcategory_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Sub-Subcategory</InputLabel>
            <Select value={sub_subcategory_slug} onChange={e => setSubSubcategorySlug(e.target.value)}>
              {subSubcategories.map(subsub => (
                <MenuItem key={subsub.id_sub_subcategory} value={subsub.id_sub_subcategory}>{subsub.sub_subcategory_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={product_type}
              onChange={e => setProductType(e.target.value)}
            >
              <MenuItem value="Domestic">Domestic</MenuItem>
              <MenuItem value="International">International</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Voltage</InputLabel>
            <Select value={voltage} onChange={e => setVoltage(e.target.value)}>
              {voltages.map(v => (
                <MenuItem key={v.id_voltage} value={v.voltage}>{v.voltage}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Capacity</InputLabel>
            <Select
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
            >
              {capacities.map(cap => (
                <MenuItem key={cap.id_capacity} value={cap.capacity}>{cap.capacity}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Upload certificate */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              textTransform: 'none',
            }}
          >
            Upload Certificate (Image or PDF)
            <VisuallyHiddenInput
              type="file"
              name="certificate_file"
              accept=".pdf,image/*"
              onChange={e => setCertificateFile(e.target.files[0])}
            />
          </Button>

          {/* Optional product image */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              textTransform: 'none',
            }}
          >
            Upload Product Image (optional)
            <VisuallyHiddenInput
              type="file"
              name="product_image"
              accept="image/*"
              onChange={e => setProductImage(e.target.files[0])}
            />
          </Button>

          <TextField
            label="Short Description"
            multiline
            rows={2}
            value={short_description}
            onChange={e => setShortDescription(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <TextField
            label="Technical Specification (Enter HTML)"
            multiline
            rows={6}
            value={technical_specification}
            onChange={e => setTechnicalSpecification(e.target.value)}
          />

          <Typography variant="h6" mt={2}>Preview:</Typography>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: 1,
              backgroundColor: '#f9f9f9',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: technical_specification }}
          />

          <TextField
            label="Features"
            multiline
            rows={3}
            value={features}
            onChange={e => setFeatures(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 20px rgba(0, 128, 0, 0.4)',
              },
            }}
          >
            Add Product
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
