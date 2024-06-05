import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../pages/Authentication/scripts/api';

interface AuthContextProps {
  isAuthorized: boolean;
  checkAuthorization: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthorization = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = { email: localStorage.getItem("userEmail") };
      const response = await api.post('/authorizedUsers', body, headers);

      setIsAuthorized(response.data.isAuth);
    } catch (error) {
      console.error('Erro ao verificar autorização:', error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, checkAuthorization }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
