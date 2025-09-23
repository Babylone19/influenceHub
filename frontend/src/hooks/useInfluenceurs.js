import { useState, useEffect } from 'react';
import { getInfluenceurs } from '../services/influenceurService';

export const useInfluenceurs = (filters = {}) => {
  const [influenceurs, setInfluenceurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfluenceurs = async () => {
    setLoading(true);
    try {
      const response = await getInfluenceurs(filters);
      setInfluenceurs(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluenceurs();
  }, [JSON.stringify(filters)]); // Re-fetch si les filtres changent

  return { influenceurs, loading, error, refetch: fetchInfluenceurs };
};