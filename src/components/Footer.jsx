// Footer.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { BankIcon, VisaIcon } from '../scss/icon';
import ConfirmTest from '../scss/ConfirmTest.png';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#436E35', 
        padding: '20px', 
        color: 'white', // Text color for better contrast
        marginTop: '20px' // Add some margin to separate from content above
      }}
    >
      <Grid container>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h6">Quick Links</Typography>
          <Typography variant="body2">Blogs</Typography>
          <Typography variant="body2">Bulk Order</Typography>
          <Typography variant="body2">Gifts</Typography>
          <Typography variant="body2">Organic Garden</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Legal</Typography>
          <Typography variant="body2">T&C</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Returns</Typography>
          <Typography variant="body2">Shipping</Typography>   
          <Typography variant="body2">Cancellation</Typography>   
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Support</Typography>
          <Typography variant="body2">FAQs</Typography>
          <Typography variant="body2">Contact Us</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <img src={ConfirmTest} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
        </Grid>
        <Grid item xs={2} sx={{marginTop:5}}>
          <Typography variant="h8" >© 2024 Plan A Plant
          All Rights Reserved</Typography>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
        <Typography variant="body2" align="center" sx={{ marginRight: 2 }}>
          We facilitate your payments through trusted gateways
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VisaIcon />
          <BankIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
