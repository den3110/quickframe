import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

import VIPInformation from "./component/VipInformation";
import TabsComponent from "./component/TabsComponent";
import Commissions from "./component/Comission";
import affiliateApi from "api/affiliate/affiliateApi";
import AuthContext from "contexts/AuthContext";
import { showToast } from "components/toast/toast";

export const VipMemberContext = createContext();
function VipPage() {
  const [dataOverview, setDataOverview] = useState();
  const [data, setData]= useState([])
  const { selectedLinkAccount } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage]= useState(1)
  const [size, setSize]= useState(6)
  const [level, setLevel]= useState()
  const [nickName, setNickName]= useState()
  const [days, setDays]= useState()

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await affiliateApi.userExchangeLinkAccountOverview(
          {},
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          setDataOverview(response?.data?.d);
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
      } catch (error) {
        showToast(error?.data?.m, "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedLinkAccount]);

  useEffect(()=> {
    (async () => {
      try {
        setLoading(true);
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
          setData(response?.data?.d);
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
      } catch (error) {
        showToast(error?.data?.m, "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedLinkAccount, size, level, nickName, days, page])

  return (
    <VipMemberContext.Provider value={{dataOverview, setDataOverview, data, setData, loading, setLoading, page, size, level, nickName, days, setPage, setSize, setLevel, setNickName, setDays}}>
      <Box>
        <VIPInformation />
        <TabsComponent />
        {/* <Commissions /> */}
      </Box>
    </VipMemberContext.Provider>
  );
}

export default VipPage;
