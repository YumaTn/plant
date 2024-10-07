import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Import Outlet
import SettingList from './SettingsList'
const UserContainer = () => {
  return (
    <Box>
      <Box display="flex" marginTop={2}>
        <Box flex={1} sx={{ flexBasis: '20%' }}>
          <SettingList/>
        </Box>
        <Box flex={3} sx={{ flexBasis: '80%',  marginTop: '110px', marginLeft: 4, marginRight: 5 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserContainer;
