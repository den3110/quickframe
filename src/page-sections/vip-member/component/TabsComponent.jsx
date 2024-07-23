import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

function TabsComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 4, mb: 4 }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="General" />
        <Tab label="Member List" />
      </Tabs>
      <TabPanel value={value} index={0}>
        General Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Member List Content
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabsComponent;
