import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Pendant le chargement, affichez un état de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Redirige vers /login si non authentifié
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
