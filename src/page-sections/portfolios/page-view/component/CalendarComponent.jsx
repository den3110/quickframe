import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import rgbToRgba from "util/rgbTorgba";
import hexToRgb from "util/hexToRgba";
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

const CustomEvent = ({ event }) => (
  <Box sx={{ padding: "4px", background: "transparent" }}>
    <Box
      sx={{
        backgroundColor: rgbToRgba(hexToRgb(event.color), 0.4),
        color: "white",
        padding: "4px",
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
            background: " #fd4f4f",
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
        <Typography fontSize={10}>{event.title}</Typography>
        <Typography fontSize={14} fontWeight={600} sx={{ color: event.color }}>
          $8.00
        </Typography>
      </Box>
    </Box>
  </Box>
);

const CustomDateHeader = ({ label }) => (
  <Box
    sx={{
      padding: "10px",
      textAlign: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
    }}
  >
    {label}
  </Box>
);

const CustomToolbar = ({ label, onNavigate, onView, setMode, mode }) => {
  const theme = useTheme();
  const monthIndex = moment(label).month();
  const year = moment(label).year();
  const formattedLabel = `${monthNames[monthIndex]} ${year}`;

  return (
    <Box
      sx={{ width: "100%" }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      className="akaskwkoaw"
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
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            sx={{
              padding: .5,
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
                console.log(1)
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

const CalendarComponent = ({data= []}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const theme = useTheme();
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const events = data.flatMap((item, index) => {
    // Tạo sự kiện cho profit
    const profitEvent = {
      title: `Event ${index + 1} - Profit`,
      start: new Date(item.createdAt),
      end: new Date(item.createdAt), 
      desc: `Profit: $${Math.abs(item.profit).toFixed(2)}`,
      color: item.profit >= 0 ? "#00E396" : "#FF1654" 
    };
  
    // Tạo sự kiện cho volume
    const volumeEvent = {
      title: `Event ${index + 1} - Volume`, // Title theo mẫu Event 1, Event 2, ...
      start: new Date(item.createdAt), // Lấy ngày từ createdAt
      end: new Date(item.createdAt), // Lấy ngày từ createdAt
      desc: `Volume: ${item.volume}`, // Tạo desc từ volume
      color: "#8c62ff"  // Màu sắc dựa trên dấu của volume
    };
  
    return [profitEvent, volumeEvent]; // Trả về mảng chứa cả profitEvent và volumeEvent
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
      />
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
      {selectedEvent && (
        <Box sx={{ marginTop: 2 }}>
          <h3>Event Details</h3>
          <p>{selectedEvent.title}</p>
          <p>{selectedEvent.desc}</p>
        </Box>
      )}
    </div>
  );
};

export default CalendarComponent;
