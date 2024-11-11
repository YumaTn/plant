import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LineIcon, LoginIcon } from '../../scss/icon';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import googleIcon from '../../scss/google.webp'
const SignIn = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const responseGoogle = async (response) => {
        if (response.profileObj) {
            const googleId = response.profileObj.googleId || response.profileObj.id || response.profileObj.sub;
    
            console.log('Google ID:', googleId);
    
            if (!googleId) {
                setError('Google ID không hợp lệ.');
                return;
            }
    
            try {
                // Gọi API với googleId trong URL
                const apiResponse = await axios.post(`https://exe201be.io.vn/api/user/loginmail/${googleId}`);
    
                console.log('API Response:', apiResponse.data);
    
                if (apiResponse.data.data) {
                    const userData = {
                        token: apiResponse.data.data.token,
                        userId: apiResponse.data.data.user.id,
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    console.log('Stored userData:', localStorage.getItem('userData'));
    
                    setSuccessMessage('Đăng nhập thành công!');
                    if (userData.roleName === 'User') {
                        navigate('/userlist/user');
                    } else {
                        setError('Vai trò của bạn không được hỗ trợ.');
                    }
                } else {
                    setError('Dữ liệu không hợp lệ từ API.');
                    console.log('Invalid response structure:', apiResponse.data);
                }
            } catch (error) {
                console.error('Error login with Google:', error.response ? error.response.data : error.message);
                setError('Có lỗi xảy ra khi đăng nhập bằng Google.');
                setSuccessMessage('');
            }
        } else {
            console.log('Login failed', response);
        }
    };
    
    
    const handleSignIn = async () => {
        try {
            const response = await axios.post('https://exe201be.io.vn/api/user/login', {
                account,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API Response:', response.data);
            if (response.data.data) {
                const userData = {
                    token: response.data.data.token,
                    userId: response.data.data.user.id,
                };
                // Lưu vào localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log('Stored userData:', localStorage.getItem('userData'));

                setSuccessMessage('Đăng nhập thành công!');
                navigate('/userlist/user');
            } else {
                setError('Dữ liệu không hợp lệ từ API.');
                console.log('Invalid response structure:', response.data);
            }
        } catch (error) {
            console.error('Error login:', error.response ? error.response.data : error.message);
            setError('Có lỗi xảy ra. Vui lòng thử lại!');
            setSuccessMessage('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            bgcolor="#f9f9f9"
            flexDirection="column"
        >
            <Box sx={{ marginTop: 5 }}>
                <LoginIcon />
            </Box>
            <Box
                p={4}
                marginTop={5}
                borderRadius={4}
                border={1}
                borderColor="#CCCCCC"
                maxWidth={500}
                width="100%"
            >
                <Typography
                    sx={{ textAlign: 'center', fontFamily: 'Poppins' }}
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    Sign in
                </Typography>
                {successMessage && <Typography color="success.main">{successMessage}</Typography>}
                {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
                <TextField
                    label="Email or mobile phone number"
                    fullWidth
                    sx={{
                        borderWidth: 1,
                        borderRadius: 2,
                    }}
                    variant="outlined"
                    margin="normal"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                />
                <Box textAlign="right">
                    <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                    </IconButton>
                </Box>
                <TextField
                    label="Your password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    color="success"
                    fullWidth
                    size="large"
                    sx={{
                        mt: 2,
                        border: '1px solid #A5F6BC',
                        backgroundColor: '#A5F6BC',
                        color: 'black',
                        fontWeight: 'bold',
                        borderRadius: 40
                    }}
                    onClick={handleSignIn}
                >
                    Log in
                </Button>

                <GoogleLogin
                    clientId="428558537254-k9petgo1lqik4aldtokef39jeibi57l4.apps.googleusercontent.com"
                    render={renderProps => (
                        <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#A5F6BC',
                                },
                                width: '100%',
                                padding: '12px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img src={googleIcon} alt="Google" style={{ width: '24px', marginRight: '8px' }} />
                            Đăng nhập bằng Google
                        </Button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </Box>
            <Box mt={2} textAlign="center">
                <Typography sx={{ color: 'gray', marginBottom: 2, marginTop: 2 }}>
                    <LineIcon /> New to our community? <LineIcon />
                </Typography>
                <Box
                    sx={{
                        border: '1px solid black',
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderRadius: 10,
                        marginLeft: 2.5,
                        maxWidth: 500,
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/signup')}
                >
                    <Link sx={{ textDecoration: 'none', color: 'black' }}>
                        Create an account
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignIn;
