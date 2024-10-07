import React from 'react';
import ShopBanner from '../../scss/ShopBanner.png'; 
import { Box } from '@mui/material';

const ShopProductBanner = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={ShopBanner} alt="Shop Banner" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}

export default ShopProductBanner;
