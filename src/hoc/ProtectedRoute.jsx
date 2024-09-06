import LoadingScreen from 'components/loading/LoadingScreen';
import AuthContext from 'contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location= useLocation()
  const { user, loading, selectedLinkAccount } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if(!selectedLinkAccount && !location.pathname.startsWith("/connect")) {
    return <Navigate to="/connect" />;
  }

  // if(!selectedLinkAccount && location.pathname.startsWith("/connect")) {
  //   return children
  // }
  // if(selectedLinkAccount && location.pathname.startsWith("/connect")) {
  //   return <Navigate to="/" />
  // }
  else {
    return children;
  }
};

export default ProtectedRoute;
