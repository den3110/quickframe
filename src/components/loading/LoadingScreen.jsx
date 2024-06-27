import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingScreen;
