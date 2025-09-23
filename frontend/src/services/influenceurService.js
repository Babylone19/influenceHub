import api from './api';

export const getInfluenceurs = (filters = {}) => {
  const params = new URLSearchParams(filters);
  return api.get(`/influenceurs?${params.toString()}`);
};
export const createInfluenceur = async (data) => {
  try {
    const response = await api.post('/influenceurs', data);
    return response.data;
  } catch (error) {
    // Log l'erreur pour le débogage
    console.error("Erreur création influenceur:", error.response?.data);
    throw error;
  }
};
// export const createInfluenceur = (data) => api.post('/influenceurs', data);
export const updateInfluenceur = (id, data) => api.put(`/influenceurs/${id}`, data);
export const deleteInfluenceur = (id) => api.delete(`/influenceurs/${id}`);
export const getInfluenceurById = (id) => api.get(`/influenceurs/${id}`);