import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import axios from 'axios';

const animatedShadow = {
  animation: 'shadowPulse 3s infinite',
  boxShadow: '0 0 5px 2px rgba(63, 81, 181, 0.7)', // fallback shadow
};

export default function Dashboard() {
  const theme = useTheme(); // get current theme
  const isDarkMode = theme.palette.mode === 'dark'; // check if dark mode

  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const productsRes = await axios.get('http://localhost:5000/api/product/count');
        const categoriesRes = await axios.get('http://localhost:5000/api/category/count');
        setStats({
          productsCount: parseInt(productsRes.data.count, 10) || 0,
          categoriesCount: parseInt(categoriesRes.data.count, 10) || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    }

    async function fetchRecentProducts() {
      try {
        const res = await axios.get('http://localhost:5000/api/product/recent');
        setRecentProducts(res.data);
      } catch (err) {
        console.error('Error fetching recent products:', err);
      }
    }

    fetchStats();
    fetchRecentProducts();
  }, []);

  return (
    <>
      {/* CSS Keyframes inside style tag */}
      <style>{`
        @keyframes shadowPulse {
          0%, 50% {
            box-shadow:
              0 0 5px 2px #3f51b5,
              0 0 20px 6px #7986cb,
              0 0 40px 12px #9fa8da;
          }
          30% {
            box-shadow:
              0 0 15px 4px #7986cb,
              0 0 35px 10px #c5cae9,
              0 0 60px 15px #3f51b5;
          }
        }
      `}</style>

      <Box sx={{ p: 1 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: isDarkMode ? 'white' : 'initial' }}
        >
          Welcome to Admin Dashboard
        </Typography>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', ...animatedShadow }}>
              <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'initial' }}>
                Total Products
              </Typography>
              <Typography variant="h3" color="primary">
                {stats.productsCount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', ...animatedShadow }}>
              <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'initial' }}>
                Total Categories
              </Typography>
              <Typography variant="h3" color="primary">
                {stats.categoriesCount}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" mb={2} sx={{ color: isDarkMode ? 'white' : 'initial' }}>
          Recent Products
        </Typography>
        <Paper sx={{ maxHeight: 300, overflowY: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: isDarkMode ? 'white' : 'black',
              backgroundColor: isDarkMode ? '#121212' : 'white',
            }}
          >
            <thead style={{ backgroundColor: isDarkMode ? '#333' : '#eee' }}>
              <tr>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Category</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Added On</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.length ? (
                recentProducts.map((product) => (
                  <tr
                    key={product.id_product}
                    style={{
                      backgroundColor:
                        isDarkMode
                          ? 'transparent'
                          : 'transparent',
                    }}
                  >
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                      {product.product_name}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                      {product.category_name || 'N/A'}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '16px' }}>
                    No recent products.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Paper>
      </Box>
    </>
  );
}
