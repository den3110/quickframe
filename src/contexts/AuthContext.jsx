import userApi from 'api/user/userApi';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from localStorage and check if the user is authenticated
  const loadUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await userApi.getUserProfile(accessToken);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to load user profile', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
