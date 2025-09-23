import api from './api';

// ✅ Exporte une fonction nommée "login"
export const login = (credentials) => {
  return api.post('/auth/connexion', credentials);
};

// ✅ Exporte aussi "register" si tu veux l'utiliser dans RegisterPage
export const register = (userData) => {
  return api.post('/auth/inscription', userData);
};