import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "components/loading/LoadingScreen";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { createContext } from "react";
import axios from "axios";

export const ConnectExchangeContext = createContext();
const CheckConnectExchangeLogin = ({ children }) => {
  const location = useLocation();
  const {
    user,
    loading: authLoading,
    selectedLinkAccount,
    accessToken,
    setIsLogout
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState();
  const [statusCode, setStatusCode] = useState();
  useEffect(()=> {
    setIsLogout(false)
  }, [setIsLogout])
  useEffect(() => {
    const checkUserLink = async () => {

      try {
        const response = await axios.get(process.env.REACT_APP_BASE_API_URL + "/users/exchange/link-account/profile/" + selectedLinkAccount, {headers: {"Authorization": "Bearer " + accessToken}})
        console.log(response?.data)
        if (response?.data?.ok === true) {
          setLinked(response.data);
          setStatusCode(response?.data?.status);
        } else if (response?.data?.ok === false) {
          setLinked(response.data);
          setStatusCode(response?.data?.status);

        }
      } catch (error) {
        
        setLinked(error?.response?.data);
        console.error("Error checking user link:", error);
        setStatusCode(error?.response?.status);
        
      } finally {
        setLoading(false);
      }
    };

    if (user && selectedLinkAccount && accessToken) {
      checkUserLink();
    } else {
      setLoading(false);
    }
  }, [user, selectedLinkAccount, accessToken]);

  
  if (authLoading || loading) {
    return <LoadingScreen />;
  }
  else if (parseInt(statusCode) === 402) {
    console.log(2)

    return <Navigate to={"/connect"} />;
  }
 
  else if (!selectedLinkAccount) {
    console.log(4)

    return <>{children}</>;
  }

  else if (!user) {
    console.log(5)

    return <>{children}</>;
  }
  else if (parseInt(statusCode) === 401) {
    console.log(6)

    return <>{children}</>;
  }
 
  else if (location.pathname === "/connect" && parseInt(statusCode) === 402) {
    console.log(7)

    return <Navigate to={"/connect"} />;
  }
  else if (
    parseInt(statusCode) === 402
  ) {
    console.log(8)

    return <Navigate to="/connect" />;
  }
  else if (
    location.pathname.startsWith("/dashboard") &&
    parseInt(statusCode) === 402
  ) {
    console.log(9)
    return <Navigate to="/connect" />;
  }
  else if (location.pathname === "/" && parseInt(statusCode) === 402) {
    console.log(10)
    return <Navigate to="/connect" />;
  }
  else if (location.pathname === "/" && parseInt(statusCode) === 401) {
    console.log(11)
    return <>{children}</>;
  }
  else if (location.pathname === "/dashboard" && parseInt(statusCode) === 401) {
    console.log(12)

    return <>{children}</>;
  }
  else if (location.pathname === "/connect" && linked?.ok === true) {
    console.log(14)

    return <Navigate to="/" />;
  } else {
    console.log(15)

    return <Navigate to="/" />;
  }
};

export default CheckConnectExchangeLogin;
