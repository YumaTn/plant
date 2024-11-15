import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import axios from 'axios';

const SignIn = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Xử lý phản hồi đăng nhập Google
    const responseGoogle = async (credentialResponse) => {
        if (credentialResponse?.credential) {
            const googleId = credentialResponse.credential;
            console.log("googleId: ", googleId);
            try {
                // Gửi yêu cầu đăng nhập
                const apiResponse = await axios.post('https://exe201be.io.vn/api/user/loginmail',
                    { googleId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                console.log("API Response:", apiResponse);

                // Kiểm tra dữ liệu trả về
                if (apiResponse?.data?.data) {
                    const { token, user } = apiResponse.data.data;
                    const userData = {
                        token,
                        userId: user.id,
                        roleName: user.roleName,  // Thêm roleName vào dữ liệu lưu trữ
                    };

                    // Lưu thông tin người dùng vào localStorage
                    localStorage.setItem('userData', JSON.stringify(userData));
                    console.log('Stored userData:', localStorage.getItem('userData'));

                    setSuccessMessage('Đăng nhập thành công!');

                    // Điều hướng theo roleName
                    switch (userData.roleName) {
                        case 'User':
                            navigate('/userlist/user');
                            break;
                        case 'Staff':
                            navigate('/staff');
                            break;
                        case 'Admin':
                            navigate('/admin');
                            break;
                        default:
                            setError('Không xác định được quyền truy cập.');
                            console.log('Unknown roleName:', userData.roleName);
                    }
                } else {
                    setError('Dữ liệu không hợp lệ từ API.');
                    console.log('Invalid response structure:', apiResponse.data);
                }
            } catch (error) {
                // Xử lý lỗi
                console.error('Error login with Google:', error.response ? error.response.data : error.message);
                setError('Có lỗi xảy ra khi đăng nhập bằng Google.');
                setSuccessMessage('');
            }
        } else {
            console.log('Login failed', credentialResponse);
            setError('Không có thông tin đăng nhập từ Google.');
        }
    };


    // Đăng nhập email và password
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

            if (response.data.data) {
                const userData = {
                    token: response.data.data.token,
                    userId: response.data.data.user.id,
                    roleName: response.data.data.user.roleName,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                setSuccessMessage('Đăng nhập thành công!');
                console.log(response.data.data.user.roleName,)
                // Điều hướng dựa trên roleName
                if (userData.roleName === 'User') {
                    navigate('/userlist/user');
                } else if (userData.roleName === 'Staff') {
                    navigate('/staff');
                } else if (userData.roleName === 'Admin') {
                    navigate('/admin');
                }
            } else {
                setError('Dữ liệu không hợp lệ từ API.');
            }
        } catch (error) {
            console.error('Error login:', error.response ? error.response.data : error.message);
            setError('Có lỗi xảy ra. Vui lòng thử lại!');
            setSuccessMessage('');
        }
    };


    // Chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f9f9f9" flexDirection="column">
            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Sign in
                </Typography>
            </Box>
            <Box p={4} marginTop={5} borderRadius={4} border={1} borderColor="#CCCCCC" maxWidth={500} width="100%">
                <Typography sx={{ textAlign: 'center' }} variant="h5" fontWeight="bold" gutterBottom>
                    Sign in
                </Typography>
                {successMessage && <Typography color="success.main">{successMessage}</Typography>}
                {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
                <TextField
                    label="Email or mobile phone number"
                    fullWidth
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
                    sx={{ mt: 2, backgroundColor: '#A5F6BC', color: 'black', fontWeight: 'bold', borderRadius: 40 }}
                    onClick={handleSignIn}
                >
                    Log in
                </Button>
                    <GoogleOAuthProvider clientId="428558537254-k9petgo1lqik4aldtokef39jeibi57l4.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => setError('Có lỗi xảy ra khi đăng nhập bằng Google.')}
                        />
                    </GoogleOAuthProvider>
                    <Typography align="center" sx={{ mt: 2 }}>
                    Bạn chưa có tài khoản?{' '}
                    <Link to="/signup" style={{ color: '#A5F6BC', fontWeight: 'bold', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                    </Typography>
            </Box>
        </Box>
    );
};

export default SignIn;
