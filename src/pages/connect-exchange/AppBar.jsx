import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AppBarSection = () => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      style={{ backgroundColor: "#fff" }}
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
            Quickframe
          </Typography>
        </Box>
        <Box>
          <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
            English
          </Link>
          <Link href="#" color="inherit">
            Logout
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarSection;
