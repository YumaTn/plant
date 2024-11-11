    import React, { useEffect, useState } from 'react';
    import { Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar, IconButton, InputAdornment } from '@mui/material';
    import { Visibility, VisibilityOff } from '@mui/icons-material';
    import axios from 'axios';
    import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import dayjs from 'dayjs';

    const Profile = () => {
        const [showCurrentPassword, setShowCurrentPassword] = useState(false);
        const [showNewPassword, setShowNewPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [gender, setGender] = useState('');
        const [displayName, setDisplayName] = useState('');
        const [address, setAddress] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [email, setEmail] = useState('');

        const handleToggleCurrentPassword = () => {
            setShowCurrentPassword(prev => !prev);
        };

        const handleToggleNewPassword = () => {
            setShowNewPassword(prev => !prev);
        };

        const handleToggleConfirmPassword = () => {
            setShowConfirmPassword(prev => !prev);
        };

        const handleGenderChange = (event) => {
            setGender(event.target.value);
        };

        // Hàm gọi API để lấy thông tin người dùng
        const fetchUserData = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.token && userData.userId) {
                try {
                    const response = await axios.get(`https://exe201be.io.vn/api/user/${userData.userId}`, {
                        headers: {
                            Authorization: `Bearer ${userData.token}`
                        }
                    });

                    if (response.data && response.data.success && response.data.data) {
                        const userInfo = response.data.data;

                        setDisplayName(userInfo.userName || '');
                        setAddress(userInfo.address || '');
                        setPhoneNumber(userInfo.phoneNumber || '');
                        setEmail(userInfo.email || '');
                        setGender(userInfo.gender || '');
                    } else {
                        console.log('Invalid response structure:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        useEffect(() => {
            fetchUserData();
        }, []);

        const handleUpdateUserData = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.token && userData.userId) {
                try {
                    const updatedData = {
                        userName: displayName,
                        address: address,
                        phoneNumber: phoneNumber,
                        email: email,
                        gender: gender,
                    };

                    await axios.put(`https://exe201be.io.vn/api/user/${userData.userId}`, updatedData, {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    });

                    alert('User information updated successfully!');
                } catch (error) {
                    console.error('Error updating user data:', error);
                }
            }
        };


        return (
            <Grid container spacing={4} style={{ padding: 20 }}>
                <Grid item xs={12} sm={3} container justifyContent="center">
                    <Avatar
                        alt="Nhat Sang"
                        src="/path-to-avatar-image.jpg"
                        sx={{ width: 120, height: 120 }}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Grid item xs={12}>
                        <h2>Account Setting</h2>
                    </Grid>

                    <Grid container spacing={4}>
                        {/* Display Name */}
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Display Name"
                                fullWidth
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </Grid>
                        {/* Gender */}
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={handleGenderChange}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Nam</MenuItem>
                                    <MenuItem value="Female">Nữ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        {/* Address */}
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Address"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        {/* Phone Number */}
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Phone Number"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs('yyyy-mm-dd')} />
                        </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: 5 }} item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleUpdateUserData}>Save Changes</Button>
                    </Grid>

                    {/* Billing and Shipping Address Section */}
                    <Grid container spacing={2}>
                        {/* Billing Address */}
                        <Grid item xs={12} md={6}>
                            <h2>Billing Address</h2>
                            <Grid container spacing={3}>
                                {/* First Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="First Name" fullWidth />
                                </Grid>
                                {/* Last Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Last Name" fullWidth />
                                </Grid>
                                {/* Company Name */}
                                <Grid item xs={12}>
                                    <TextField label="Company Name (Optional)" fullWidth />
                                </Grid>
                                {/* Address */}
                                <Grid item xs={12}>
                                    <TextField label="Address" fullWidth />
                                </Grid>
                                {/* Country */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select label="Country">
                                            <MenuItem value="Vietnam">Vietnam</MenuItem>
                                            {/* Add other countries here */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* Region/State */}
                                <Grid item xs={12}>
                                    <TextField label="Region/State" fullWidth />
                                </Grid>
                                {/* City */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="City" fullWidth />
                                </Grid>
                                {/* Zip Code */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Zip Code" fullWidth />
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12}>
                                    <TextField label="Email" type="email" fullWidth />
                                </Grid>
                                {/* Phone Number */}
                                <Grid item xs={12}>
                                    <TextField label="Phone Number" fullWidth />
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>Save Changes</Button>
                        </Grid>

                        {/* Shipping Address */}
                        <Grid item xs={12} md={6}>
                            <h2>Shipping Address</h2>
                            <Grid container spacing={3}>
                                {/* First Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="First Name" fullWidth />
                                </Grid>
                                {/* Last Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Last Name" fullWidth />
                                </Grid>
                                {/* Company Name */}
                                <Grid item xs={12}>
                                    <TextField label="Company Name (Optional)" fullWidth />
                                </Grid>
                                {/* Address */}
                                <Grid item xs={12}>
                                    <TextField label="Address" fullWidth />
                                </Grid>
                                {/* Country */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select label="Country">
                                            <MenuItem value="Vietnam">Vietnam</MenuItem>
                                            {/* Add other countries here */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* Region/State */}
                                <Grid item xs={12}>
                                    <TextField label="Region/State" fullWidth />
                                </Grid>
                                {/* City */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="City" fullWidth />
                                </Grid>
                                {/* Zip Code */}
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Zip Code" fullWidth />
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12}>
                                    <TextField label="Email" type="email" fullWidth />
                                </Grid>
                                {/* Phone Number */}
                                <Grid item xs={12}>
                                    <TextField label="Phone Number" fullWidth />
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>Save Changes</Button>
                        </Grid>
                    </Grid>

                    {/* Change Password Section */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Change Password</h2>
                        </Grid>
                        {/* Current Password */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Current Password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleCurrentPassword}>
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {/* New Password */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleNewPassword}>
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {/* Confirm Password */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleConfirmPassword}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary">Change Password</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    export default Profile;
