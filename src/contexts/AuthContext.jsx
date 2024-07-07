import userApi from 'api/user/userApi';
import { constant } from 'constant/constant';
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
        if(response?.data?.ok=== true) {
          try {
            setUser({...response.data?.d, avatar: constant.URL_AVATAR_URER + response?.data?.d?.photo_token});          
          } catch (error) {
            setUser({...response.data?.d, avatar: null});          
          }
        }
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
