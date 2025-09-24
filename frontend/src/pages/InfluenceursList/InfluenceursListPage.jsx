import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Public as PublicIcon,
  People as PeopleIcon,
  Label as LabelIcon,
  Smartphone as SmartphoneIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useInfluenceurs } from '../../hooks/useInfluenceurs';
import { deleteInfluenceur } from '../../services/influenceurService';
import { useSnackbar } from 'notistack';

export default function InfluenceursListPage() {
  const [filters, setFilters] = useState({ categorie: '', pays: '' });
  const { influenceurs, loading, error, refetch } = useInfluenceurs(filters);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Liste dynamique des catégories uniques
  const [categories, setCategories] = useState([]);

  // Mise à jour de la liste des catégories quand les influenceurs changent
  useEffect(() => {
    if (influenceurs && influenceurs.length > 0) {
      // Extraire les catégories uniques
      const uniqueCategories = [...new Set(influenceurs.map(inf => inf.categorie))];
      setCategories(uniqueCategories);
    }
  }, [influenceurs]);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet influenceur ?')) {
      try {
        await deleteInfluenceur(id);
        enqueueSnackbar('Influenceur supprimé avec succès', { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar('Erreur lors de la suppression', { variant: 'error' });
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Typography sx={{ color: 'white', textAlign: 'center', mt: 4 }}>
        Chargement...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: 'red', textAlign: 'center', mt: 4 }}>
        Erreur : {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 3, bgcolor: '#0F0F1A', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon /> Liste des Influenceurs
      </Typography>
      {/* Filtres */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#B0B0D0' }}>Catégorie</InputLabel>
            <Select
              name="categorie"
              value={filters.categorie}
              onChange={handleFilterChange}
              label="Catégorie"
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2A2A4E' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6A35FF' },
              }}
            >
              <MenuItem value="">Toutes</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            label="Pays"
            name="pays"
            value={filters.pays}
            onChange={handleFilterChange}
            fullWidth
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
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'end' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/influenceurs/new')}
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: '#00C2FF',
              '&:hover': { bgcolor: '#00A2DD' },
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
            }}
            startIcon={<AddIcon />}
          >
            Ajouter un influenceur
          </Button>
        </Grid>
      </Grid>
      {/* Liste des cartes */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {influenceurs.length === 0 ? (
          <Grid xs={12}>
            <Typography sx={{ color: '#B0B0D0', textAlign: 'center', width: '100%', mt: 4 }}>
              Aucun influenceur trouvé. Cliquez sur "Ajouter" pour en créer un.
            </Typography>
          </Grid>
        ) : (
          influenceurs.map((inf) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={inf.id}>
              <Card
                sx={{
                  bgcolor: '#1A1A2E',
                  border: '1px solid #2A2A4E',
                  borderRadius: 2,
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" /> {inf.nom}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SmartphoneIcon fontSize="small" /> {inf.reseau || 'Inconnu'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon fontSize="small" /> {inf.followers?.toLocaleString() || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PublicIcon fontSize="small" /> {inf.pays}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LabelIcon fontSize="small" /> {inf.categorie}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/influenceurs/edit/${inf.id}`)}
                    sx={{ color: '#6A35FF', textTransform: 'none' }}
                    startIcon={<EditIcon />}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDelete(inf.id)}
                    sx={{ color: '#FF3D57', textTransform: 'none' }}
                    startIcon={<DeleteIcon />}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
