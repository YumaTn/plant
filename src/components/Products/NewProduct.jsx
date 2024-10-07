import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { React, useState, useEffect } from 'react'
import SearchProduct from '../Shop/SearchProduct';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewProduct = () => {
  const [NewProduct, setNewProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('https://66f127da41537919154fc1b0.mockapi.io/plant');
        setNewProduct(response.data);
      } catch (error) {
        console.error("Error fetching the plants data:", error);
      }
    };

    fetchPlants();
  }, []);
  return (
    <>
      <SearchProduct searchTem={searchTerm} setSearchTerm={setSearchTerm} />
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
        {NewProduct.map((plant) => (
          <Grid item key={plant.id}>
            <Link to={`/productdetail/${plant.id}`} style={{ textDecoration: 'none' }}> {/* Use Link for navigation */}/
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
                  <Button variant="contained" sx={{ backgroundColor: "#3B823E" }}>
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default NewProduct