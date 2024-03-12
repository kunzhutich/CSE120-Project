import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem, Dialog,
        DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = ['FS Orders', 'M Orders', 'F Orders', 'H1', 'H2', 'H3', 'H4', 'H5', 'UN', 'M'];
const settings = ['Lat', 'SG', 'Name', 'Phone Number', 'Flow', 'Type'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  return (
    <>
      <AppBar position="static" sx={{backgroundColor: "#00587c"}}>
          <Toolbar backgroundColor="#00587c">
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                keepMounted
                transformOrigin={{vertical: 'top',horizontal: 'left',}}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{display: {xs: 'block', md: 'none'},}}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',}}>
            </Typography>
            <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{my: 2, color: 'white', display: 'block'}}>
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenSettingsDialog} sx={{p:0}}>
                    <SettingsIcon sx={{color: 'white'}}/>
                </IconButton>
              </Tooltip>
              <Dialog open={openSettingsDialog} onClose={handleCloseSettingsDialog}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent sx={{
                    width: '300px',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                  {settings.map((setting) => (
                    <Typography key={setting} textAlign="left" sx={{my:1}}>
                      {setting}
                    </Typography>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSettingsDialog}>Close</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
