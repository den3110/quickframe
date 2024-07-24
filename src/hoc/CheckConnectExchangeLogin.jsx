import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "components/loading/LoadingScreen";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { createContext } from "react";

export const ConnectExchangeContext = createContext();
const CheckConnectExchangeLogin = ({ children }) => {
  const location = useLocation();
  const {
    user,
    loading: authLoading,
    selectedLinkAccount,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState();
  const [statusCode, setStatusCode] = useState();
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
          setLinked(response.data);
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
  }, [user, selectedLinkAccount]);

  
  if (authLoading || loading) {
    return <LoadingScreen />;
  }
  else if (parseInt(statusCode) === 402) {
    return <Navigate to={"/connect"} />;
  }
 
  else if (!selectedLinkAccount) {
    return <>{children}</>;
  }

  else if (!user) {
    return <>{children}</>;
  }
  else if (parseInt(statusCode) === 401) {
    return <>{children}</>;
  }
 
  else if (location.pathname === "/connect" && parseInt(statusCode) === 402) {
    return <Navigate to={"/connect"} />;
  }
  else if (
    parseInt(statusCode) === 402
  ) {
    return <Navigate to="/connect" />;
  }
  else if (
    location.pathname.startsWith("/dashboard") &&
    parseInt(statusCode) === 402
  ) {
    return <Navigate to="/connect" />;
  }
  else if (location.pathname === "/" && parseInt(statusCode) === 402) {
    return <Navigate to="/connect" />;
  }
  else if (location.pathname === "/" && parseInt(statusCode) === 401) {
    return <>{children}</>;
  }
  else if (location.pathname === "/dashboard" && parseInt(statusCode) === 401) {
    return <>{children}</>;
  }
  else if (location.state?.is_add_account === true) {
    return (
      <ConnectExchangeContext.Provider value={{ linked }}>
        {children}
      </ConnectExchangeContext.Provider>
    );
  }
  else if (location.pathname === "/connect" && linked?.ok === true) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default CheckConnectExchangeLogin;
