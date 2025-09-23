import React from 'react';
import { Box } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F0F1A' }}>
      <AppRoutes />
    </Box>
  );
}

export default App;