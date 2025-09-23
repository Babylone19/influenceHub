import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import InfluenceursListPage from '../pages/InfluenceursList/InfluenceursListPage';
import InfluenceurFormPage from '../pages/InfluenceurForm/InfluenceurFormPage';
import PrivateRoute from '../components/PrivateRoute'; // ← IMPORTÉ ICI

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes protégées */}
      <Route
        path="/influenceurs"
        element={
          <PrivateRoute> {/* ← UTILISÉ ICI */}
            <InfluenceursListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/influenceurs/new"
        element={
          <PrivateRoute>
            <InfluenceurFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/influenceurs/edit/:id"
        element={
          <PrivateRoute>
            <InfluenceurFormPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}