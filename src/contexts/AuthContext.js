// contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('accessToken', userData.accessToken);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('accessToken');
  };

  const isAuthenticated = () => {
    return !!Cookies.get('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
