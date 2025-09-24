import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Vérification initiale du token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Optionnel : Vérifiez le token avec une API
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Valeurs exposées par le contexte
  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading,
  };

  // Affichage d'un état de chargement pendant la vérification
  if (loading) {
    return <div>Chargement de l'authentification...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
