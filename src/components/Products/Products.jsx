import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(2),
    minWidth: 180,
    backgroundColor: '#F5F5DC',
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
      marginLeft: 2,
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    zIndex: theme.zIndex.tooltip, // Đảm bảo menu nằm trên các thành phần khác
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F5F5DC',
  color: 'black',
  '&:hover': {
    backgroundColor: alpha('#F5F5DC', 0.8),
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnterButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomButton
        id="demo-customized-button"
        aria-controls={anchorEl ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          marginTop: 2,
          width: '100%', // Đảm bảo nút chiếm toàn bộ chiều rộng của menu
          textAlign: 'left',
        }}
        onMouseEnter={handleMouseEnterButton}
      >
        Sản phẩm
      </CustomButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          onMouseLeave: handleCloseMenu, 
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Link 
        component={Link}
        to="/newproduct"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          New Product
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/bestselling"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Best Selling
        </MenuItem>
        </Link>
        <Divider sx={{ my: 0.5 }} />
        <Link 
        component={Link}
        to="/bonsai"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Bonsai
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/succulents"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Succulent
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/cactus"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Cactus
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/seeds"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Seeds
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/creepers"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Creepers
        </MenuItem>
        </Link>
        <Link 
        component={Link}
        to="/decorateItem"
        style={{ textDecoration: 'none',color:'black' }}
        >
        <MenuItem disableRipple onClick={handleCloseMenu}>
          Decoration items
        </MenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
