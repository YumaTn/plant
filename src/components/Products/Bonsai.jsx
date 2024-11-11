import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import SearchProduct from '../Shop/SearchProduct';

const Bonsai = () => {
    const [bonsaiList, setBonsaiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.post('https://exe201be.io.vn/api/product/search', {
                    pageInfo: {
                        page: 1,
                        size: 10,
                        sort: "Ascending",
                        order: "Id"
                    },
                    searchInfo: {
                        keyWord: "",
                        role: null,
                        status: true
                    }
                });
                
                if (response.data.success) {
                    setBonsaiList(response.data.data.pageData);
                }
            } catch (error) {
                console.error("Error fetching the plants data:", error);
            }
        };

        fetchPlants();
    }, []);

    return (
        <>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
                {bonsaiList.map((plant) => (
                    <Grid item key={plant.id}>
                        <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                image={plant.urlImg}
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
                                <Button variant="contained" sx={{ backgroundColor: "#3B823E", width: '100%' }}>
                                    Buy
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Bonsai;
