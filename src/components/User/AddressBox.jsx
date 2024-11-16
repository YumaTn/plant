import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FolderList() {
  const [buildingInfo, setBuildingInfo] = useState({
    userName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchBuildingInfo = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); 
        const { userId, token } = userData; 
        const response = await axios.get(`https://exe201be.io.vn/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const { userName, address, email, phoneNumber } = response.data.data;
        setBuildingInfo({
          
          userName: userName || '',
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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: 2, borderRadius: '1px solid black', marginRight: 1 }}>
      <nav aria-label="main mailbox folders">
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 550, textAlign: 'start', padding: 1, marginLeft: 2 }}>Thông tin địa chỉ</Typography>} />
      </nav>
      <Divider />
      <ListItem>
        <Box sx={{ flexGrow: 1, marginLeft: 5 }}>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 700 }}>{buildingInfo.userName}</Typography>}
          />
          <ListItemText
            secondary={ buildingInfo.address || ' '}
          />
          <ListItemText
            secondary={buildingInfo.email || ' '} 
          />
          <ListItemText
            secondary={buildingInfo.phoneNumber || ' '} 
          />
        </Box>
      </ListItem>
    </List>
  );
}
