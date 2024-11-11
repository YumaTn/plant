import React, { useState } from 'react';
import { Box, TextField, Checkbox, Typography, Grid, FormControlLabel } from '@mui/material';
import { ImageSignUpIcon, LoginIcon } from '../../scss/icon';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [account, setaccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 

    const handleSignUp = async () => {
        const userName = `${firstName} ${lastName}`;
        try {
            const response = await axios.post('https://exe201be.io.vn/api/user', {
                userName,
                account,
                password,
                confirmPassword,
                address:'',
                phoneNumber:'',
                gender:''

            }, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });

            console.log(response.data);
            setSuccessMessage('Đăng ký thành công!');
            setError(''); 
            setFirstName('');
            setLastName('');
            setaccount('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError('Có lỗi xảy ra. Vui lòng thử lại!'); 
            setSuccessMessage('');
            console.error('Error signing up:', error);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
        >
            <Box
                p={4}
                marginTop={5}
                borderRadius={4}
                border={1}
                borderColor="#CCCCCC"
                maxWidth={1000}  
                width="100%"
            >
                <LoginIcon />
                <Typography variant="h5" fontWeight="bold" marginBottom={2}>
                    Create an account
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="success.main">{successMessage}</Typography>}
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="First name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Email address"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={account}
                            onChange={(e) => setaccount(e.target.value)}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Confirm your password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                        <ImageSignUpIcon style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={-10}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                        }
                        label="Show password"
                    />
                </Box>
                
                <Box
                    fullWidth
                    size="large"
                    sx={{
                     mt: 2,
                     border: '1px solid #A5F6BC',
                     backgroundColor: '#A5F6BC',
                     color: 'black',
                     fontWeight: 'bold',
                     cursor: 'pointer',
                     textAlign: 'center',
                     borderRadius: 20,
                     padding: 2,
                    }}
                    onClick={handleSignUp}
                >
                    Create an account
                </Box>

                <Box mt={2} textAlign="center">
                    <Typography>Already have an account?</Typography>
                    <Link
                        to='/signin'
                        style={{ cursor: 'pointer' }}>
                        Log in instead
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
