import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SettingsContext } from "contexts/settingsContext";
import _ from "lodash";
import GrandTotalProfitChart from "./GrandTotalProfitChart";
import GrandPnLChart from "./GrandPnlChart";
import CustomDaySlot from "./canlendarComponent/CusomDaySlot";
import CustomToolbar from "./canlendarComponent/CustomToolbar";
import CustomEvent from "./canlendarComponent/CustomEvent";
import CustomDateHeader from "./canlendarComponent/CustomHeader";
import { useTranslation } from "react-i18next";


const localizer = momentLocalizer(moment);




const CalendarComponent = ({ data = [], dataStat = {}, isGlobal = false }) => {
  const {t }= useTranslation()
  const { walletMode } = useContext(SettingsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const theme = useTheme();
  const [stat, setStat] = useState();
  const [isHiddenProfit, setIsHiddenProfit] = useState(false);
  const [isHiddenVolume, setIsHiddenVolume] = useState(false);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  // console.log("data", data)
  const events = data?.filter(item=> item?.type=== "DAY").flatMap((item, index) => {
    
    if (isGlobal === true) {
      const start = new Date(item.createdAt);
      start.setDate(start.getDate());
      if (walletMode === true) {
        // live wallet
        const profitEvent = {
          title: `Profit`,
          start: start,
          end: start,
          desc: item.live_profit,
          color:
            item.live_profit >= 0
              ? theme.palette.success.main
              : theme.palette.error.main,
        };
  
        const volumeEvent = {
          title: `Volume`,
          start: start,
          end: start,
          desc: item.live_volume,
          color: "#8c62ff",
        };
  
        return [
          isHiddenProfit === false && profitEvent,
          isHiddenVolume === false && volumeEvent,
        ];
      } else {
        // demo wallet
        const profitEvent = {
          title: `Profit`,
          start: start,
          end: start,
          desc: item.demo_profit,
          color:
            item.demo_profit >= 0
              ? theme.palette.success.main
              : theme.palette.error.main,
        };
  
        const volumeEvent = {
          title: `Volume`,
          start: start,
          end: start,
          desc: item.demo_volume,
          color: "#8c62ff",
        };
  
        return [
          isHiddenProfit === false && profitEvent,
          isHiddenVolume === false && volumeEvent,
        ];
      }
    } 
    // in portfolio
    else {
      const start = new Date(item.createdAt);
      start.setDate(start.getDate() - 1);
      const profitEvent = {
        title: `Profit`,
        start: start,
        end: start,
        desc: item.profit,
        color:
          item.profit >= 0
            ? theme.palette.success.main
            : theme.palette.error.main,
      };
  
      const volumeEvent = {
        title: `Volume`,
        start: start,
        end: start,
        desc: item.volume,
        color: "#8c62ff",
      };
  
      return [
        isHiddenProfit === false && profitEvent,
        isHiddenVolume === false && volumeEvent,
      ];
    }
  });


  const groupedData = _.groupBy(events, item => `${item.title}-${moment(item.start).format("DD/MM/YYYY")}-${moment(item.end).format("DD/MM/YYYY")}-${item.color}`);
  // Create new array with combined desc
  const result = _.map(groupedData, group => ({
    title: group[0].title,
    start: group[0].start,
    end: group[0].end,
    desc: _.sumBy(group, 'desc'),
    color: group[0].color
  }))?.filter(item=> item.title !== undefined);

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
    <Box className="kalskalwaww" sx={{ height: "100%" }}>
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
        data={data?.filter(item=> item?.type=== "DAY")}
        isHiddenProfit={isHiddenProfit}
        setIsHiddenProfit={setIsHiddenProfit}
        isHiddenVolume={isHiddenVolume}
        setIsHiddenVolume={setIsHiddenVolume}
      />
      {mode === true && (
        <Calendar
          className="custom-calendar"
          localizer={localizer}
          events={result}
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
            week: t("week"),
            day: t("date"),
            month: t("Month"),
          }}
          date={currentDate}
          firstDayOfWeek={1}
          onNavigate={(date) => setCurrentDate(date)}
        />
      )}
      {mode=== false && <Box sx={{width: "100%"}}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexDirection={downLg ? "column" : "row"} gap={downLg ? 4 : 0}>
          <Box sx={{width: downLg ? "100%" : "48%"}}>
            <Box mb={4}>
              <Typography fontWeight={600} ml={2} fontSize={18}>Vol</Typography>
            </Box>
            <Box>
              <GrandTotalProfitChart data={result} monthProps={parseInt(moment(currentDate).format("M"))} />
            </Box>
          </Box>
          <Box sx={{width: downLg ? "100%" : "48%"}}>
            <Box mb={4}>
              <Typography fontWeight={600} ml={2} fontSize={18}>Pnl</Typography>
            </Box>
            <Box>
              <GrandPnLChart data={result} />
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
    </Box>
  );
};

export default CalendarComponent;
