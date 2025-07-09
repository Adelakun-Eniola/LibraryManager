import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import LibrarianDashboard from './components/dashboards/LibrarianDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated()) {
    // Redirect based on user role
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'LIBRARIAN':
        return <Navigate to="/librarian" replace />;
      case 'USER':
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/librarian/*" 
          element={
            <ProtectedRoute allowedRoles={['LIBRARIAN']}>
              <LibrarianDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Error Routes */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
                <p className="text-secondary-600">You don't have permission to access this page.</p>
              </div>
            </div>
          } 
        />
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-secondary-800 mb-4">404</h1>
                <p className="text-secondary-600">Page not found.</p>
              </div>
            </div>
          } 
        />
      </Routes>
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;