import React from 'react';
import { Container, Typography, Button, Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0F0F1A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        backgroundImage: 'radial-gradient(circle at 30% 30%, #6A35FF33, transparent 40%), radial-gradient(circle at 70% 70%, #00C2FF33, transparent 40%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw', // ← Occupe toute la largeur de l'écran
        overflow: 'hidden', // ← Empêche les débordements
      }}
    >
      {/* Conteneur central */}
      <Container
        maxWidth="md"
        sx={{
          p: 4,
          backgroundColor: 'rgba(15, 15, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(106, 53, 255, 0.2)',
          borderRadius: 10,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '90%', // ← Adapté aux petits écrans
        }}
      >
        {/* Titre */}
        <Typography
          variant={isMobile ? 'h3' : 'h1'}
          component="h1"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #6A35FF, #00C2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: isMobile ? '2rem' : '3rem',
          }}
        >
          InfluenceHub
        </Typography>

        {/* Sous-titre */}
        <Typography
          variant={isMobile ? 'body1' : 'h5'}
          sx={{
            color: '#B0B0D0',
            mb: 4,
            maxWidth: '100%',
            lineHeight: 1.6,
          }}
        >
          La plateforme ultime pour découvrir, gérer et analyser les profils d’influenceurs du monde entier.
        </Typography>

        {/* Boutons */}
        <Grid container spacing={2} justifyContent="center">
          {!isAuthenticated ? (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    bgcolor: '#6A35FF',
                    '&:hover': { bgcolor: '#5A25EE' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                  onClick={() => navigate('/register')}
                >
                  Commencer gratuitement
                </Button>
              </Grid>
              <Grid item>
                {/* <Button
                  variant="outlined"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    borderColor: '#6A35FF',
                    color: '#6A35FF',
                    '&:hover': { bgcolor: '#6A35FF11', borderColor: '#5A25EE' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                  onClick={() => navigate('/login')}
                >
                  Se connecter
                </Button> */}
                <Button
                    onClick={() => {
                        console.log("Redirection forcée vers /register...");
                        window.location.href = "/register";
                    }}
                    variant="contained"
                    sx={{
                        bgcolor: '#6A35FF',
                        '&:hover': { bgcolor: '#5A25EE' },
                        px: 4,
                        py: 1.5,
                        borderRadius: 10,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                    >
                    ⚡ Test Forcé Inscription
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Button
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  bgcolor: '#00C2FF',
                  '&:hover': { bgcolor: '#00A2DD' },
                  px: 4,
                  py: 1.5,
                  borderRadius: 50,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
                onClick={() => navigate('/influenceurs')}
              >
                Explorer les influenceurs
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}