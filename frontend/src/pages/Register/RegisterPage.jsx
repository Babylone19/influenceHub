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
import { register } from '../../services/authService';
import { useSnackbar } from 'notistack';

// Animation d'entrée
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animation de pulsation pour le bouton actif
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(106, 53, 255, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(106, 53, 255, 0); }
`;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Validation en temps réel
  useEffect(() => {
    setIsFormValid(
      nom.trim().length >= 2 &&
      email.trim().includes('@') &&
      password.trim().length >= 6
    );
  }, [nom, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError('');
    setLoading(true);

    try {
      await register({ email, motDePasse: password, nom });
      enqueueSnackbar('✅ Compte créé avec succès ! Bienvenue sur InfluenceHub.', {
        variant: 'success',
        autoHideDuration: 4000,
      });
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de la création du compte. Cet email existe peut-être déjà.');
      enqueueSnackbar('❌ Échec de l’inscription', { variant: 'error' });
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
          background: 'radial-gradient(circle at 20% 80%, rgba(106, 53, 255, 0.06), transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 194, 255, 0.06), transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Décorations flottantes discrètes */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '12%',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(0, 194, 255, 0.07)',
          animation: 'float 9s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-18px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '18%',
          right: '10%',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(106, 53, 255, 0.07)',
          animation: 'float 11s ease-in-out infinite 0.5s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-12px)' },
          },
        }}
      />

      {/* Conteneur principal — stylé, animé, professionnel */}
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
            background: 'linear-gradient(90deg, #00C2FF, #6A35FF)',
          },
        }}
      >
        {/* Titre — impact fort, branding cohérent */}
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: '#FFFFFF',
            mb: 1,
            background: 'linear-gradient(90deg, #00C2FF, #6A35FF)',
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
          Créez votre compte professionnel en quelques secondes
        </Typography>

        {/* Message d'erreur stylisé */}
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

        {/* Champ Nom */}
        <TextField
          label="Nom complet"
          fullWidth
          margin="normal"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          autoComplete="name"
          autoFocus
          InputLabelProps={{
            sx: {
              color: '#B0B0D0',
              fontWeight: 500,
              '&.Mui-focused': { color: '#00C2FF' },
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
                borderColor: '#00C2FF !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00C2FF !important',
                borderWidth: '2px !important',
              },
            },
          }}
          sx={{ mb: 2.5 }}
        />

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
          InputLabelProps={{
            sx: {
              color: '#B0B0D0',
              fontWeight: 500,
              '&.Mui-focused': { color: '#00C2FF' },
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
                borderColor: '#00C2FF !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00C2FF !important',
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
          helperText={
            <Typography
              variant="caption"
              sx={{
                color: password.length >= 6 ? '#4CAF50' : '#FF6B6B',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {password.length >= 6 ? '✅ Sécurité suffisante' : '⚠️ Minimum 6 caractères'}
            </Typography>
          }
          autoComplete="new-password"
          InputLabelProps={{
            sx: {
              color: '#B0B0D0',
              fontWeight: 500,
              '&.Mui-focused': { color: '#00C2FF' },
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
                borderColor: '#00C2FF !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00C2FF !important',
                borderWidth: '2px !important',
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        {/* Bouton d'inscription — intelligent, animé */}
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
            bgcolor: isFormValid ? '#00C2FF' : '#3A3A5A',
            color: isFormValid ? '#FFFFFF' : '#7A7A9A',
            '&:hover': {
              bgcolor: isFormValid ? '#00A2DD' : '#3A3A5A',
              transform: isFormValid ? 'scale(1.02)' : 'none',
              boxShadow: isFormValid ? '0 6px 20px rgba(0, 194, 255, 0.5)' : 'none',
            },
            ...(isFormValid && {
              animation: `${pulseGlow} 2s infinite`,
            }),
          }}
        >
          {loading ? 'Création en cours...' : 'S’inscrire gratuitement'}
        </Button>

        {/* Lien de connexion — stylé, branding fort */}
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            textAlign: 'center',
            color: '#B0B0D0',
            '& a': {
              color: '#00C2FF',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'linear-gradient(90deg, #00C2FF, #6A35FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                textDecoration: 'underline',
                filter: 'brightness(1.2)',
              },
            },
          }}
        >
          Déjà un compte ?{' '}
          <Link href="/login" underline="hover">
            Connectez-vous ici
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}