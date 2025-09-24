import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  keyframes,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bolt as BoltIcon } from '@mui/icons-material';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(106, 53, 255, 0.4); }
  50% { box-shadow: 0 0 30px rgba(106, 53, 255, 0.7); }
`;

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
        py: 4,
        backgroundImage: 'radial-gradient(circle at 25% 25%, #6A35FF1A, transparent 50%), radial-gradient(circle at 75% 75%, #00C2FF1A, transparent 50%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          p: isMobile ? 3 : 4,
          backgroundColor: 'rgba(15, 15, 26, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(106, 53, 255, 0.25)',
          borderRadius: 10,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '100%',
          animation: `${fadeInUp} 1s ease-out`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant={isMobile ? 'h3' : 'h1'}
          component="h1"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(90deg, #6A35FF, #00C2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: isMobile ? '2.2rem' : '4rem',
            lineHeight: 1.1,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            animation: `${fadeInUp} 1s ease-out 0.2s both`,
          }}
        >
          InfluenceHub
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h5'}
          sx={{
            color: '#B0B0D0',
            mb: 5,
            maxWidth: '100%',
            lineHeight: 1.8,
            px: isMobile ? 2 : 0,
            animation: `${fadeInUp} 1s ease-out 0.4s both`,
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          La plateforme ultime pour découvrir, gérer et analyser les profils d’influenceurs du monde entier.
        </Typography>
        <Grid
          container
          spacing={isMobile ? 1 : 3}
          justifyContent="center"
          sx={{
            animation: `${fadeInUp} 1s ease-out 0.6s both`,
          }}
        >
          {!isAuthenticated ? (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    bgcolor: '#6A35FF',
                    '&:hover': {
                      bgcolor: '#5A25EE',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 25px rgba(106, 53, 255, 0.6)',
                    },
                    px: isMobile ? 3 : 5,
                    py: isMobile ? 1.5 : 2,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 700,
                    letterSpacing: '0.8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 5px 20px rgba(106, 53, 255, 0.3)',
                  }}
                  onClick={() => navigate('/register')}
                >
                  Commencer gratuitement
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    bgcolor: '#FF4DAA',
                    '&:hover': {
                      bgcolor: '#E63C9A',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 25px rgba(255, 77, 170, 0.6)',
                    },
                    px: isMobile ? 3 : 5,
                    py: isMobile ? 1.5 : 2,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 700,
                    letterSpacing: '0.8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 5px 20px rgba(255, 77, 170, 0.3)',
                    animation: `${glowPulse} 3s ease-in-out infinite`,
                  }}
                  startIcon={<BoltIcon />}
                  onClick={() => navigate('/register')}
                >
                   Inscription
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
                  '&:hover': {
                    bgcolor: '#00A2DD',
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 25px rgba(0, 194, 255, 0.6)',
                  },
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1.5 : 2,
                  borderRadius: 50,
                  textTransform: 'none',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 5px 20px rgba(0, 194, 255, 0.3)',
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
