import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import HomeBackgroundSay from '../scss/HomeBackgroundSay.png';
import HomeBanner from './HomeBanner';
import HomeBannerUnder from './HomeBannerUnder';
import CategoryHome from './CategoryHome';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trendingPlants, setTrendingPlants] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  // Fetch data using axios
  const [products, setProducts] = useState([]);

  // Fetch data for best-selling products
  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const requestData = {
          pageNum: 1,
          pageSize: 999,
          name: "",
          status: true
        };

        const response = await axios.post('https://exe201be.io.vn/api/product/search', requestData);
        const bestSellingProducts = response.data.data.pageData.filter(product => product.categoryName === 'bestSelling');

        const filteredProducts = bestSellingProducts.slice(0, 4).map(product => ({
          urlImg: product.urlImg,
          name: product.name,
          price: product.price,
          id:product.id,
        }));

        const decorateItem = response.data.data.pageData.filter(product => product.categoryName === 'decorateItems');
        const filteredDecor = decorateItem.slice(0, 4).map(product => ({
          urlImg: product.urlImg,
          name: product.name,
          price: product.price,
          id:product.id,
        }));
        setCelebs(filteredDecor);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, []);
  return (
    <Box>
      <HomeBanner />
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: 50,
          marginTop: 5,
          marginBottom: 5,
          fontFamily: 'unna',
          fontWeight: 'bold'
        }}
      >
        Chúng tôi chỉ bán câu chuyện - Không bán sản phẩm
      </Typography>
      <HomeBannerUnder />
      <CategoryHome />
      <Box sx={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h2" gutterBottom>
          Best Selling
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : (
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
            {products.map((plant) => (
              <Grid item key={plant.id}>
                <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={plant.urlImg || 'default_image_url.jpg'}
                    alt={plant.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                    loading="lazy"
                    onS={() => console.log('Image failed to load:', plant.urlImg)} // Thêm xử lý lỗi
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 1, // Giới hạn tên hiển thị 1 dòng
                        textOverflow: 'ellipsis', // Thêm dấu "..." nếu tên dài
                      }}
                    >
                      {plant.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {formatPrice(plant.price)} VNĐ
                    </Typography>
                    <Link to={`/productdetail/${plant.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ backgroundColor: "#3B823E", width: '100%' }}>
                        Mua
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ padding: '50px 20px', backgroundColor: '#ffffff' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Section on the Left */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Personality-based Plant Selection Consultation
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}
            >
              At Choi Xinh, we take pride in providing personalized plant recommendations that cater to your unique lifestyle and preferences. Our expert horticulturists will carefully consider your personality traits, interests, living space, and schedule to curate a selection of plants that perfectly complement your home and enhance your well-being.
              <br /><br />
            </Typography>
            
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={HomeBackgroundSay}
              alt="Plant consultation"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Celebs You Love Section */}
      <Box sx={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <Typography variant="h2" gutterBottom>
          Celebs You Love, Love Us
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : (
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
            {celebs.map((plant) => (
              <Grid item key={plant.id}>
                <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={plant.urlImg || 'default_image_url.jpg'}
                    alt={plant.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                    loading="lazy"
                    onS={() => console.log('Image failed to load:', plant.urlImg)} // Thêm xử lý lỗi
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 1, // Giới hạn tên hiển thị 1 dòng
                        textOverflow: 'ellipsis', // Thêm dấu "..." nếu tên dài
                      }}
                    >
                      {plant.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {formatPrice(plant.price)} VNĐ
                    </Typography>
                    <Link to={`/productdetail/${plant.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ backgroundColor: "#3B823E", width: '100%' }}>
                        Mua
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Home;
