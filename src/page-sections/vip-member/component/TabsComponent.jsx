import React, { useContext } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import GeneralTab from "../sections/GeneralTab";
import MemberListAccount from "../sections/MemberListAccount";
import { useTranslation } from "react-i18next";
import TriggerMember from "../sections/TriggerMember";
import { JwtContext } from "contexts/jwtContext";

function TabsComponent(props) {
  const {t }= useTranslation()
  const [value, setValue] = React.useState(0);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { decodedData } = useContext(JwtContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 4, mb: 4, p: downLg  ? 1 : 2 }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={t("General")} value={0} />
        <Tab label={t("Member List")} value={1} />
        {( props?.dataOverview?.rank >= 1 || decodedData?.data?.levelStaff >= 1) && 
          <Tab label={t("Kích hoạt thành viên")} value={2} />
        }
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralTab {...props} />
      </TabPanel>
      <TabPanel className="asjkawjkawf" value={value} index={1}>
        <MemberListAccount />
      </TabPanel>
      {( props?.dataOverview?.rank >= 1 || decodedData?.data?.levelStaff >= 1) && 
        <TabPanel className="asjkawjkawf" value={value} index={2}>
          <TriggerMember {...props} />
        </TabPanel>
      }
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
