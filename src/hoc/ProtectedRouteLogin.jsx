import LoadingScreen from 'components/loading/LoadingScreen';
import AuthContext from 'contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteLogin = ({ children }) => {
  const location= useLocation()
  const { user, loading, selectedLinkAccount } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }


  return children;
};

export default ProtectedRouteLogin;
