import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@/i18n/I18nContext';
import { AuthProvider } from '@/auth/AuthContext';
import ProtectedRoute from '@/auth/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import CreatePetPage from '@/pages/CreatePetPage';
import QrResultPage from '@/pages/QrResultPage';
import PublicPetPage from '@/pages/PublicPetPage';
import AdoptionPage from '@/pages/AdoptionPage';
import MatingPage from '@/pages/MatingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import MyPetsPage from '@/pages/MyPetsPage';
import EditPetPage from '@/pages/EditPetPage';

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/qr/:id" element={<QrResultPage />} />
            <Route path="/pet/:id" element={<PublicPetPage />} />
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/mating" element={<MatingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
              path="/my-pets"
              element={
                <ProtectedRoute>
                  <MyPetsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPetPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  );
}
