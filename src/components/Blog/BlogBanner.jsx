import React from 'react';
import BlogBanner from '../../scss/BlogBanner.png'; 
import { Box } from '@mui/material';

const BlogProductBanner = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={BlogBanner} alt="Blog Banner" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}

export default BlogProductBanner;
