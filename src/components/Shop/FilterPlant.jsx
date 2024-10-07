import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SettingsListIcon } from '../../scss/icon'; // Make sure this path is correct
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function FilterPlant() {
  const [openAllCategories, setOpenAllCategories] = React.useState(false);
  const [openIndoor, setOpenIndoor] = React.useState(false);
  const [openOutdoor, setOpenOutdoor] = React.useState(false);
  const [openMedicinal, setOpenMedicinal] = React.useState(false);

  return (
    <List
      sx={{ width: '264px', height: 'auto', maxWidth: 360, bgcolor: 'background.paper', borderRadius: 1, marginLeft: '60px', top: '109px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* All Categories */}
      <ListItemButton onClick={() => setOpenAllCategories(!openAllCategories)}>
        <ListItemIcon>
          {openAllCategories ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>All Categories</Typography>} />
      </ListItemButton>
      {openAllCategories && (
        <List component="div" disablePadding>
          {/* Indoor Plants */}
          <ListItemButton onClick={() => setOpenIndoor(!openIndoor)} sx={{ pl: 4 }}>
            <ListItemIcon>
              {openIndoor ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Indoor Plants</Typography>} />
          </ListItemButton>
          {openIndoor && (
            <List component="div" disablePadding>
            <Link to="/shop/bonsai" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Bonsai</Typography>} />
              </ListItemButton>
            </Link>

            <Link to="/shop/cactus" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 8 }}>
              <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Cactus</Typography>} />
            </ListItemButton>
            </Link>
            <Link to="/shop/succulents" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 8 }}>
              <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Succulents</Typography>} />
            </ListItemButton>
            </Link>
            <ListItemButton sx={{ pl: 8 }}>
              <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Others</Typography>} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 8 }}>
              <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px', color: 'black', fontWeight: 'bold' }}>Show more</Typography>} />
            </ListItemButton>
          </List>
          )}

          {/* Outdoor Plants */}
          <ListItemButton onClick={() => setOpenOutdoor(!openOutdoor)} sx={{ pl: 4 }}>
            <ListItemIcon>
              {openOutdoor ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Outdoor Plants</Typography>} />
          </ListItemButton>
          {openOutdoor && (
            <List component="div" disablePadding>
              {/* Add outdoor plant items here */}
              <Link to="/shop/seeds" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Seeds</Typography>} />
              </ListItemButton>
              </Link>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Example Outdoor Plant 2</Typography>} />
              </ListItemButton>
            </List>
          )}

          {/* Medicinal Plants */}
          <ListItemButton onClick={() => setOpenMedicinal(!openMedicinal)} sx={{ pl: 4 }}>
            <ListItemIcon>
              {openMedicinal ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Medicinal Plants</Typography>} />
          </ListItemButton>
          {openMedicinal && (
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Example Medicinal Plant 1</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>Example Medicinal Plant 2</Typography>} />
              </ListItemButton>
            </List>
          )}
        </List>
      )}
    </List>
  );
}
