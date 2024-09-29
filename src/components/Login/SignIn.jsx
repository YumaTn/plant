import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await fetch('https://66f96f9fafc569e13a98c7b5.mockapi.io/Sign');
            const users = await response.json();
            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                alert('Login successful!');
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Failed to sign in');
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
                borderRadius={4}
                boxShadow={3}
                maxWidth={400}
                bgcolor="white"
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Sign in
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Email or mobile phone number"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Your password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={handleSignIn}
                >
                    Log in
                </Button>
                <Box mt={2} textAlign="center">
                    <Typography>New to our community?</Typography>
                    <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                        Create an account
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignIn;
