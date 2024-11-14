import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar } from '@mui/material';
import axios from 'axios';
import FileUploader from '../Firebase/FileUploader'; // Import your FileUploader component

const Profile = () => {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [gender, setGender] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');  

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
                    setAvatarUrl(userInfo.imgUrl || '');  
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
                    imgUrl: avatarUrl,  // Cập nhật ảnh nếu có
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
            <Grid item xs={12} sm={3} direction="column" container justifyContent="center" sx={{}}>
                <Avatar
                    alt="User Avatar"
                    src={avatarUrl || "/path-to-avatar-image.jpg"}  // Hiển thị ảnh từ URL hoặc ảnh mặc định
                    sx={{ width: 120, height: 120 }}
                />
                <FileUploader 
                    onUploadSuccess={(url) => setAvatarUrl(url)}
                    defaultImage={avatarUrl} 
                />
            </Grid>
            <Grid item xs={12} sm={9}>
                <Grid item xs={12}>
                    <h2>Account Setting</h2>
                </Grid>

                <Grid container spacing={4}>
                    {/* Các trường thông tin */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Display Name"
                            fullWidth
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Grid>
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
                </Grid>

                <Grid sx={{ marginTop: 5 }} item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleUpdateUserData}>Save Changes</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
