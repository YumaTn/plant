import React, { useEffect, useState } from 'react';
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
import HomeBackgroundSay from '../scss/HomeBackgroundSay.png'
import HomeBanner from './HomeBanner';
import HomeBannerUnder from './HomeBannerUnder';
import CategoryHome from './CategoryHome';
import { Link } from 'react-router-dom';
const Home = () => {
  const [plants, setPlants] = useState([]);
  const [bestSellingPlants, setBestSellingPlants] = useState([]);
  const [trendingPlants, setTrendingPlants] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('https://66f127da41537919154fc1b0.mockapi.io/plant');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlants(data);

        setBestSellingPlants(data.slice(0, 3));
        setTrendingPlants(data.slice(3, 6));

        setTestimonials(data.slice(0, 3));
        setCelebs(data.slice(0, 3).map(item => item.celes));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching plant data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <Box>
      <HomeBanner/>
      <Typography
      sx={{
        textAlign:'center',
        fontSize:50,
        marginTop:5,
        marginBottom:5,
        fontFamily:'unna',
        fontWeight:'bold'
      }}
      >
      We sell stories - Not sell products
      </Typography>
      <HomeBannerUnder/>
      <CategoryHome/>
      <Box sx={{ textAlign: 'center' }}>
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
            {bestSellingPlants.map((plant) => (
              <Grid item key={plant.id}>
                <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={plant.image}
                    alt={plant.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {plant.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      ${parseFloat(plant.price).toFixed(2)}
                    </Typography>
                    <Button 
                    sx={{
                      backgroundColor:'green',
                      color:'white'
                    }}
                    >
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Trending Plants Section */}
      <Box sx={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h2" gutterBottom>
          Trending Plants
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : (
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
            {trendingPlants.map((plant) => (
              <Grid item key={plant.id}>
                <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={plant.image}
                    alt={plant.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {plant.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      ${parseFloat(plant.price).toFixed(2)}
                    </Typography>
                    <Button 
                    sx={{
                      backgroundColor:'green',
                      color:'white'
                    }}
                    >
                      Buy Now
                    </Button >
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Personality-based Consultation Section */}
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
            <Typography sx={{color:'red'}}>
            *Service only available in Vinhomes Grand Park
            </Typography>
          </Typography>
          <Link
          to='/shop'
          component={Link}
          >
          <Button sx={{marginLeft:30,marginTop:10,backgroundColor:'green',color:'white'}} variant="contained" size="large">
            Order Now
          </Button>
          </Link>
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

      {/* Testimonials Section */}
      <Box sx={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h2" gutterBottom>
          What Our Customers Say
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : (
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
            {testimonials.map((testimonial) => (
              <Grid item key={testimonial.id}>
                <Card sx={{ width: 250, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={testimonial.person}
                    alt={testimonial.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua."
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
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
            {celebs.map((celebUrl, index) => (
              <Grid item key={index}>
                <Card sx={{ width: 150, borderRadius: '10px', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={celebUrl}
                    alt={`Celeb ${index + 1}`}
                    sx={{ height: 150, objectFit: 'cover' }}
                    loading="lazy"
                  />
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
