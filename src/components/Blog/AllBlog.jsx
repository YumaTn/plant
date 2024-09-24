import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://66f127da41537919154fc1b0.mockapi.io/plant');
        const mappedBlogs = response.data.map(item => ({
          id: item.id,
          person: item.image,
          name: item.name,
          date: "May 23 2023" // Add your date logic here if needed
        }));
        setBlogs(mappedBlogs);
      } catch (error) {
        console.error("Error fetching the blogs data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
      {blogs.map((blog) => (
        <Grid item key={blog.id}>
          <Link to={`/blogdetail/${blog.id}`} style={{ textDecoration: 'none' }}> {/* Use Link for navigation */}
            <Card sx={{ width: 250, borderRadius: '10px', boxShadow: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={blog.person}
                alt={blog.name}
                sx={{ height: 200, objectFit: 'cover' }}
                loading="lazy"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    maxWidth: '100%' 
                  }}
                >
                  {blog.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitBoxOrient: 'vertical', 
                    overflowY: 'hidden', 
                    maxHeight: '40px',
                    lineClamp: 2,
                  }}
                >
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua."
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: 1 }}>
                  <Avatar 
                    alt={blog.name} 
                    src={blog.person} 
                    sx={{ width: 30, height: 30, marginRight: 1 }} 
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      marginRight: 1,
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap', 
                      maxWidth: '100%' 
                    }}
                  >
                    {blog.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default AllBlog;
