// src/components/InvestmentOverview.js
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import formatCurrency from "util/formatCurrency";
import { isDark } from "util/constants";
import { ActionBotType, ActionBotTypeMessageSucces } from "type/ActionBotType";
import portfolioApi from "api/portfolios/portfolioApi";
import { useParams } from "react-router-dom";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import round2number from "util/round2number";

const InvestmentOverview = (props) => {
  const {t }= useTranslation()
  const { dataStat } = useContext(PortfolioDetailContext);
  const { selectedLinkAccount } = useContext(AuthContext);
  // const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { id } = useParams();

  const handleChangeIsRunning = async (action) => {
    try {
      const payload = {
        action: ActionBotType[action],
        linkAccountId: selectedLinkAccount,
      };
      // const { data, error, loading, refetch }= useQuery()
      await portfolioApi.userBotAction(id, payload);
      // setData()
      // setIsRunning(ActionBotTypeStatus[action]);
      showToast(t(ActionBotTypeMessageSucces[action]), "success");
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  return (
    <Box position={"relative"} overflow={"hidden"}>
      <Card sx={{ background: (theme) => (isDark(theme) ? "" : "#eeeff2") }}>
        <CardContent
          sx={{
            background:
              "linear-gradient(100.6deg, rgb(0, 157, 138) 2.15%, rgb(0, 5, 19) 96.19%)",
            borderRadius: "20px",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Box sx={{ padding: "0 16px" }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              {dataStat?.name}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(207, 219, 213, 0.15)" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              padding: 2,
            }}
          >
            <Box>
              <Typography
                textAlign={"center"}
                variant="h6"
                sx={{ color: "#fff" }}
              >
                ${round2number(dataStat?.budget_amount)}
              </Typography>
              <Typography
                textAlign={"center"}
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.46)" }}
                fontSize={12}
              >
                {t("Invested Amount")}
              </Typography>
            </Box>
            <Box>
              <Typography
                textAlign={"right"}
                variant="h6"
                color={
                  parseFloat(dataStat?.lastData?.profit) < 0
                    ? "error"
                    : "success.main"
                }
              >
                {formatCurrency(dataStat?.lastData?.profit)}
              </Typography>
              <Typography
                textAlign={"center"}
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.46)" }}
                fontSize={12}
              >
                {t("Profits")} (
                {formatCurrency(dataStat?.lastData?.profit / dataStat?.budget_amount * 100)?.replaceAll(
                  "$",
                  ""
                )}
                %)
              </Typography>
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
            <Typography variant="body2">{t("Take Profit/Stop Loss")}</Typography>
            {/* e co ham day a */}
            <Typography variant="body2">
              +${round2number(dataStat?.take_profit_target)}/-${round2number(dataStat?.stop_loss_target)}
            </Typography>
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
            <Typography variant="body2">{t("Profits")}</Typography>
            <Typography
              variant="body2"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              {formatCurrency(
                dataStat?.isRunning
                  ? dataStat?.lastData.profit
                  : dataStat?.current_profit
              )}
              {props?.isSignalStrategy !== true && (
                <Typography
                  onClick={() => handleChangeIsRunning(ActionBotType.RESET_PNL)}
                  color={"success.main"}
                  fontSize={14}
                  fontWeight={600}
                  sx={{ cursor: "pointer" }}
                >
                  {t("Reset")}
                </Typography>
              )}
            </Typography>
          </Box>
        </CardContent>
        {dataStat?.isRunning === true &&
          dataStat?.lastData?.isPause === false && (
            <Box
              position={"absolute"}
              sx={{
                background:
                  "linear-gradient(154.83deg,#03c768 15.98%,#0062ff 85.83%)",
                fontSize: 9,
                height: 20,
                lineHeight: 2,
                right: -20,
                textAlign: "center",
                textTransform: "uppercase",
                top: 15,
                transform: "rotate(45deg)",
                width: 90,
                borderRadius: "12px",
                fontWeight: 600,
                minWidth: 70,
                overflow: "hidden",
                padding: "0 6px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                color: "white",
              }}
            >
              {t("On going")}
            </Box>
          )}
      </Card>
    </Box>
  );
};

export default InvestmentOverview;
