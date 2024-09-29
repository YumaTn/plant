import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('https://66f96f9fafc569e13a98c7b5.mockapi.io/Sign', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                alert('Sign up successful! Please log in.');
                navigate('/signin');
            } else {
                const data = await response.json();
                setError(data.message || 'Sign up failed');
            }
        } catch (error) {
            setError('Failed to sign up');
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
                    Create an account
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="First name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm your password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Checkbox />
                        <Typography>Show password</Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={handleSignUp}
                >
                    Create an account
                </Button>
                <Box mt={2} textAlign="center">
                    <Typography>Already have an account?</Typography>
                    <Link onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
                        Log in instead
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
