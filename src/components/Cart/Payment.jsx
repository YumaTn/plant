import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, IconButton, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import Payment1 from '../../scss/Payment1.png';
import Payment2 from '../../scss/Payment2.png';
import momo from '../../scss/momo.png';
import Cash from '../../scss/Cash.png';
import Bank from '../../scss/Bank.png';
import QRCode from '../../scss/QRCode.png'
const Payment = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Plant Name', price: 99.0, quantity: 1, image: Payment1 },
        { id: 2, name: 'Plant Name', price: 99.0, quantity: 1, image: Payment2 },
    ]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo'); // State to manage selected radio
    const radioRefs = {
        momo: useRef(null),
        cash: useRef(null),
        card: useRef(null),
    };

    const handleQuantityChange = (id, action) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: action === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                    }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePaymentChange = (event) => {
        const value = event.target.value;
        setSelectedPaymentMethod(value);

        // Focus vào radio tương ứng
        const selectedRef = radioRefs[value];
        if (selectedRef && selectedRef.current) {
            selectedRef.current.focus();
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
                                <Typography variant="h6">Quantity</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Total</Typography>
                            </Grid>
                        </Grid>

                        {cartItems.map((item) => (
                            <Grid container key={item.id} alignItems="center" style={{ margin: '16px 0' }} justifyContent="center">
                                <Grid item xs={2}>
                                    <img src={item.image} alt={item.name} style={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>{item.name}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ cursor: 'pointer', textDecoration: 'underline', marginTop: 2 }}
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} display="flex">
                                    <Box border={'1px solid black'} borderRadius={2} padding="4px 8px" display="flex" alignItems="center">
                                        <IconButton onClick={() => handleQuantityChange(item.id, 'decrement')} size="small">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography variant="body1" display="inline" style={{ padding: '0 8px' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton onClick={() => handleQuantityChange(item.id, 'increment')} size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography>${item.price * item.quantity}</Typography>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
                            <Grid item xs={6} />
                            <Grid item xs={6} container justifyContent="flex-end">
                                <Box textAlign="right">
                                    <Typography>
                                        Subtotal:
                                        <Box component="span" sx={{ marginLeft: 10 }}>
                                            ${subtotal.toFixed(2)}
                                        </Box>
                                    </Typography>
                                    <Typography>
                                        Shipping:
                                        <Box component="span" sx={{ marginLeft: 10 }}>
                                            Flat Rate
                                        </Box>
                                    </Typography>
                                    <Typography variant="h6">
                                        Total:
                                        <Box component="span" sx={{ marginLeft: 10 }}>
                                            ${subtotal.toFixed(2)}
                                        </Box>
                                    </Typography>
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
                            <Grid item xs={12} sm={6}>
                                <TextField required label="First Name" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required label="Last Name" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required label="Phone" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required label="Email Address" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required label="Street Address" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Building" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ marginBottom: 2 }} xs={1}>Order Note (optional)</Typography>
                        <TextField label="Order notes (optional)" fullWidth multiline rows={3} />
                        <Box mt={2} display="flex" justifyContent="center">
                            <img src={QRCode} alt="QR Code" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sx={{marginTop:-10}}>
                        <Typography variant="h6" gutterBottom>Payment method</Typography>
                        <RadioGroup row value={selectedPaymentMethod} onChange={handlePaymentChange}>
                            <Box display="flex" flexDirection="column" alignItems="center" marginRight={2}>
                                <Radio
                                    value="momo"
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#4caf50', 
                                        },
                                    }}
                                />
                                <img src={momo} alt="Momo" style={{ marginBottom: 5,width:'90%' }} />
                                <Typography variant="body2">Momo</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center" marginRight={2}>
                                <Radio
                                    value="cash"
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#4caf50',
                                        },
                                    }}
                                />
                                <img src={Cash} alt="Cash" style={{marginBottom: 5 }} />
                                <Typography variant="body2">Cash</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Radio
                                    value="card"
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#4caf50', 
                                        },
                                    }}
                                />
                                <img src={Bank} alt="Card" style={{  marginBottom: 5 }} />
                                <Typography variant="body2">Card</Typography>
                            </Box>
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Box
                        sx={{
                            border:'1px solid green',
                            backgroundColor:'green',
                            padding:5,
                            paddingTop:1,
                            paddingBottom:1,
                            borderRadius:2,
                            color:'white'
                        }}
                        >Place Order</Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Payment;
