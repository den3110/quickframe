import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/loading/LoadingScreen';
import AuthContext from 'contexts/AuthContext';
import userApi from 'api/user/userApi';

const CheckConnectExchange = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState();

  useEffect(() => {
    const checkUserLink = async () => {
      try {
        const response = await userApi.getUserExchangeLinkAccount()
        setLinked(response.data);
      } catch (error) { 
        setLinked(error?.response?.data)
        console.error('Error checking user link:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      checkUserLink();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (linked?.ok=== false) {
    return <Navigate to="/connect" />;
  }
  else {
    return <>
        {children}
    </>
  }

  return children;
};

export default CheckConnectExchange;
