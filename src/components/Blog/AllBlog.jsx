import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post('https://exe201be.io.vn/api/blogs/search', {
          pageNum: 1,
          pageSize: 10,
          title: "",
          status: true
        });
        const mappedBlogs = response.data.data.pageData.map(item => ({
          id: item.id,
          userName: item.userName,
          urlAvatar: item.urlAvatar,
          title: item.title,
          description: item.description,
          date: new Date(item.date).toLocaleDateString('vi-VN'), // Convert date to locale format
          urlImg1: item.urlImg1
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
          <Link to={`/blogdetail/${blog.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ width: 250, borderRadius: '10px', boxShadow: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={blog.urlImg1}
                alt={blog.title}
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
                  {blog.title}
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
                  {blog.description}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: 1 }}>
                  <Avatar 
                    alt={blog.userName} 
                    src={blog.urlAvatar} 
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
                    {blog.userName}
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
};

export default AllBlog;
