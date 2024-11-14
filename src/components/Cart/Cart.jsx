import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponId, setCouponId] = useState(null); // New state for coupon ID
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : '';

    const fetchCartItems = async () => {
      try {
        const cartResponse = await axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (cartResponse.data.success) {
          const cartDetails = cartResponse.data.data.orderDetails;
          setCartItems(cartDetails);
          setTotalPrice(cartResponse.data.data.totalPrice);

          const productDetails = await Promise.all(
            cartDetails.map(async (item) => {
              const productResponse = await axios.get(`https://exe201be.io.vn/api/product/byid/${item.productId}`);
              return { ...item, urlImg: productResponse.data.data.urlImg };
            })
          );

          setCartItems(productDetails);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (token) {
      fetchCartItems();
    } else {
      console.error("Token is missing");
    }
  }, []);

  useEffect(() => {
    // Tính tổng giá sau khi áp dụng giảm giá
    setFinalPrice(totalPrice - (totalPrice * (discount / 100)));
  }, [totalPrice, discount]);

  const handleDeleteItem = async (orderId, productId) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : '';

    try {
      const deleteResponse = await axios.post('https://exe201be.io.vn/api/cart/deteleitemincart',
        {
          orderId: orderId,
          productId: productId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (deleteResponse.data.success) {
        setCartItems((prevCartItems) => {
          const updatedCartItems = prevCartItems.filter(item => item.productId !== productId);
          const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          setTotalPrice(updatedTotalPrice);
          return updatedCartItems;
        });
      } else {
        console.error('Failed to delete item:', deleteResponse.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateQuantity = async (orderId, productId, newQuantity) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : '';

    try {
      const updateResponse = await axios.post('https://exe201be.io.vn/api/cart/updatecart',
        {
          orderId: orderId,
          productId: productId,
          quantity: newQuantity
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (updateResponse.data.success) {
        setCartItems((prevCartItems) => {
          const updatedCartItems = prevCartItems.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          );

          const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          setTotalPrice(updatedTotalPrice);

          return updatedCartItems;
        });
      } else {
        console.error('Failed to update item quantity:', updateResponse.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const couponResponse = await axios.get(`https://exe201be.io.vn/api/coupon/${coupon}`);
      if (couponResponse.data.success) {
        setDiscount(couponResponse.data.data.discount);
        setCouponId(couponResponse.data.data.couponId); // Save couponId
      } else {
        console.error("Coupon not valid:", couponResponse.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 10 }}>
      <Grid item xs={12} md={7}>
        <Paper sx={{ padding: 2, height: '100%', borderColor: '1px solid black' }}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1 }}>
            Shopping Cart
          </Typography>
          {cartItems.map((item, index) => (
            <Grid container spacing={1} sx={{ marginTop: 2 }} alignItems="center" key={index}>
              <Grid item xs={6} sm={4}>
                <Box display="flex" alignItems="center">
                  <img src={item.urlImg} alt={item.productName} style={{ width: 50, height: 50, marginRight: 8 }} />
                  <Typography variant="body1">{item.productName}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                  {item.price.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleUpdateQuantity(item.orderId, item.productId, item.quantity - 1)}
                    >
                      -
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1 }}>
                      {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleUpdateQuantity(item.orderId, item.productId, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                  {(item.quantity * item.price).toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ minWidth: 'auto' }}
                  onClick={() => handleDeleteItem(item.orderId, item.productId)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Button
              variant="outlined"
              sx={{ color: 'black', borderColor: 'black' }}
              onClick={() => navigate(-1)}
            >
              Return to Shop
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1 }}>
                Tổng giỏ hàng
              </Typography>
              <Typography variant="body1">Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ</Typography>
              <Typography variant="body1">Giảm giá: {discount}%</Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Tổng tiền cuối cùng: {finalPrice.toLocaleString('vi-VN')} VNĐ
              </Typography>
              <Link
                to="/payment"
                onClick={() => {
                  localStorage.setItem('payment', JSON.stringify({
                    finalPrice: finalPrice,
                    discount: discount,
                    orderId: cartItems[0]?.orderId, // assuming all items have the same orderId
                    couponId: coupon // Save couponId
                  }));
                }}
              >
                <Button variant="contained" sx={{ marginTop: 2, backgroundColor: 'green', width: '100%' }}>
                  Proceed to Checkout
                </Button>
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
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button variant="contained" sx={{ marginTop: 1, backgroundColor: 'green', width: '100%' }} onClick={handleApplyCoupon}>
                Apply Coupon
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
