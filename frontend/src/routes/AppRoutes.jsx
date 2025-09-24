// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import InfluenceursListPage from '../pages/InfluenceursList/InfluenceursListPage';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/influenceurs"
        element={
          <MainLayout>
            <PrivateRoute>
              <InfluenceursListPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
