import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Cactus = () => {
  const [Cactus, setCactus] = useState([]);

  useEffect(() => {
    const fetchCactus = async () => {
      try {
        const response = await axios.get('https://66f127da41537919154fc1b0.mockapi.io/plant');
        setCactus(response.data);
      } catch (error) {
        console.error("Error fetching the Cactus data:", error);
      }
    };

    fetchCactus();
  }, []);

  return (
    <Box>
      <Typography
    sx={{
        fontFamily:"Unna",
        textAlign:'center',
        fontSize:40,
        fontWeight:'bold',
        marginTop:5,
    }}
    >Cactus</Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
        {Cactus.map((plant) => (
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
}

export default Cactus;