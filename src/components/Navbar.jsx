import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { CartIcon, UserIcon } from '../scss/icon';
import Products from './Products/Products';
import Logo from '../scss/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  // Hàm xử lý khi bấm vào UserIcon
  const handleUserIconClick = () => {
    // Kiểm tra nếu có dữ liệu đăng nhập trong localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Nếu đã đăng nhập, điều hướng đến trang người dùng
      navigate('/userlist/user');
    } else {
      // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
      navigate('/signin');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#F5F5DC' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '50px', height: 'auto', marginRight: '16px' }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            <Products />
            <Button component={Link} to="/shop/AllProduct" sx={{ my: 2, color: 'black', display: 'block', marginLeft: 4 }}>
              Shop
            </Button>
            <Button component={Link} to="/blog" sx={{ my: 2, color: 'black', display: 'block', marginLeft: 4 }}>
              Blog
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton component={Link} to="/cart">
              <CartIcon />
            </IconButton>
            <IconButton onClick={handleUserIconClick} sx={{ marginLeft: 5, marginRight: 5 }}>
              <UserIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
