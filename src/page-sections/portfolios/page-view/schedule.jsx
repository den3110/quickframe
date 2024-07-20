import React from "react";
import Layout from "../Layout";
import { Box, useMediaQuery } from "@mui/material";

const PortfolioSchedule = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Layout>
      <Box pt={2} pb={4}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? "" : "20px" }}>
            
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default PortfolioSchedule;
