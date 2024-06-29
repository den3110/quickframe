import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from 'components/loading/LoadingScreen';
import AuthContext from 'contexts/AuthContext';
import userApi from 'api/user/userApi';
const CheckConnectExchange = ({ children }) => {
  const location= useLocation()
  const { user, loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState();
  const [statusCode, setStatusCode]= useState()

  useEffect(() => {
    const checkUserLink = async () => {
      try {
        const response = await userApi.getUserExchangeLinkAccount()
        setLinked(response.data);
      } catch (error) { 
        setLinked(error?.response?.data)
        console.error('Error checking user link:', error);
        setStatusCode(error?.response?.status)
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
  if (parseInt(statusCode)=== 401) {
    return <Navigate to="/login" />;
  }
  if (location.pathname=== "/connect" && parseInt(statusCode)=== 402) {
    return <>{children}</>;
  }
  if(location.pathname=== "/connect" && linked?.ok=== true) {
    return <Navigate to="/" />;
  }
  else {
    return <>
        {children}
    </>
  }
};

export default CheckConnectExchange;
