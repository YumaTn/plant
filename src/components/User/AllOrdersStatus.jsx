import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, Divider } from '@mui/material';
import { CompletedOrdersIcon, PendingOrdersIcon, TotalOrdersIcon } from '../../scss/icon';

export default function FolderList() {
  return (
        <Box
        sx={{
            marginRight:10
        }}
        >
      <List sx={{ width: '672px', maxWidth: 360, bgcolor: '#EAF6FE', marginBottom:'24px' }}>
      <ListItem>
        <ListItemAvatar sx={{marginRight:2}}>
            <TotalOrdersIcon/>
        </ListItemAvatar>
        <ListItemText primary="Photos"/>
      </ListItem>
    </List>
    <List sx={{ width: '672px', maxWidth: 360, bgcolor: '#FFF3EB',marginBottom:'24px' }}>
        <ListItem>
        <ListItemAvatar sx={{marginRight:2}}>
            <PendingOrdersIcon/>
        </ListItemAvatar>
        <ListItemText primary="Work" />
      </ListItem>
    </List>
    <List sx={{ width: '672px', maxWidth: 360, bgcolor: '#EAF7E9' }}>
    <ListItem>
        <ListItemAvatar sx={{marginRight:2}}    >
            <CompletedOrdersIcon/>
        </ListItemAvatar>
        <ListItemText primary="Vacation"/>
      </ListItem>
    </List>
    </Box>
  );
}
