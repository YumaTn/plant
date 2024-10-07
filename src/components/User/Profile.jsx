import {React,useState} from 'react';
import { Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Profile = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleToggleCurrentPassword = () => {
        setShowCurrentPassword(prev => !prev);
    };

    const handleToggleNewPassword = () => {
        setShowNewPassword(prev => !prev);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
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
                {/* Account Settings */}
                <Grid item xs={12}>
                    <h2>Account Setting</h2>
                </Grid>

                <Grid container spacing={4}>
                    {/* Display Name */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Display Name" fullWidth />
                    </Grid>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Full Name" fullWidth />
                    </Grid>
                    {/* Username */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Username" fullWidth />
                    </Grid>
                    {/* Email */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Email" type="email" fullWidth />
                    </Grid>
                    {/* Secondary Email */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Secondary Email" fullWidth />
                    </Grid>
                    {/* Phone Number */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField label="Phone Number" fullWidth />
                    </Grid>
                    {/* Country/Region */}
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Country/Region</InputLabel>
                            <Select label="Country/Region">
                                <MenuItem value="Vietnam">Vietnam</MenuItem>
                                {/* Add other countries here */}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* State */}
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField label="State" fullWidth />
                    </Grid>
                    {/* Zip Code */}
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField label="Zip Code" fullWidth />
                    </Grid>
                </Grid>

                <Grid sx={{ marginTop: 5 }} item xs={12}>
                    <Button variant="contained" color="primary">Save Changes</Button>
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
