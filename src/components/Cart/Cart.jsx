import { Paper, Grid, Typography, Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      <Grid item xs={12} md={7}>
        <Paper sx={{ padding: 2, height: '100%', borderColor: '1px solid black' }}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1 }}>
            Shopping Cart
          </Typography>
          {/* Nội dung giỏ hàng */}
          <Grid container spacing={1} sx={{ marginTop: 2 }} alignItems="center">
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">4K UHD LED Smart TV with Chromecast Built-in</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                <span style={{ textDecoration: 'line-through' }}>$99</span> $70
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item>
                  <Button variant="outlined" size="small">-</Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1 }}>01</Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="small">+</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                $70
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }} alignItems="center">
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">Wired Over-Ear Gaming Headphones with USB</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                $250
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item>
                  <Button variant="outlined" size="small">-</Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1 }}>03</Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="small">+</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                $250
              </Typography>
            </Grid>
          </Grid>

          {/* Căn chỉnh nút "Update Cart" và "Return to Shop" */}
          <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Link
            components={Link}
            to='/shop/newproduct'
            >
            <Button variant="outlined" sx={{color:'black',borderColor:'black'}}>Return to Shop</Button>
            </Link>
            <Button variant="outlined" sx={{color:'black',borderColor:'black',fontWeight:'bold'}}>Update Cart</Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1 }}>
                Cart Totals
              </Typography>
              <Typography variant="body1">Sub-total: $320</Typography>
              <Typography variant="body1">Shipping: Free</Typography>
              <Typography variant="body1">Discount: $24</Typography>
              <Typography variant="body1">Tax: $61.99</Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>Total: $357.99 USD</Typography>
              <Link
              to='/payment'
              components={Link}
              >
              <Button variant="contained" sx={{ marginTop: 2,backgroundColor:'green',width:'100%' }}>Proceed to Checkout</Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, marginTop: 2 }}>
              <Typography variant="h6">Coupon Code</Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Coupon (not required)"
                sx={{ marginTop: 1 }}
              />
              <Button variant="contained" sx={{ marginTop: 1,backgroundColor:'green',width:'100%' }}>Apply Coupon</Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
