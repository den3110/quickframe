import React, { useContext, useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import affiliateApi from "api/affiliate/affiliateApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";

function TabsComponent() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [level, setLevel] = useState(1);
  const [nickName, setNickName] = useState("abc");
  const [days, setDays] = useState(1);
  const { selectedLinkAccount } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = {
          params: {
            page,
            size,
            lvl: level,
            nickName,
            days,
          },
        };
        const response = await affiliateApi.userExchangeLinkAccountAffiliate(
          data,
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          console.log(response?.data?.d, "success");
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
      } catch (error) {
        showToast(error?.response?.data?.m, "error");
      }
    })();
  }, [selectedLinkAccount, size, level, nickName, days, page]);

  return (
    <Box sx={{ width: "100%", mt: 4, mb: 4, p: 2 }}>
      <Tabs value={value} onChange={handleChange}>
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
    <Box
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
    </Box>
  );
}

export default TabsComponent;
