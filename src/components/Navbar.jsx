import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = React.useState(0);

  const fetchCartData = async () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const token = JSON.parse(userData)?.token;
      try {
        const response = await axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const orderDetails = response.data.data.orderDetails;
          const totalQuantity = orderDetails.reduce((total, item) => total + item.quantity, 0);
          setCartItemCount(totalQuantity);
        } else {
          setCartItemCount(0);
        }
      } catch (error) {
        setCartItemCount(0);
        console.error('Error fetching cart data:', error);
      }
    } else {
      setCartItemCount(0);
    }
  };

  // Run the fetchCartData function every time the location changes
  React.useEffect(() => {
    fetchCartData();
  }, [location]);

  const handleUserIconClick = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/userlist/user');
    } else {
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
              Cửa hàng
            </Button>
            <Button component={Link} to="/blog" sx={{ my: 2, color: 'black', display: 'block', marginLeft: 4 }}>
              Blog
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton component={Link} to="/cart">
              <CartIcon />
              {cartItemCount > 0 && (
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    padding: '2px 6px',
                  }}
                >
                  {cartItemCount}
                </Typography>
              )}
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
