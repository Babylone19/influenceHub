// MainLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import CustomAppBar from '../components/CustomAppBar';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CustomAppBar />
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
