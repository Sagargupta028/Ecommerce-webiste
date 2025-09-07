import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';


export default function AdminNavbar({handleSideBarViewInMobile}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // handleCloseUserMenu();
    // dispatch(logout());
    navigate("/")
  };
  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/admin'); }}>
        <IconButton size="large" color="inherit">
          <DashboardIcon />
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/admin/orders'); }}>
        <IconButton size="large" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <p>Orders</p>
      </MenuItem>
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/admin/products'); }}>
        <IconButton size="large" color="inherit">
          <InventoryIcon />
        </IconButton>
        <p>Products</p>
      </MenuItem>
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/admin/customers'); }}>
        <IconButton size="large" color="inherit">
          <PeopleIcon />
        </IconButton>
        <p>Customers</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + isLargeScreen, backgroundColor: 'rgb(0, 0, 22)' }}>
        <Toolbar>
          {!isLargeScreen && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleSideBarViewInMobile}
          >
            <MenuIcon />
          </IconButton>}
          <Avatar alt="Zosh" src="https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png" />
          <Typography variant="h6" component="div" sx={{ ml: 2, flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" onClick={() => navigate('/admin')}>
              <DashboardIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => navigate('/admin/orders')}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => navigate('/admin/products')}>
              <InventoryIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => navigate('/admin/customers')}>
              <PeopleIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}