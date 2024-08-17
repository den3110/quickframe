import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Card, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SettingsContext } from "contexts/settingsContext";
import _ from "lodash";
import { useContext } from "react";
import formatCurrency from "util/formatCurrency";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import moment from "moment";
import { useTranslation } from "react-i18next";

const InfoCard = ({ title, value, tooltip, setIsHidden, isHidden }) => {
  const {t }= useTranslation()

    return (
      <Card variant="outlined" style={{ borderRadius: 16 }}>
        <Box sx={{ padding: "8px 12px" }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item>
              <Typography
                variant="body2"
                fontSize={12}
                color="textSecondary"
                sx={{ whiteSpace: "nowrap" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              {isHidden && (
                <Box
                  onClick={() => {
                    setIsHidden(false);
                  }}
                  ml={1}
                  sx={{ cursor: "pointer" }}
                >
                  <VisibilityOffIcon fontSize={"14px"} />
                </Box>
              )}
              {!isHidden && (
                <Box
                  onClick={() => {
                    setIsHidden(true);
                  }}
                  ml={1}
                  sx={{ cursor: "pointer" }}
                >
                  <VisibilityIcon fontSize={"14px"} />
                </Box>
              )}
            </Grid>
          </Grid>
          {isHidden && <Typography fontSize={14} color="">*********</Typography>}
          {!isHidden && (
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={600}
              color={value > 0 ? "success.main" : "error.main"}
              sx={{ filter: "contrast(2.5)" }}
            >
              {formatCurrency(value)}
            </Typography>
          )}
        </Box>
      </Card>
    );
  };

const CustomToolbar = ({
    label,
    onNavigate,
    onView,
    setMode,
    mode,
    isGlobal,
    data,
    isHiddenProfit,
    isHiddenVolume,
    setIsHiddenProfit,
    setIsHiddenVolume,
  }) => {
    const {t }= useTranslation()
    const monthNames = [
        `${t("Month")} 1`,
        `${t("Month")} 2`,
        `${t("Month")} 3`,
        `${t("Month")} 4`,
        `${t("Month")} 5`,
        `${t("Month")} 6`,
        `${t("Month")} 7`,
        `${t("Month")} 8`,
        `${t("Month")} 9`,
        `${t("Month")} 10`,
        `${t("Month")} 11`,
        `${t("Month")} 12`,
      ];
      
    const theme = useTheme();
    const { walletMode } = useContext(SettingsContext);
    const monthIndex = moment(label).month();
    const year = moment(label).year();
    const formattedLabel = `${monthNames[monthIndex]} ${year}`;
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  
    const renderTotalProfit = () => {
      if (isGlobal) {
        if (walletMode === true) {
          return _.sumBy(data, function (e) {
            return e.live_profit;
          });
        } else {
          return _.sumBy(data, function (e) {
            return e.demo_profit;
          });
        }
      } else {
        return _.sumBy(data, function (e) {
          return e.profit;
        });
      }
    };
  
    const renderTotalVolume = () => {
      if (isGlobal) {
        if (walletMode === true) {
          return _.sumBy(data, function (e) {
            return e.live_volume;
          });
        } else {
          return _.sumBy(data, function (e) {
            return e.demo_volume;
          });
        }
      } else {
        return _.sumBy(data, function (e) {
          return e.volume;
        });
      }
    };
  
    return (
      <Box
        sx={{ width: "100%" }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={downLg ? "aa" : "center"}
        className="akaskwkoaw"
        mb={2}
        p={1}
        flexDirection={downLg ? "column" : "row"}
      >
        <Box>
          <Box>
            <Typography variant="body1" fontSize={14}>
              {t("time")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px",
              width: "max-content",
            }}
          >
            <IconButton onClick={() => onNavigate("PREV")}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h5" fontWeight={600} color={"success.main"}>
              {label}
            </Typography>
            <IconButton onClick={() => onNavigate("NEXT")}>
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <Box
              sx={{
                padding: 0.5,
                borderRadius: "10px",
                background: theme.palette.background.t1,
                display: "flex",
              }}
            >     
              <Box
                onClick={() => {
                  setMode(true);
                }}
                sx={{
                  backgroundColor: mode === true && "success.main",
                  backgroundPosition: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "22px 22px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "block",
                  height: 26,
                  margin: 0,
                  width: 38,
                  backgroundImage:
                    "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTQuNDcgMTkuODE3aDEyLjM3OGExLjc3IDEuNzcgMCAwIDAgMS43NjgtMS43NjhWNS42N2ExLjc3IDEuNzcgMCAwIDAtMS43NjgtMS43NjloLTEuNzY5VjIuMTM0aC0xLjc2OHYxLjc2OEg4LjAwNlYyLjEzNEg2LjIzOHYxLjc2OEg0LjQ2OWExLjc3IDEuNzcgMCAwIDAtMS43NjggMS43Njl2MTIuMzc4YTEuNzcgMS43NyAwIDAgMCAxLjc2OCAxLjc2OFptOS43MjUtNS4zMDVINy4xMjJ2LTEuNzY4aDcuMDczdjEuNzY4Wk00LjQ3IDYuNTU1aDEyLjM3OHYxLjc2OEg0LjQ3VjYuNTU1WiIgZmlsbD0iI0ZBRkFGQSIvPjwvc3ZnPg==)",
                }}
              ></Box>
               <Box
                onClick={() => {
                  setMode(false);
                }}
                sx={{
                  backgroundColor: mode === false && "success.main",
                  backgroundPosition: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "22px 22px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "block",
                  height: 26,
                  margin: 0,
                  width: 38,
                  backgroundImage:
                    "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0ibTIuMDU5IDE1Ljc1IDMuMDk0LTMuNzEzIDEuMzI2IDIuMTIxIDYuNjMxLTcuOTU3IDMuNTM3IDUuODM2IDIuNjUyLTIuNjUzIiBzdHJva2U9IiNBMEFFQzAiIHN0cm9rZS13aWR0aD0iMS41OTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)",
                }}
              ></Box>
            </Box>
          </Box>
          <Box>
            <Box className="aksmwaaw" sx={{ width: "100" }} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <InfoCard
                    title={t("total_profit")}
                    value={renderTotalProfit()}
                    isHidden={isHiddenProfit}
                    setIsHidden={setIsHiddenProfit}
                    tooltip={t("total_profit")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InfoCard
                    title={t("Total Vol")}
                    value={renderTotalVolume()}
                    isHidden={isHiddenVolume}
                    setIsHidden={setIsHiddenVolume}
                    tooltip={t("Total Vol")}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  export default CustomToolbar