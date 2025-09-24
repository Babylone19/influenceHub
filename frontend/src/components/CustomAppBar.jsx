
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomAppBar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#1A1A2E', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, cursor: 'pointer' }}
          onClick={handleHome}
        >
          InfluenceHub
        </Typography>
        {isAuthenticated && (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
            startIcon={<LogoutIcon />}
          >
            Déconnexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
