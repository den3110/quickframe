import React from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import GeneralTab from "../sections/GeneralTab";
import MemberListAccount from "../sections/MemberListAccount";

function TabsComponent() {
  const [value, setValue] = React.useState(0);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 4, mb: 4, p: downLg  ? 1 : 2 }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="General" />
        <Tab label="Member List" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralTab />
      </TabPanel>
      <TabPanel className="asjkawjkawf" value={value} index={1}>
        <MemberListAccount />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: downLg ? 0 : 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TabsComponent;
