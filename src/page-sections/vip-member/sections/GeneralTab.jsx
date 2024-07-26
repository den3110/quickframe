import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import TotalAgencies from "icons/duotone/TotalAgencies";
import TotalReferrals from "icons/duotone/TotalReferrals";
import TradingComission from "icons/duotone/TradingComission";
import VipComission from "icons/duotone/VipComission";
import React from "react";
import Commissions from "../component/Comission";

const Item = ({ icon, title, value }) => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      display={"flex"}
      justifyContent={downLg ? "start" : "center"}
      alignItems={"center"}
      gap={2}
    >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {icon}
      </Box>
      <Box>
        <Typography fontSize={24} fontWeight={600} color="#fff">
          {value}
        </Typography>
        <Typography color="secondary" fontWeight={600} fontSize={14}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

const GeneralTab = () => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          backgroundImage:
            "url(https://quickinvest.ai/static/media/02.e30a36b27be5954e0460.png)",
          borderRadius: "24px",
          marginBottom: downLg ? "24px" : "60px",
          padding: downLg ? "16px 24px" : "36px 70px",
          backgroundPosition: "50%",
          backgroundSize: "cover",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Grid container>
          <Grid item md={3} xs={12}>
            <Item
              icon={<TotalReferrals />}
              value={0}
              title={"Total referrals"}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Item
              icon={<TotalAgencies />}
              value={0}
              title={"Total agencies"}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Item
              icon={<TradingComission />}
              value={0}
              title={"Trading commission"}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Item
              icon={<VipComission />}
              value={0}
              title={"Vip commission"}
            />
          </Grid>
        </Grid>
      </Box>
      <Commissions />
    </Box>
  );
};

export default GeneralTab;
