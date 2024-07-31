import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import { useTranslation } from "react-i18next";

function Commissions() {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [dateRange, setDateRange] = React.useState([
    dayjs("2024-07-01"),
    dayjs("2024-07-23"),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
            flexDirection={downLg ? "column" : "row"}
          >
            <Box item width={downLg ? "100%" : "aaa"} mb={downLg ? 1.5 : 0}>
              <Typography variant="body1">{t("Trading commission")}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems="center"
              gap={1}
            >
              <Box item xs={6}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} sx={{ width: 120 }} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} sx={{ width: 120 }} />
                    </>
                  )}
                />
              </Box>
              <Box item xs={3}>
                <Button
                  startIcon={<SearchIcon />}
                  variant="contained"
                  color="primary"
                >
                  {t("Search")}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mt={4}>
            <Typography variant="body2" color="textSecondary">
              {t("Each new day, you will receive commissions from all the trading volume of your peers yesterday.")}
            </Typography>
            <Box mt={2} textAlign="center">
              <EmptyPage
                title={t("There is no data here!")}
                disableButton={true}
              />
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
            flexDirection={downLg ? "column" : "row"}
          >
            <Box item width={downLg ? "100%" : "aaa"} mb={downLg ? 1.5 : 0}>
              <Typography variant="body1">{t("Trading commission")}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems="center"
              gap={1}
            >
              <Box item xs={6}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} sx={{ width: 120 }} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} sx={{ width: 120 }} />
                    </>
                  )}
                />
              </Box>
              <Box item xs={3}>
                <Button
                  startIcon={<SearchIcon />}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mt={4}>
            <Typography variant="body2" color="textSecondary">
              {t("Each new day, you will receive commissions from all the trading volume of your peers yesterday.")}
            </Typography>
            <Box mt={2} textAlign="center">
              <EmptyPage
                title={t("There is no data here!")}
                disableButton={true}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}

export default Commissions;
