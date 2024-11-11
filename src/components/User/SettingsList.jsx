import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { SettingsListIcon } from '../../scss/icon';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NestedList() {

  return (
    <List
      sx={{ width: '264px',height:'312px', maxWidth: 360, bgcolor: 'background.paper',borderRadius:1,marginLeft:'60px',top:'109px',marginBottom:50 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link 
        component={Link}
        to="/userlist/user"
        style={{ textDecoration: 'none',color:'black' }}
        >
      <ListItemButton>
        <ListItemIcon>
          <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Dashboard</Typography>}/>
      </ListItemButton>
      </Link>
      <Link 
        component={Link}
        to="/userlist/orderhistory"
        style={{ textDecoration: 'none',color:'black' }}
        >
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Order History</Typography>}/>
      </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Shopping Card</Typography>}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}> Cards & Address</Typography>}/>
      </ListItemButton>
      <Link 
        component={Link}
        to="/userlist/FAQ"
        style={{ textDecoration: 'none',color:'black' }}
        >
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>FAQ</Typography>}/>
      </ListItemButton>
      </Link>
      <Link 
        component={Link}
        to="/userlist/profile"
        style={{ textDecoration: 'none',color:'black' }}
        >
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Setting</Typography>}/>
      </ListItemButton>
      </Link>
      <Link 
        component={Link}
        to="/signin"
        style={{ textDecoration: 'none',color:'black' }}
        >
      <ListItemButton>
        <ListItemIcon>
        <SettingsListIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Logout</Typography>}/>
      </ListItemButton>
      </Link>
    </List>
  );
}
