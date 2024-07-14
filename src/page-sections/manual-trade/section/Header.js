// Header.js
import React, { useContext } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ManualTradeContext } from 'contexts/ManualTradeContext';

const Header = () => {
    const {dataStat }= useContext(ManualTradeContext)
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="body1" fontWeight={600}>Gói theo dõi đang chạy: {dataStat?.total_followers}</Typography>
    </Box>
  );
};

export default Header;
