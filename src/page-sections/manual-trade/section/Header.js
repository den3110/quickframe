// Header.js
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="body1" fontWeight={600}>Gói theo dõi đang chạy: 0</Typography>
      <Chip label="DEMO" color="primary" />
    </Box>
  );
};

export default Header;
