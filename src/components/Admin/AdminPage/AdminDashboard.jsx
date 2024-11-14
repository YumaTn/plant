import React from 'react';
import { Box } from '@mui/material';
import UserDashboard from '../Dashboard/UserDashboard';
import ProductDashboard from '../Dashboard/ProductDashboard';
import MoneyDashboard from '../Dashboard/MoneyDashboard';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box >
        <UserDashboard />
        <MoneyDashboard />
      </Box>
      <Box sx={{ mt: 2 }}>
        <ProductDashboard />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
