import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, motDePasse: password });
      loginContext(response.data.token, response.data.utilisateur);
      enqueueSnackbar('Connexion réussie ! 🎉', { variant: 'success' });
      navigate('/influenceurs');
    } catch (err) {
      setError('Email ou mot de passe incorrect.');
      enqueueSnackbar('Erreur de connexion', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#0F0F1A',
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 450,
          borderRadius: 4,
          bgcolor: '#1A1A2E',
          border: '1px solid #2A2A4E',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', color: '#FFFFFF' }}>
          Connexion
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputLabelProps={{ sx: { color: '#B0B0D0' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#2A2A4E' },
                '&:hover fieldset': { borderColor: '#6A35FF' },
                '&.Mui-focused fieldset': { borderColor: '#6A35FF' },
              },
              input: { color: '#FFFFFF' },
            }}
          />

          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{ sx: { color: '#B0B0D0' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#2A2A4E' },
                '&:hover fieldset': { borderColor: '#6A35FF' },
                '&.Mui-focused fieldset': { borderColor: '#6A35FF' },
              },
              input: { color: '#FFFFFF' },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: '#6A35FF',
              '&:hover': { bgcolor: '#5A25EE' },
              borderRadius: 10,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: '#B0B0D0' }}>
          Pas encore de compte ?{' '}
          <Link href="/register" sx={{ color: '#6A35FF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Inscrivez-vous
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}