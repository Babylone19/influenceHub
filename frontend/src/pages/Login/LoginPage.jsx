import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  keyframes,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';

// Animation d'entrée douce
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animation de pulsation douce pour le bouton principal
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(106, 53, 255, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(106, 53, 255, 0); }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Vérifie si le formulaire est valide (email + mot de passe)
  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim().length >= 6);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError('');
    setLoading(true);

    try {
      const response = await login({ email, motDePasse: password });
      loginContext(response.data.token, response.data.utilisateur);
      enqueueSnackbar('✅ Connexion réussie — Bienvenue !', { variant: 'success', autoHideDuration: 3000 });
      navigate('/influenceurs');
    } catch (err) {
      setError('Email ou mot de passe incorrect. Veuillez réessayer.');
      enqueueSnackbar('❌ Échec de la connexion', { variant: 'error' });
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
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, rgba(106, 53, 255, 0.08), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 194, 255, 0.08), transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Décoration flottante subtile */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(106, 53, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(0, 194, 255, 0.08)',
          animation: 'float 10s ease-in-out infinite 1s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-15px)' },
          },
        }}
      />

      {/* Conteneur principal — animé, élégant */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: isMobile ? 3 : 4,
          width: '100%',
          maxWidth: 480,
          borderRadius: 4,
          bgcolor: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(106, 53, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          animation: `${fadeIn} 0.8s ease-out`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #6A35FF, #00C2FF)',
          },
        }}
      >
        {/* Titre — impact fort */}
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: '#FFFFFF',
            mb: 1,
            background: 'linear-gradient(90deg, #6A35FF, #00C2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          InfluenceHub
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#B0B0D0',
            mb: 4,
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          Connectez-vous à votre espace professionnel
        </Typography>

        {/* Message d'erreur */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: 'rgba(255, 69, 58, 0.1)',
              border: '1px solid rgba(255, 69, 58, 0.3)',
              color: '#FF6B6B',
              '& .MuiAlert-icon': { color: '#FF6B6B' },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Champ Email */}
        <TextField
          label="Adresse e-mail"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          autoFocus
          InputLabelProps={{
            sx: {
              color: '#B0B0D0',
              fontWeight: 500,
              '&.Mui-focused': {
                color: '#6A35FF',
              },
            },
          }}
          InputProps={{
            sx: {
              color: '#FFFFFF',
              bgcolor: 'rgba(15, 15, 30, 0.4)',
              borderRadius: 2,
              '& fieldset': {
                borderColor: '#2A2A4E',
                borderWidth: '1.5px !important',
              },
              '&:hover fieldset': {
                borderColor: '#6A35FF !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6A35FF !important',
                borderWidth: '2px !important',
              },
            },
          }}
          sx={{ mb: 2.5 }}
        />

        {/* Champ Mot de passe */}
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          InputLabelProps={{
            sx: {
              color: '#B0B0D0',
              fontWeight: 500,
              '&.Mui-focused': {
                color: '#6A35FF',
              },
            },
          }}
          InputProps={{
            sx: {
              color: '#FFFFFF',
              bgcolor: 'rgba(15, 15, 30, 0.4)',
              borderRadius: 2,
              '& fieldset': {
                borderColor: '#2A2A4E',
                borderWidth: '1.5px !important',
              },
              '&:hover fieldset': {
                borderColor: '#6A35FF !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6A35FF !important',
                borderWidth: '2px !important',
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        {/* Bouton de connexion — premium */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading || !isFormValid}
          sx={{
            py: 1.5,
            borderRadius: 10,
            fontWeight: 700,
            textTransform: 'none',
            letterSpacing: '0.8px',
            fontSize: '1.05rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            bgcolor: isFormValid ? '#6A35FF' : '#3A3A5A',
            color: isFormValid ? '#FFFFFF' : '#7A7A9A',
            '&:hover': {
              bgcolor: isFormValid ? '#5A25EE' : '#3A3A5A',
              transform: isFormValid ? 'scale(1.02)' : 'none',
              boxShadow: isFormValid ? '0 6px 20px rgba(106, 53, 255, 0.5)' : 'none',
            },
            ...(isFormValid && {
              animation: `${pulseGlow} 2s infinite`,
            }),
          }}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>

        {/* Lien d'inscription — stylisé */}
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            textAlign: 'center',
            color: '#B0B0D0',
            '& a': {
              color: '#6A35FF',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'linear-gradient(90deg, #6A35FF, #00C2FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                textDecoration: 'underline',
                filter: 'brightness(1.2)',
              },
            },
          }}
        >
          Pas encore de compte ?{' '}
          <Link href="/register" underline="hover">
            Créez votre compte gratuitement
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}