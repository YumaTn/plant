import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem, Divider, Box, Stack, IconButton, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import PD_1 from '../../scss/PD_1.png';
import PD_3 from '../../scss/PD_3.png';
import PD_4 from '../../scss/PD_4.png';
import PD_5 from '../../scss/PD_5.png';
import AL_1 from '../../scss/AL_1.png';
import AL_2 from '../../scss/AL_2.png';
import AL_3 from '../../scss/AL_3.png';
import AL_4 from '../../scss/AL_4.png';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [includePlanter, setIncludePlanter] = useState('yes');
    const [zipcode, setZipcode] = useState('');

    const product = {
        name: 'Hoya Linearis',
        price: 350,
        oldPrice: 450,
        description: 'With rounded light green and white-striped leaves, the Calathea Orbifolia is a decorative and unique houseplant.',
        images: [PD_1, PD_3, PD_4, PD_5],
        care: {
            watering: 'Calatheas enjoy weekly waterings, allowing the top 2” of soil to dry out partially...',
            light: 'Calatheas thrive in medium, indirect sunlight but tolerate lower light levels too...',
            humidity: 'Your Calathea will also appreciate being placed in a humid environment...'
        },
        suggestions: [
            { name: 'Plant A', image: AL_1, price: 250, oldPrice: 300 },
            { name: 'Plant B', image: AL_2, price: 200, oldPrice: 280 },
            { name: 'Plant C', image: AL_3, price: 180, oldPrice: 220 },
            { name: 'Plant D', image: AL_4, price: 230, oldPrice: 270 }
        ]
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <Container style={{ maxWidth: '1200px', padding: '20px' }}>
                <Grid container spacing={4}>
                    {/* Phần hình ảnh */}
                    <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box style={{ width: '100%', textAlign: 'center' }}>
                            <CardMedia
                                component="img"
                                image={product.images[currentImageIndex]}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            <IconButton onClick={handlePrevImage}><ArrowBackIos /></IconButton>
                            {product.images.map((image, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        margin: '0 5px',
                                        border: currentImageIndex === index ? '2px solid green' : 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                            <IconButton onClick={handleNextImage}><ArrowForwardIos /></IconButton>
                        </Box>
                    </Grid>

                    {/* Phần thông tin sản phẩm */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4">{product.name}</Typography>
                        <Box style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                            <Typography variant="h5" color="textSecondary" style={{ marginRight: '10px' }}>
                                <del>${product.oldPrice}</del>
                            </Typography>
                            <Typography variant="h5" style={{ color: 'red' }}>${product.price}</Typography>
                        </Box>
                        <Typography variant="body1" style={{ marginTop: '10px' }}>{product.description}</Typography>

                        {/* Tùy chọn sản phẩm */}
                        <Box style={{ marginTop: '20px', maxWidth: '300px' }}>
                            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                                <InputLabel>Quantity</InputLabel>
                                <Select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    {[...Array(10).keys()].map((num) => (
                                        <MenuItem key={num} value={num + 1}>{num + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                                <InputLabel>Include Planter</InputLabel>
                                <Select value={includePlanter} onChange={(e) => setIncludePlanter(e.target.value)}>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Enter your Pincode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                fullWidth
                                style={{ marginBottom: '20px' }}
                            />
                            <Link
                            components={Link}
                            to="/cart"
                            >
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: '#3B823E', '&:hover': { backgroundColor: '#336E34' } }}
                            >
                                Add to Cart
                            </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                {/* Phần Delivery */}
                <Box style={{ marginTop: '40px', textAlign: 'left' }}>
                    <Typography variant="body1">
                        <strong>Delivery available for this location.</strong><br />
                        Typically delivered in 5-7 working days. Standard Delivery.
                    </Typography>
                </Box>

                <Divider style={{ margin: '40px 0' }} />

                {/* Care Guide */}
                <Box backgroundColor= "">
                    <Typography variant="h6" style={{ marginBottom: '20px' }}>Care Guide</Typography>
                    <Box style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
                        <Typography variant="subtitle1" style={{ marginBottom: '10px' }}><strong>Weekly Watering:</strong></Typography>
                        <Typography variant="body2" style={{ marginBottom: '20px' }}>{product.care.watering}</Typography>

                        <Typography variant="subtitle1" style={{ marginBottom: '10px' }}><strong>Light Requirements:</strong></Typography>
                        <Typography variant="body2" style={{ marginBottom: '20px' }}>{product.care.light}</Typography>

                        <Typography variant="subtitle1" style={{ marginBottom: '10px' }}><strong>Humidity:</strong></Typography>
                        <Typography variant="body2">{product.care.humidity}</Typography>
                    </Box>
                </Box>

                <Divider style={{ margin: '40px 0' }} />
            </Container>

            {/* Suggestions Section */}
            <Container>
                <Typography variant="h6" textAlign="center" fontWeight="bold" mb={3}>You May Also Like</Typography>
                <Grid container spacing={4}>
                    {product.suggestions.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card>
                                <CardMedia component="img" image={item.image} alt={item.name} sx={{ height: 180 }} />
                                <CardContent>
                                    <Typography variant="subtitle1" textAlign="center">{item.name}</Typography>
                                    <Typography variant="body2" textAlign="center" color="textSecondary">
                                        <del>${item.oldPrice}</del> <span style={{ color: 'red' }}>${item.price}</span>
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2, backgroundColor: '#3B823E', '&:hover': { backgroundColor: '#336E34' } }}
                                    >
                                        Buy
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetail;
