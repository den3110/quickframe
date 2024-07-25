import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AuthContext from "contexts/AuthContext";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppBarSection = () => {
  const navigate= useNavigate()
  const {selectedLinkAccount, setAccessToken,  setSelectedLinkAccount}= useContext(AuthContext)
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("linkAccount")
    setSelectedLinkAccount(undefined)
    setAccessToken(undefined)
    navigate("/login")
    // window.location.reload();
  };
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      style={{ backgroundColor: "" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <img src="/logo.png" alt="Quickinvest Logo" style={{ height: '30px', marginRight: '10px' }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Luxcoin
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Box sx={{ marginRight: 2 }}>
            <Link href="/" color="inherit">
              Dashboard
            </Link>
          </Box>
          <Box sx={{ marginRight: 2 }}>
            <Link href="#" color="inherit">
              English
            </Link>
          </Box>
          <Link onClick={handleLogout} href="#" color="inherit">
            Logout
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarSection;
