import React from 'react';
import { Box, Container } from '@mui/material';

import VIPInformation from './component/VipInformation';
import TabsComponent from './component/TabsComponent';
import Commissions from './component/Comission';

function VipPage() {
  
  return (
    <Box >
      <VIPInformation />
      <TabsComponent />
      <Commissions />
    </Box>
  );
}

export default VipPage;
