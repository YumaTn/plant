import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Divider, Typography } from '@mui/material';

export default function FolderList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginLeft:2,borderRadius:'1px solid black',marginRight:1 }}>
        <nav aria-label="main mailbox folders">
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 550,textAlign:'start',padding:1,marginLeft:2 }}>ACCOUNT INFO</Typography>} />
        </nav>
        <Divider />
      <ListItem sx={{
        
      }}>
        <Box sx={{ flexGrow: 1,marginLeft:5 }}>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 700 }}>Nhat Sang</Typography>}
          />
          <ListItemText
            secondary="Thu Duc,Ho Chi Minh"
          />
          <ListItemText
            secondary="admin123@gmail.com"
          />
          <ListItemText
            secondary="+84 1234 56789"
          />
          <Button
          sx={{
            border:1,
            marginTop:2
          }}
          >
            EDIT ACCOUNT
          </Button>
        </Box>
      </ListItem>
    </List>
  );
}
