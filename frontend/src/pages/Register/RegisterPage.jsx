import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { useSnackbar } from 'notistack';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      setLoading(false);
      return;
    }

    try {
      await register({ email, motDePasse: password, nom });
      enqueueSnackbar('Compte créé avec succès ! Veuillez vous connecter.', { variant: 'success' });
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de la création du compte. Cet email existe peut-être déjà.');
      enqueueSnackbar('Erreur d’inscription', { variant: 'error' });
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
          Inscription
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom complet"
            fullWidth
            margin="normal"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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
            helperText="Minimum 6 caractères"
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
            {loading ? 'Création...' : 'S’inscrire'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: '#B0B0D0' }}>
          Déjà un compte ?{' '}
          <Link href="/login" sx={{ color: '#6A35FF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Connectez-vous
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}