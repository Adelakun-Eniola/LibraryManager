import React, { createContext, useContext, useEffect, useState } from 'react';
import { authHelpers } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const authData = authHelpers.getAuthData();
    if (authData.token && authData.role) {
      setUser({
        token: authData.token,
        role: authData.role,
        userId: authData.userId,
      });
    }
    setLoading(false);
  }, []);

  const login = (token, role, userId) => {
    authHelpers.setAuthData(token, role, userId);
    setUser({ token, role, userId });
  };

  const logout = () => {
    authHelpers.clearAuthData();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!user.token;
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};