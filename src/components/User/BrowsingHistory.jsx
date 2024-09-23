import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function BrowsingHistory() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const productsPerPage = 4; // Số lượng sản phẩm trên mỗi trang

  // Fetch data from the API
  useEffect(() => {
    fetch('https://66f127da41537919154fc1b0.mockapi.io/plant')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Tính toán số lượng trang dựa trên số sản phẩm và số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Lấy các sản phẩm của trang hiện tại
  const getCurrentPageProducts = () => {
    const startIndex = currentPage * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  };

  // Hàm chuyển trang trước
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm chuyển trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          border: 1,
          padding: 1,
          marginTop: 4,
          borderColor: '#E4E7E9',
          backgroundColor: 'white',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          marginRight: 10.2,
          maxWidth: '100%',
        }}
      >
        <Typography sx={{ fontWeight: 500, padding: 1 }}>
          BROWSING HISTORY
        </Typography>
        <Link to="/orderhistory" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="#FA8232">
            View All{' '}
            <ArrowForwardIcon
              sx={{ marginBottom: -0.8, color: '#FA8232' }}
            />
          </Typography>
        </Link>
      </Box>

      {/* Hiển thị các sản phẩm */}
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        sx={{
          marginRight: 10.3,
          marginLeft: 0.1,  
          maxWidth: '100%', 
          background:'#ffffff ',
          padding:5
        }}
      >
        <Grid container spacing={2}>
          {getCurrentPageProducts().map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box
                sx={{
                  border: 1,
                  borderColor: '#E4E7E9',
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                />
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mt: 2, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    maxWidth: '100%' 
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`$${product.price}`}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3, marginRight: 10.2 }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography sx={{ mx: 2 }}>
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
}
