// src/components/InvestmentOverview.js
import React, { useContext } from "react";
import { Card, CardContent, Typography, Box, Divider, useMediaQuery } from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import formatCurrency from "util/formatCurrency";
import { isDark } from "utils/constants";

const InvestmentOverview = () => {
  const {dataStat }= useContext(PortfolioDetailContext)
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <Card sx={{background: theme=> isDark(theme) ? "" : "#eeeff2"}}>
      <CardContent
        sx={{
          background:
            "linear-gradient(100.6deg, rgb(0, 157, 138) 2.15%, rgb(0, 5, 19) 96.19%)",
            borderRadius: "20px",
            paddingLeft: 0, 
            paddingRight: 0
        }}
      >
        <Box sx={{padding: "0 16px"}}>
            <Typography variant="h6" sx={{color: "#fff"}}>{dataStat?.name}</Typography>
        </Box>
        <Divider sx={{borderColor: "rgba(207, 219, 213, 0.15)"}} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            padding: 2
          }}
        >
          <Box>
            <Typography textAlign={"center"} variant="h6" sx={{ color: "#fff" }}>
              ${dataStat?.budget_amount?.toFixed(2)}
            </Typography>
            <Typography textAlign={"center"} variant="body2" sx={{ color: "rgba(255, 255, 255, 0.46)" }} fontSize={12}>
              Tiền vốn
            </Typography>
          </Box>
          <Box>
            <Typography textAlign={"center"} variant="h6" color={parseFloat(dataStat?.lastData?.profit) < 0 ? "error" : "success.main"}>
              {parseFloat(dataStat?.lastData?.profit) < 0 ? "-" : "+"}${dataStat?.lastData?.profit?.toFixed(2)?.replaceAll("-", "").replaceAll("+", "")}
            </Typography>
            <Typography textAlign={"center"} variant="body2" sx={{color: "rgba(255, 255, 255, 0.46)"}} fontSize={12}>Lợi nhuận ({parseFloat(dataStat?.lastData?.profit) < 0 ? "-" : "+"}{dataStat?.lastData?.profit?.toFixed(2)?.replaceAll("-", "").replaceAll("+", "")}%)</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">Chốt lời/Cắt lỗ</Typography> 
          {/* e co ham day a */}
          <Typography variant="body2">+${dataStat?.take_profit_target}/-${dataStat?.stop_loss_target}</Typography>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body2">Số lệnh đã cài lại</Typography>
          <Typography variant="body2">1</Typography>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body2">Lợi nhuận</Typography>
          <Typography variant="body2">{formatCurrency(dataStat?.isRunning ? dataStat?.lastData.profit : dataStat?.current_profit)} Cài lại</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvestmentOverview;
