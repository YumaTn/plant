import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Import Outlet
import FilterPlant from './FilterPlant';
import ShopProductBanner from './ShopProductBanner';

const Shop = () => {
  return (
    <Box>
      <ShopProductBanner/>
      <Box display="flex" marginTop={2}>
        <Box flex={1} sx={{ flexBasis: '20%',marginBottom:20 }}>
          <FilterPlant/>
        </Box>
        <Box flex={3} sx={{ flexBasis: '80%', marginLeft: 4, marginTop: '100px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
