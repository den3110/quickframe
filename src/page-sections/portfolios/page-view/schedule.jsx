import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Eventcalendar,
  getJson,
  setOptions /* localeImport */,
} from "@mobiscroll/react";
import { isDark } from "util/constants";
import NewSchedule from "../page-sections/schedule/NewSchedule";
import AddIcon from "@mui/icons-material/Add";
import EditBudgetStrategy from "icons/budget-strategy/EditBudgetStrategy";
import DeleteBudgetStrategyIcon from "icons/budget-strategy/DeleteBudgetStrategy";
import DeleteSchedule from "../page-sections/schedule/DeleteSchedule";
// Sample data for the timeline

const PortfolioSchedule = () => {
  const theme = useTheme();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [myEvents, setEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteSchedule, setDeleteSchedule]= useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const myView = useMemo(
    () => ({
      timeline: {
        type: "day",
      },
    }),
    []
  );

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: "Ryan",
        color: "#fdf500",
      },
      {
        id: 2,
        name: "Kate",
        color: "#ff4600",
      },
      {
        id: 3,
        name: "John",
        color: "#ff0101",
      },
      {
        id: 4,
        name: "Mark",
        color: "#239a21",
      },
      {
        id: 5,
        name: "Sharon",
        color: "#8f1ed6",
      },
      {
        id: 6,
        name: "Ashley",
        color: "#01adff",
      },
    ],
    []
  );

  const renderResource = (resource) => (
    <Box
      className="render-resource-custom"
      display={"flex"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography color={"success.main"}>Plans: {resource?.name}</Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton onClick={() => {
            toggleDrawer()
            setIsEdit(true)
          }}>
            <EditBudgetStrategy />
          </IconButton>
          <IconButton onClick={() => {
            setDeleteSchedule(true)
          }}>
            <DeleteBudgetStrategyIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  const renderResourceHeader = (resource) => (
    <Box className="render-resource-header-custom">
      <Typography color={"text.main"}>Plans</Typography>
    </Box>
  );

  const renderHeader = (resource) => (
    <Box className="render-header-custom"></Box>
  );

  useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/timeline-events/",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);
  return (
    <Layout>
      <Box pt={2} pb={4} sx={{ width: "100%" }}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? "" : "20px" }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={2}
            >
              <Box>
                <Typography fontSize={18} fontWeight={600}>
                  Danh sách
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    toggleDrawer();
                  }}
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                >
                  New schedule
                </Button>
              </Box>
            </Box>
            <Box sx={{ overflow: "auto" }}>
              <Eventcalendar
                // drag
                timeFormat="HH:mm"
                cssClass={
                  isDark(theme)
                    ? "custom-background-dark"
                    : "custom-background-light"
                }
                view={myView}
                data={myEvents}
                resources={myResources}
                renderResource={renderResource}
                renderResourceHeader={renderResourceHeader}
                renderHeader={renderHeader}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <NewSchedule open={drawerOpen} onClose={toggleDrawer} />
      <DeleteSchedule open={deleteSchedule} onClose={()=> {
        setDeleteSchedule(false)
      }} />
    </Layout>
  );
};

export default PortfolioSchedule;
