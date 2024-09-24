import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const ShopProduct = () => {
  const [bestSellingPlants, setBestSellingPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('https://66f127da41537919154fc1b0.mockapi.io/plant');
        setBestSellingPlants(response.data);
      } catch (error) {
        console.error("Error fetching the plants data:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2, marginRight: 10 }}>
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          placeholder="Search for plant"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
          sx={{
            border: 'black solid 1px',
            borderRadius: '20px',
            width: '400px',
            height:'50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              paddingRight: '40px',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  right: '10px', 
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#3B823E', // Change the color on hover
                    transform: 'scale(1.2)', // Scale the icon on hover
                    transition: 'transform 0.2s ease, color 0.2s ease' // Smooth transition
                  }
                }} 
                onClick={handleSearch}
              >
                <SearchIcon />
              </Box>
            ),
          }}
        />
      </Box>
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
                <Button variant="contained" sx={{backgroundColor:"#3B823E"}}>
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopProduct;
