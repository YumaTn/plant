import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { CartIcon, UserIcon } from '../scss/icon';
import Products from './Products/Products'
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#F5F5DC' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:'black' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:'space-evenly' }}>
              <Products/>
            <Button
              component={Link}
              to="/blog"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block',marginLeft:4 }}
            >
              Blog
            </Button>
            <Button
              component={Link}
              to="/contact"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block',marginLeft:4 }}
            >
              Contact
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <Typography
              component={Link}
              to='/cart'
              >
                <CartIcon/>
              </Typography>
            </IconButton>
              <Typography
              component={Link}
              to="/user"
              sx={{
                marginLeft:5,
                marginRight:5,
              }}
              >
                <IconButton>
              <UserIcon/>
              </IconButton>
              </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
