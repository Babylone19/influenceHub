// src/App.jsx
import { Box } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#0F0F1A',
    }}>
      <AppRoutes />
    </Box>
  );
}

export default App;
