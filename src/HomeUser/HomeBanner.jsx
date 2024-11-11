import React from 'react';
import HomeBanners from '../scss/HomeBanners.jpg'
import { Box } from '@mui/material';

const HomeBanner = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={HomeBanners} alt="Blog Banner" style={{ width: '100%', height: 300 }} />
    </Box>
  );
}

export default HomeBanner;
