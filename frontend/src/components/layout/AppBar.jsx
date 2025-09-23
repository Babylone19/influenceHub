import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomAppBar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1A1A2E', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          InfluenceHub
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}>
            Déconnexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}