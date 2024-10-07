import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import {React,useState,useEffect} from 'react'
import axios from 'axios';
import SearchProduct from '../Shop/SearchProduct';

const Bonsai = () => {
    const [Bonsai, setBonsai] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchPlants = async () => {
          try {
            const response = await axios.get('https://66f127da41537919154fc1b0.mockapi.io/plant');
            setBonsai(response.data);
          } catch (error) {
            console.error("Error fetching the plants data:", error);
          }
        };
    
        fetchPlants();
      }, []);
  return (
    <>
    <SearchProduct searchTem={searchTerm} setSearchTerm={setSearchTerm}/>
    <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
        {Bonsai.map((plant) => (
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
                <Button variant="contained" sx={{backgroundColor:"#3B823E",width:'100%'}}>
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </>
  )
}

export default Bonsai