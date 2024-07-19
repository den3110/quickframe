import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import rgbToRgba from "util/rgbTorgba";
import hexToRgb from "util/hexToRgba";
import formatCurrency from "util/formatCurrency";
import round2number from "util/round2number";
import { SettingsContext } from "contexts/settingsContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import _ from "lodash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GrandTotalProfitChart from "./GrandTotalProfitChart";
import GrandPnLChart from "./GrandPnlChart";

const localizer = momentLocalizer(moment);
moment.locale("ko", {
  week: {
    dow: 1,
    doy: 1,
  },
});

const monthNames = [
  "tháng 1",
  "tháng 2",
  "tháng 3",
  "tháng 4",
  "tháng 5",
  "tháng 6",
  "tháng 7",
  "tháng 8",
  "tháng 9",
  "tháng 10",
  "tháng 11",
  "tháng 12",
];

const InfoCard = ({ title, value, tooltip, setIsHidden, isHidden }) => {
  return (
    <Card variant="outlined" style={{ borderRadius: 16 }}>
      <Box sx={{ padding: 1 }}>
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
        {isHidden && <Typography color="secondary">*********</Typography>}
        {!isHidden && (
          <Typography
            variant="body1"
            fontSize={18}
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

const CustomEvent = ({ event }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box sx={{ padding: downLg ? 0 : "4px", background: "transparent" }}>
      <Box
        sx={{
          backgroundColor: rgbToRgba(hexToRgb(event.color), 0.1),
          color: "white",
          padding: downLg ? 0 : "4px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            paddingLeft: "8px",
            "&::after": {
              background: event.color,
              borderRadius: 2,
              content: '""',
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
              width: 3,
            },
          }}
        >
          <Typography
            sx={{ filter: "contrast(2.5)" }}
            fontSize={downLg ? 8 : 10}
          >
            {event.title}
          </Typography>
          <Typography
            fontSize={downLg ? 8 : 14}
            fontWeight={600}
            sx={{ color: event.color, filter: "contrast(2.5)" }}
          >
            {formatCurrency(event.desc)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const CustomDateHeader = ({ label }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        padding: "10px",
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
      fontSize={downLg && 8}
    >
      {label}
    </Box>
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
      flexDirection={downLg ? "column" : "row"}
    >
      <Box>
        <Box>
          <Typography variant="body1" fontSize={14}>
            Thời gian
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
            {formattedLabel}
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
            <Box
              onClick={() => {
                setMode(true);
                console.log(1);
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
          </Box>
        </Box>
        <Box>
          <Box className="aksmwaaw" sx={{ width: "100" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InfoCard
                  title="Tổng lợi nhuận"
                  value={renderTotalProfit()}
                  isHidden={isHiddenProfit}
                  setIsHidden={setIsHiddenProfit}
                  tooltip={"Tổng lợi nhuận"}
                />
              </Grid>
              <Grid item xs={6}>
                <InfoCard
                  title="Tổng KLGD"
                  value={renderTotalVolume()}
                  isHidden={isHiddenVolume}
                  setIsHidden={setIsHiddenVolume}
                  tooltip={"Tổng KLGD"}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CustomDaySlot = ({ children }) => (
  <div className="rbc-day-bg">
    <Box
      sx={{
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="body2">{children}</Typography>
    </Box>
  </div>
);

const CalendarComponent = ({ data = [], dataStat = {}, isGlobal = false }) => {
  const { walletMode } = useContext(SettingsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const theme = useTheme();
  const [stat, setStat] = useState();
  const [isHiddenProfit, setIsHiddenProfit] = useState(false);
  const [isHiddenVolume, setIsHiddenVolume] = useState(false);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const events = data.flatMap((item, index) => {
    if (isGlobal === true) {
      if (walletMode === true) {
        // live wallet
        const profitEvent = {
          title: `Profit`,
          start: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          end: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          desc: formatCurrency(item.live_profit),
          color:
            item.live_profit >= 0
              ? theme.palette.success.main
              : theme.palette.error.main,
        };

        const volumeEvent = {
          title: `Volume`,
          start: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          end: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          desc: round2number(item.live_volume),
          color: "#8c62ff",
        };

        return [
          isHiddenProfit === false ? profitEvent : [],
          isHiddenVolume === false ? volumeEvent : [],
        ];
      } else {
        // demo wallet
        const profitEvent = {
          title: `Profit`,
          start: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          end: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          desc: formatCurrency(item.demo_profit),
          color:
            item.demo_profit >= 0
              ? theme.palette.success.main
              : theme.palette.error.main,
        };

        const volumeEvent = {
          title: `Volume`,
          start: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          end: new Date(item.createdAt).setHours(
            new Date(item.createdAt).getHours() - 1
          ),
          desc: round2number(item.demo_volume),
          color: "#8c62ff",
        };

        return [
          isHiddenProfit === false ? profitEvent : [],
          isHiddenVolume === false ? volumeEvent : [],
        ];
      }
    } else {
      const profitEvent = {
        title: `Profit`,
        start: new Date(item.createdAt),
        end: new Date(item.createdAt),
        desc: formatCurrency(item.profit),
        color:
          item.profit >= 0
            ? theme.palette.success.main
            : theme.palette.error.main,
      };

      const volumeEvent = {
        title: `Volume`,
        start: new Date(item.createdAt).setHours(
          new Date(item.createdAt).getHours() - 1
        ),
        end: new Date(item.createdAt).setHours(
          new Date(item.createdAt).getHours() - 1
        ),
        desc: round2number(item.volume),
        color: "#8c62ff",
      };

      return [
        isHiddenProfit === false ? profitEvent : [],
        isHiddenVolume === false ? volumeEvent : [],
      ];
    }
  });
  const handleNavigate = (action) => {
    if (action === "PREV") {
      setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
    } else if (action === "NEXT") {
      setCurrentDate(moment(currentDate).add(1, "month").toDate());
    }
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: "transparent", // Màu sắc của sự kiện
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "none",
    };
    return {
      style: style,
    };
  };

  const customFormats = {
    weekdayFormat: (date, culture, localizer) => {
      const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      return dayNames[date.getDay()];
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <style>
        {`
          .custom-calendar * {
            border-color: ${theme.palette.border} !important;
          }
        `}
      </style>
      <CustomToolbar
        setMode={setMode}
        mode={mode}
        label={moment(currentDate).format("MMMM YYYY")}
        onNavigate={handleNavigate}
        stat={stat}
        setStat={setStat}
        isGlobal={isGlobal}
        data={data}
        isHiddenProfit={isHiddenProfit}
        setIsHiddenProfit={setIsHiddenProfit}
        isHiddenVolume={isHiddenVolume}
        setIsHiddenVolume={setIsHiddenVolume}
      />
      {mode === false && (
        <Calendar
          className="custom-calendar"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          formats={customFormats}
          style={{ height: "100%" }}
          components={{
            header: CustomDateHeader,
            dayColumnWrapper: CustomDaySlot,
            event: CustomEvent,
            //   toolbar: CustomToolbar,
            dateCellWrapper: CustomDaySlot,
          }}
          popup
          toolbar={false}
          messages={{
            week: "Tuần",
            day: "Ngày",
            month: "Tháng",
          }}
          date={currentDate}
          firstDayOfWeek={1}
          onNavigate={(date) => setCurrentDate(date)}
        />
      )}
      {mode=== true && <Box sx={{width: "100%"}}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexDirection={downLg ? "column" : "row"}>
          <Box sx={{width: downLg ? "100%" : "48%"}}>
            <Box mb={4}>
              <Typography fontWeight={600} ml={2} fontSize={18}>Vol</Typography>
            </Box>
            <Box>
              <GrandTotalProfitChart />
            </Box>
          </Box>
          <Box sx={{width: downLg ? "100%" : "48%"}}>
            <Box mb={4}>
              <Typography fontWeight={600} ml={2} fontSize={18}>Pnl</Typography>
            </Box>
            <Box>
              <GrandPnLChart />
            </Box>
          </Box>
        </Box>
      </Box>}
      {/* {selectedEvent && (
        <Box sx={{ marginTop: 2 }}>
          <h3>Event Details</h3>
          <p>{selectedEvent.title}</p>
          <p>{selectedEvent.desc}</p>
        </Box>
      )} */}
    </div>
  );
};

export default CalendarComponent;
