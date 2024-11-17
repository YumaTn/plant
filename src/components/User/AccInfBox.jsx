import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FolderList() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); 
        const { userId, token } = userData; 
        const response = await axios.get(`https://exe201be.io.vn/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const { userName, address, email, phoneNumber,imgUrl } = response.data.data;
        setUserInfo({
          imgUrl: imgUrl || '',
          userName: userName || '', 
          address: address || '',
          email: email || '',
          phoneNumber: phoneNumber || '',
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 550, textAlign: 'start', padding: 1, marginLeft: 2 }}>Thông tin người dùng</Typography>} />
      </nav>
      <Divider />
      <ListItem>
        <ListItemAvatar>
        <Avatar
                    alt="User Avatar"
                    src={userInfo.imgUrl || "/path-to-avatar-image.jpg"}  
                    sx={{ width: 50, height: 50 }}
                />
        </ListItemAvatar>
        <Box sx={{ flexGrow: 1 }}>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 700 }}>{userInfo.userName}</Typography>}
          />
          <ListItemText
            secondary={userInfo.address}
          />
          <ListItemText
            secondary={userInfo.email}
          />
          <ListItemText
            secondary={userInfo.phoneNumber}
          />
          <Link to="/userlist/profile">
            <Button
              sx={{
                border: 1,
                marginTop: 2,
              }}
            >
              Sửa thông tin người dùng
            </Button>
          </Link>
        </Box>
      </ListItem>
    </List>
  );
}
