import React from 'react';
import { Container, Box } from '@mui/material';
import VIPInformation from './VIPInformation';
import TabsComponent from './TabsComponent';
import Commissions from './Commissions';

function App() {
  return (
    <Container maxWidth="lg">
      <VIPInformation />
      <TabsComponent />
      <Commissions />
    </Container>
  );
}

export default App;
