import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "components/loading/LoadingScreen";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { createContext } from "react";

export const ConnectExchangeContext = createContext();
const CheckConnectExchange = ({ children }) => {
  const location = useLocation();
  const {
    user,
    loading: authLoading,
    selectedLinkAccount,
    isLogout,
    setDataSelectedLinkAccount,
    setSelectedLinkAccount,
    setAccessToken
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState();
  const [statusCode, setStatusCode] = useState();
  const navigate= useNavigate()
  useEffect(() => { 
    const checkUserLink = async () => {
      try {
        const response = await userApi.getUserExchangeLinkAccount(
          {},
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          setLinked(response.data);
        } else if (response?.data?.ok === false) {
          localStorage.removeItem("linkAccount")
            localStorage.removeItem("accessToken")
            setSelectedLinkAccount(undefined)
            setAccessToken(undefined)
            setDataSelectedLinkAccount(undefined)
            navigate("/login")
        }
      } catch (error) {
        setLinked(error?.response?.data);
        console.error("Error checking user link:", error);
        setStatusCode(error?.response?.status);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      checkUserLink();
    } else {
      setLoading(false);
    }
  }, [user, selectedLinkAccount, navigate, setAccessToken, setDataSelectedLinkAccount, setSelectedLinkAccount]);

  // if (!selectedLinkAccount) {
  //   return <Navigate to="/login" />;
  // }
  if (location.state?.is_add_account === true) {
    return (
      <Navigate to="/connect" />
    );
  }

  if (parseInt(statusCode) === 401) {
    return <Navigate to="/login" />;
  }
 

  if (authLoading || loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
 
  if (location.pathname === "/connect" && parseInt(statusCode) === 402) {
    return (
      <ConnectExchangeContext.Provider value={{ linked }}>
        {children}
      </ConnectExchangeContext.Provider>
    );
  }

  if (
    location.pathname.startsWith("/dashboard") &&
    parseInt(statusCode) === 402
  ) {
    return <Navigate to="/connect" />;
  }

  if (location.pathname === "/" && parseInt(statusCode) === 402) {
    return <Navigate to="/connect" />;
  }

  if (location.pathname === "/" && parseInt(statusCode) === 401) {
    return <Navigate to="/login" />;
  }

  if (location.pathname === "/dashboard" && parseInt(statusCode) === 401) {
    return <Navigate to="/login" />;
  }

  if (location.state?.is_add_account === true) {
    return (
      <ConnectExchangeContext.Provider value={{ linked }}>
        {children}
      </ConnectExchangeContext.Provider>
    );
  }

  if (location.pathname === "/connect" && linked?.ok === true) {
    return <Navigate to="/" />;
  }
  
  else {
    return (
      <ConnectExchangeContext.Provider value={{ linked }}>
        {children}
      </ConnectExchangeContext.Provider>
    );
  }

};

export default CheckConnectExchange;
