import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#436E35',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      backgroundColor: '#FF5733',
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': {
            ...openedMixin(theme),
            backgroundColor: '#F5F5DC',
          },
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': {
            ...closedMixin(theme),
            backgroundColor: '#F5F5DC',
          },
        },
      },
    ],
  })
);

export default function StaffNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null); // Track selected index
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path, index) => {
    setSelectedIndex(index); // Update selected index when a menu item is clicked
    if (path === '/signin') {
      localStorage.clear();
    }
    navigate(path);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/staff/product':
        return 'Sản phẩm';
      case '/staff/profile':
        return 'Thông tin người dùng';
      case '/staff/follow':
        return 'Theo dõi sản phẩm';
      case '/staff':
        return 'Dữ liệu';
      case '/staff/edit/:id':
        return 'Sửa sản phẩm';
        case '/staff/order':
        return 'Sản phẩm đã bán';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/staff', 0)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ backgroundColor: selectedIndex === 0 ? '#FA8232' : 'transparent', '&:hover': { backgroundColor: '#FA8232' } }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/staff/order', 1)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ backgroundColor: selectedIndex === 1 ? '#FA8232' : 'transparent', '&:hover': { backgroundColor: '#FA8232' } }}>
              <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
              <ListItemText primary="Sản phẩm đã bán" />
            </ListItemButton>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/staff/product', 2)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ backgroundColor: selectedIndex === 2 ? '#FA8232' : 'transparent', '&:hover': { backgroundColor: '#FA8232' } }}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Sản phẩm" />
            </ListItemButton>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/staff/profile', 3)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ backgroundColor: selectedIndex === 3 ? '#FA8232' : 'transparent', '&:hover': { backgroundColor: '#FA8232' } }}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Thông tin người dùng" />
            </ListItemButton>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/signin', 4)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ backgroundColor: selectedIndex === 4 ? '#FA8232' : 'transparent', '&:hover': { backgroundColor: '#FA8232' } }}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
