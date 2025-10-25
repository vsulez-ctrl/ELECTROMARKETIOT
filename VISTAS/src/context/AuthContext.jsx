import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    const handleStorageChange = () => {
    
      checkAuth();
    };

    window.addEventListener('authStateChange', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('authStateChange', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuth = () => {
  
    const currentUser = getCurrentUser();
   
    setUser(currentUser);
    setLoading(false);
  };

  const login = (userData) => {
 
    setUser(userData);
    // Forzar actualización inmediata en todos los componentes
    window.dispatchEvent(new Event('authStateChange'));
  };

  const logout = () => {
  
    window.dispatchEvent(new Event('authStateChange'));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};