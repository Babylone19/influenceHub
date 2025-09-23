import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useInfluenceurs } from '../../hooks/useInfluenceurs';
import { deleteInfluenceur } from '../../services/influenceurService';
import { useSnackbar } from 'notistack';

export default function InfluenceursListPage() {
  const [filters, setFilters] = useState({ categorie: '', pays: '' });
  const { influenceurs, loading, error, refetch } = useInfluenceurs(filters);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet influenceur ?')) {
      try {
        await deleteInfluenceur(id);
        enqueueSnackbar('✅ Influenceur supprimé', { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar('❌ Erreur lors de la suppression', { variant: 'error' });
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Typography sx={{ color: 'white', textAlign: 'center', mt: 4 }}>Chargement...</Typography>;
  if (error) return <Typography sx={{ color: 'red', textAlign: 'center', mt: 4 }}>Erreur : {error.message}</Typography>;

  return (
    <Box sx={{ p: 3, bgcolor: '#0F0F1A', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
        📋 Liste des Influenceurs
      </Typography>

      {/* Filtres */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
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
              <MenuItem value="Humour">Humour</MenuItem>
              <MenuItem value="Mode">Mode</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Divertissement">Divertissement</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'end' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/influenceurs/new')}
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: '#00C2FF',
              '&:hover': { bgcolor: '#00A2DD' },
              borderRadius: 10,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            ➕ Ajouter un influenceur
          </Button>
        </Grid>
      </Grid>

      {/* Liste des cartes */}
      <Grid container spacing={3}>
        {influenceurs.length === 0 ? (
          <Typography sx={{ color: '#B0B0D0', textAlign: 'center', width: '100%' }}>
            Aucun influenceur trouvé. Cliquez sur "Ajouter" pour en créer un.
          </Typography>
        ) : (
          influenceurs.map((inf) => (
            <Grid item xs={12} sm={6} md={4} key={inf.id}>
              <Card
                sx={{
                  bgcolor: '#1A1A2E',
                  border: '1px solid #2A2A4E',
                  borderRadius: 3,
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {inf.nom}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 1 }}>
                    📱 {inf.reseau || 'Inconnu'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 1 }}>
                    👥 {inf.followers?.toLocaleString() || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0', mb: 1 }}>
                    🌍 {inf.pays}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0D0' }}>
                    🏷️ {inf.categorie}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/influenceurs/edit/${inf.id}`)}
                    sx={{ color: '#6A35FF', textTransform: 'none' }}
                  >
                    ✏️ Modifier
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDelete(inf.id)}
                    sx={{ color: '#FF3D57', textTransform: 'none' }}
                  >
                    🗑️ Supprimer
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