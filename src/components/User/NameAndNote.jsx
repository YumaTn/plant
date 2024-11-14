import { Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const NameAndNote = () => {
  const [buildingInfo, setBuildingInfo] = useState({
    userName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchBuildingInfo = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); // Lấy dữ liệu từ localStorage
        const { userId, token } = userData; // Giả sử id và token đã được lưu trong userData
        const response = await axios.get(`https://exe201be.io.vn/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        const { userName, address, email, phoneNumber } = response.data.data;
        setBuildingInfo({
          
          userName: userName || '', // Nếu không có, để trống
          address: address || '',
          email: email || '',
          phoneNumber: phoneNumber || '',
        });
      } catch (error) {
        console.error('Error fetching building info:', error);
      }
    };

    fetchBuildingInfo();
  }, []);
  return (
    
    <>
    <Typography 
        sx={{
          fontSize:'20px',
          fontWeight:700
        }}
        >
          Hello, {buildingInfo.userName}
        </Typography>
        <Typography>
        From your account dashboard. you can easily check & view your
        <br/>
        Recent Orders, manage your Billing Addresses and
        <br/>
        edit your Password and Account Details.
        </Typography></>
  )
}

export default NameAndNote