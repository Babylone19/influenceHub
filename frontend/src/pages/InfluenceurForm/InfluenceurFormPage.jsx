import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createInfluenceur, updateInfluenceur, getInfluenceurById } from '../../services/influenceurService';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext'; // ← IMPORTÉ

export default function InfluenceurFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth(); // ← UTILISÉ

  const [formData, setFormData] = useState({
    nom: '',
    reseau: '',
    followers: '',
    pays: '',
    categorie: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getInfluenceurById(id)
        .then((response) => {
          const inf = response.data;
          setFormData({
            nom: inf.nom,
            reseau: inf.reseau || '',
            followers: inf.followers || '',
            pays: inf.pays,
            categorie: inf.categorie,
          });
        })
        .catch(() => {
          setError('Influenceur non trouvé.');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation simple côté client
    if (!formData.nom || !formData.pays || !formData.categorie) {
      setError("Les champs 'nom', 'pays' et 'categorie' sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        followers: formData.followers === '' ? null : Number(formData.followers),
      };

      if (id) {
        await updateInfluenceur(id, dataToSend);
        enqueueSnackbar('✅ Influenceur mis à jour !', { variant: 'success' });
      } else {
        await createInfluenceur(dataToSend);
        enqueueSnackbar('✅ Influenceur créé !', { variant: 'success' });
      }
      navigate('/influenceurs');
    } catch (err) {
      const errorMessage = err.response?.data?.message;

      if (errorMessage === 'Token invalide ou expiré.') {
        enqueueSnackbar('Votre session a expiré. Veuillez vous reconnecter.', { variant: 'warning' });
        logout(); // ← DÉCONNEXION AUTOMATIQUE
        navigate('/login');
      } else {
        setError(errorMessage || '❌ Erreur lors de la sauvegarde.');
        enqueueSnackbar('Erreur', { variant: 'error' });
      }
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
          maxWidth: 500,
          borderRadius: 4,
          bgcolor: '#1A1A2E',
          border: '1px solid #2A2A4E',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: 'center', color: '#FFFFFF' }}
        >
          {id ? '✏️ Modifier un influenceur' : '➕ Créer un influenceur'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom *"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            label="Réseau (ex: Instagram)"
            name="reseau"
            value={formData.reseau}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            label="Followers (nombre)"
            name="followers"
            type="number"
            value={formData.followers}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            label="Pays *"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            label="Catégorie *"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            {loading ? 'Sauvegarde...' : id ? 'Mettre à jour' : 'Créer'}
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/influenceurs')}
            sx={{ mt: 2, color: '#B0B0D0', textTransform: 'none' }}
          >
            ← Annuler
          </Button>
        </form>
      </Paper>
    </Box>
  );
}