import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

export default function BrowsingHistory() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const productsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };
  // Fetch data from the first API to get the product IDs
  useEffect(() => {
    // Get token from localStorage
    const tokenData = JSON.parse(localStorage.getItem('userData')) || {};
    const token = tokenData.token;

    axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.success) {
          const orderDetails = response.data.data.orderDetails || [];
          const productIds = orderDetails.map(order => order.productId); // Extract productIds

          // Fetch product data for each productId
          const productPromises = productIds.map(productId =>
            axios.get(`https://exe201be.io.vn/api/product/byid/${productId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          );

          // After all product data is fetched, set the state with the product details
          Promise.all(productPromises)
            .then(productResponses => {
              const formattedProducts = productResponses.map(productResponse => {
                const { name, price, urlImg, id } = productResponse.data.data || {}; // Extract name, price, urlImg
                return { name, price, urlImg, id };
              });
              setProducts(formattedProducts); // Set the products to state
            })
            .catch(error => {
              console.error('Error fetching product data:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
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
        <Link to="/userlist/orderhistory" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="#FA8232">
            View All{' '}
            <ArrowForwardIcon sx={{ marginBottom: -0.8, color: '#FA8232' }} />
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
          background: '#ffffff ',
          padding: 5
        }}
      >
        <Grid container spacing={2}>
          {getCurrentPageProducts().map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                {/* Fixed image size */}
                <img
                  src={product.urlImg} // Use urlImg for the image source
                  alt={product.name}
                  style={{
                    width: '100%', // Ensures the image stretches across the box
                    height: 200, // Fixed height for the image
                    objectFit: 'cover', // Ensures the image covers the area
                    borderRadius: 4
                  }}
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
                  {formatPrice(product.price)}VNĐ
                </Typography>
              </Box>
              <Link to={`/productdetail/${product.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ backgroundColor: "#3B823E", width: '100%' }}>
                  Mua
                </Button>
              </Link>
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
