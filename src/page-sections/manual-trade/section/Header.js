// Header.js
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ManualTradeContext } from "contexts/ManualTradeContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { dataStat } = useContext(ManualTradeContext);
  const {t }= useTranslation()

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Typography variant="body1" fontWeight={600}>
        {t("Active follower plans:")}: {dataStat?.total_followers}
      </Typography>
    </Box>
  );
};

export default Header;
