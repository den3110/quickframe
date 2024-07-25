import LoadingScreen from "components/loading/LoadingScreen";
import AuthContext from "contexts/AuthContext";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteConnect = ({ children }) => {
  const location = useLocation();
  const { user, loading, selectedLinkAccount } = useContext(AuthContext);

  if (location.state?.is_add_account === true) {
    return children ;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!selectedLinkAccount) {
    return children;
  }
  if (selectedLinkAccount) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRouteConnect;
