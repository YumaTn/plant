import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, CardMedia, FormControl, InputLabel, Select, MenuItem, Divider, Box, Grid, Breadcrumbs } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../../scss/BackgroundDetail.png';

const ProductDetail = () => {
    const { id } = useParams(); // Get productId from URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Store quantity value
    const [includePlanter, setIncludePlanter] = useState('yes');
    const [cartMessage, setCartMessage] = useState(''); // Cart add message
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product details based on the productId from URL
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://exe201be.io.vn/api/product/byid/${id}`);
                if (response.data.success) {
                    setProduct(response.data.data); 
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    // Check if user is logged in by checking localStorage
    const isLoggedIn = localStorage.getItem('userData');

    if (!product) {
        return <Typography variant="h6" textAlign="center">Loading...</Typography>;
    }

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            navigate('/signin');
            return;
        }
    
        // Lấy token từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData ? userData.token : null;
    
        if (!token) {
            setCartMessage('Token is missing. Please log in again.');
            return;
        }
    
        try {
            // Gửi token trong header
            const response = await axios.post('https://exe201be.io.vn/api/cart/addtocart', {
                productId: id,
                quantity: quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data.success) {
                setCartMessage('Product added to cart successfully!');
            } else {
                setCartMessage('Failed to add product to cart.');
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            setCartMessage('An error occurred while adding product to cart.');
        }
    };
    

    return (
        <Container style={{ maxWidth: '1200px', padding: '20px' }}>
            <Grid container spacing={4}>
                {/* Product Image */}
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        image={product.urlImg} // Get image URL from API
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </Grid>

                {/* Product Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Box style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <Typography variant="h5" style={{ color: 'red' }}>{formatPrice(product.price)} VNĐ</Typography>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '10px' }}>{product.description}</Typography>

                    {/* Product Options */}
                    <Box style={{ marginTop: '20px', maxWidth: '300px' }}>
                        {/* Quantity Field */}
                        <FormControl fullWidth style={{ marginBottom: '30px' }}>
                            <TextField
                                label="Số lượng"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)} // Update quantity on input change
                                inputProps={{ min: 1 }} // Minimum value is 1
                            />
                        </FormControl>

                        {/* Include Planter Field */}
                        <FormControl fullWidth style={{ marginBottom: '30px' }}>
                            <InputLabel sx={{ top: -5, left: -14 }}>Include Planter</InputLabel>
                            <Select value={includePlanter} onChange={(e) => setIncludePlanter(e.target.value)}>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#3B823E', '&:hover': { backgroundColor: '#336E34' } }}
                            onClick={handleAddToCart} // Trigger Add to Cart
                        >
                            Add to Cart
                        </Button>
                    </Box>

                    {/* Display cart message */}
                    {cartMessage && (
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
                            {cartMessage}
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <Divider style={{ margin: '40px 0' }} />

            <Box
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundColor:'#506B52', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white'
                }}
            >
                {/* Care Guide Breadcrumb */}
                <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Typography color="inherit" sx={{fontWeight:'bold'}}>
                        Care Guide
                    </Typography>
                </Breadcrumbs>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    <strong>Ingredients:</strong> {product.ingredient}
                </Typography>

                {/* Plant Bio Breadcrumb */}
                <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Typography color="inherit" sx={{fontWeight:'bold'}}>
                        Plant Bio
                    </Typography>
                </Breadcrumbs>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    <strong>User Manual:</strong> {product.userManual}
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    <strong>Warranty Policy:</strong> {product.warrantyPolicy}
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    <strong>Story:</strong> {product.story}
                </Typography>

                {/* Reviews Breadcrumb */}
                <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Typography color="inherit" sx={{fontWeight:'bold'}}>
                        Reviews
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Divider style={{ margin: '40px 0' }} />
        </Container>
    );
};

export default ProductDetail;
