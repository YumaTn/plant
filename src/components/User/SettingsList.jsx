import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SettingsListIcon } from '../../scss/icon';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function NestedList() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(null); // State to track active item

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  const handleListItemClick = (index) => {
    setActiveIndex(index); // Update active item index
  };

  return (
    <List
      sx={{
        width: '264px',
        height: '312px',
        maxWidth: 360,
        bgcolor: '#F0F5F0',
        borderRadius: 1,
        marginLeft: '60px',
        top: '109px',
        marginBottom: 50,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link
        component={Link}
        to="/userlist/user"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <ListItemButton
          onClick={() => handleListItemClick(0)} // Set active item when clicked
          sx={{
            backgroundColor: activeIndex === 0 ? '#FA8232' : 'transparent', // Set focus color to #FA8232 (orange)
            '&:hover': { backgroundColor: '#FA8232' }, // Hover effect with focus color
            color: activeIndex === 0 ? 'white' : 'black', // White text for active item
          }}
        >
          <ListItemIcon>
            <SettingsListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Dashboard</Typography>} />
        </ListItemButton>
      </Link>

      <Link
        component={Link}
        to="/userlist/orderhistory"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <ListItemButton
          onClick={() => handleListItemClick(1)} // Set active item when clicked
          sx={{
            backgroundColor: activeIndex === 1 ? '#FA8232' : 'transparent', // Set focus color to #FA8232 (orange)
            '&:hover': { backgroundColor: '#FA8232' }, // Hover effect with focus color
            color: activeIndex === 1 ? 'white' : 'black', // White text for active item
          }}
        >
          <ListItemIcon>
            <SettingsListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Order History</Typography>} />
        </ListItemButton>
      </Link>

      <Link
        component={Link}
        to="/userlist/FAQ"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <ListItemButton
          onClick={() => handleListItemClick(2)} // Set active item when clicked
          sx={{
            backgroundColor: activeIndex === 2 ? '#FA8232' : 'transparent', // Set focus color to #FA8232 (orange)
            '&:hover': { backgroundColor: '#FA8232' }, // Hover effect with focus color
            color: activeIndex === 2 ? 'white' : 'black', // White text for active item
          }}
        >
          <ListItemIcon>
            <SettingsListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>FAQ</Typography>} />
        </ListItemButton>
      </Link>

      <Link
        component={Link}
        to="/userlist/profile"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <ListItemButton
          onClick={() => handleListItemClick(3)} // Set active item when clicked
          sx={{
            backgroundColor: activeIndex === 3 ? '#FA8232' : 'transparent', // Set focus color to #FA8232 (orange)
            '&:hover': { backgroundColor: '#FA8232' }, // Hover effect with focus color
            color: activeIndex === 3 ? 'white' : 'black', // White text for active item
          }}
        >
          <ListItemIcon>
            <SettingsListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Setting</Typography>} />
        </ListItemButton>
      </Link>

      <Link
        component={Link}
        to="/signin"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <ListItemButton
          onClick={handleLogout}
          sx={{
            backgroundColor: activeIndex === 4 ? '#FA8232' : 'transparent', // Set focus color to #FA8232 (orange)
            '&:hover': { backgroundColor: '#FA8232' }, // Hover effect with focus color
            color: activeIndex === 4 ? 'white' : 'black', // White text for active item
          }}
        >
          <ListItemIcon>
            <SettingsListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Logout</Typography>} />
        </ListItemButton>
      </Link>
    </List>
  );
}
