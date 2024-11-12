import React from 'react';
import { Box } from '@mui/material';
import UserDashboard from '../Dashboard/UserDashboard';
import ProductDashboard from '../Dashboard/ProductDashboard';
import MoneyDashboard from '../Dashboard/MoneyDashboard';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <UserDashboard />
        <ProductDashboard />
      </Box>
      <Box sx={{ mt: 2 }}>
        <MoneyDashboard />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
