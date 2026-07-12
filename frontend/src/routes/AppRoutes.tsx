import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/Dashboard/Dashboard';
import HistoryPage from '../pages/History/History';
import ImageAnalysisPage from '../pages/ImageAnalysis/ImageAnalysis';
import LoginPage from '../pages/Login/login';
import TextAnalysisPage from '../pages/TextAnalysis/TextAnalysis';
import AudioAnalysisPage from '../pages/AudioAnalysis/AudioAnalysis';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/text-analysis" element={<TextAnalysisPage />} />
        <Route path="/audio-analysis" element={<AudioAnalysisPage />} />
        <Route path="/image-analysis" element={<ImageAnalysisPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
