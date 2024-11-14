import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, RadioGroup, Radio, Button } from '@mui/material';
import Payment1 from '../../scss/Payment1.png';
import momo from '../../scss/momo.png';
import Cash from '../../scss/Cash.png';
import Bank from '../../scss/Bank.png';
import QRCode from '../../scss/QRCode.png';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');
  const [productImages, setProductImages] = useState({});
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    dob: '',
    address: '',
    phoneNumber: '',
    gender: '',
    imgUrl: '',
  });
  const [orderNote, setOrderNote] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Get passed data from Cart component
  const location = useLocation();
  const formatPrice = (price) => price.toLocaleString('vi-VN');

  useEffect(() => {
    const tokenData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
    const token = tokenData?.token;
    const userId = tokenData?.userId;

    if (token && userId) {
      // Fetch user details
      axios.get(`https://exe201be.io.vn/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.success) {
            const user = response.data.data;
            setUserData({
              userName: user.userName,
              email: user.email,
              dob: user.dob || '',
              address: user.address || '',
              phoneNumber: user.phoneNumber || '',
              gender: user.gender || '',
              imgUrl: user.imgUrl || '',
            });
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));

      // Fetch cart items
      axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.success) {
            const items = response.data.data.orderDetails.map((item) => ({
              id: item.id,
              name: item.productName,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.price * item.quantity,
              productId: item.productId,
            }));
            setCartItems(items);

            // Fetch product images
            items.forEach((item) => {
              axios.get(`https://exe201be.io.vn/api/product/byid/${item.productId}`)
                .then((productResponse) => {
                  if (productResponse.data.success) {
                    setProductImages((prevImages) => ({
                      ...prevImages,
                      [item.productId]: productResponse.data.data.urlImg,
                    }));
                  }
                })
                .catch((error) => console.error('Error fetching product details:', error));
            });
          }
        })
        .catch((error) => console.error('Error fetching cart data:', error));
    } else {
      console.error('Token or userId not found!');
    }
  }, []);

  useEffect(() => {
    const paymentData = JSON.parse(localStorage.getItem('payment'));
    if (paymentData) {
      setFinalPrice(paymentData.finalPrice);
      setDiscount(paymentData.discount);
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    // Get orderId, couponId from localStorage
    const paymentData = JSON.parse(localStorage.getItem('payment'));
    if (paymentData) {
      const { orderId, couponId } = paymentData;
      
      // Prepare the data to send to the payment API
      const paymentRequest = {
        orderId,
        couponId,
        amount: finalPrice,
        description: orderNote, 
      };

      // Call the payment API
      axios.post('https://exe201be.io.vn/api/payment/geturlpayment', paymentRequest)
        .then((response) => {
          if (response.data.success) {
            window.location.href = response.data.data.url;
          } else {
            console.error('Payment API failed:', response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error calling payment API:', error);
        });
    }
  };

  return (
    <>
      <Box padding={3} bgcolor="#f9f9f9" maxWidth={1000} boxShadow={2} borderRadius={2} margin="0 auto" marginTop={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Cart Items
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item xs={2}>
                <Typography variant="h6">Product</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Price</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Quantity</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Total</Typography>
              </Grid>
            </Grid>

            {cartItems.map((item) => (
              <Grid container key={item.id} alignItems="center" style={{ margin: '16px 0' }} justifyContent="center">
                <Grid item xs={2}>
                  <img src={productImages[item.productId] || Payment1} alt={item.name} style={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item xs={2}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>{item.quantity}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{formatPrice(item.totalPrice)} VNĐ</Typography>
                </Grid>
              </Grid>
            ))}

            <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
              <Grid item xs={6} />
              <Grid item xs={6} container justifyContent="flex-end">
                <Box textAlign="right">
                  <Typography>
                    Tổng tiền:
                    <Box component="span">{formatPrice(subtotal)} VNĐ</Box>
                  </Typography>
                  <Typography variant="body1" sx={{color:'red'}}>Giảm giá: {discount}%</Typography>
                  <Typography variant="body1" sx={{color:'green'}}>Tổng tiền cuối cùng: {formatPrice(finalPrice)} VNĐ</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3, bgcolor: '#f9f9f9', boxShadow: 2, borderRadius: 2, marginTop: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Billing Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="User Name" value={userData.userName} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Phone" value={userData.phoneNumber} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email Address" value={userData.email} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Street Address" value={userData.address} fullWidth disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ marginBottom: 2 }}>Order Note (optional)</Typography>
            <TextField
              label="Order notes (optional)"
              fullWidth
              multiline
              rows={3}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="center">
              <img src={QRCode} alt="QR Code" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Payment method</Typography>
            <RadioGroup row value={selectedPaymentMethod} onChange={handlePaymentChange}>
              <Box display="flex" flexDirection="column" alignItems="center" marginRight={2}>
                <Radio value="bank" sx={{ '&.Mui-checked': { color: '#4caf50' } }} />
                <img src={Bank} alt="Bank" width={80} />
              </Box>
            </RadioGroup>
            <Button
              type="button"
              style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none' }}
              onClick={handlePayment}
            >
              Thanh toán
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;
