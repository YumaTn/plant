import React from 'react';
import HomeBannerUnders from '../scss/HomeBannerUnder.png'
import { Box } from '@mui/material';

const HomeBannerUnder = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={HomeBannerUnders} alt="Blog Banner" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}

export default HomeBannerUnder;
