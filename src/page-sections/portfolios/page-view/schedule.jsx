import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Eventcalendar } from "@mobiscroll/react";
import { isDark } from "util/constants";
import NewSchedule from "../page-sections/schedule/NewSchedule";
import AddIcon from "@mui/icons-material/Add";
import EditBudgetStrategy from "icons/budget-strategy/EditBudgetStrategy";
import DeleteBudgetStrategyIcon from "icons/budget-strategy/DeleteBudgetStrategy";
import DeleteSchedule from "../page-sections/schedule/DeleteSchedule";
import portfolioApi from "api/portfolios/portfolioApi";
import sortData from "util/sortData";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import { useTranslation } from "react-i18next";

const PortfolioSchedule = () => {
  const theme = useTheme();
  const {t} =useTranslation()
  const [loading, setLoading] = useState();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [data, setData] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteSchedule, setDeleteSchedule] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [change, setChange] = useState(false);
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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.userScheduleList();
        if (response?.data?.ok === true) {
          const apiData = response?.data?.d || [];
          setData(apiData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const newResources = sortData(data, "createdAt", "desc").map(
      (item, index) => ({
        ...item,
        id: index + 1,
        name: item.name,
        color: getRandomColor(),

      })
    );
    setResources(newResources);

    const today = new Date();
    const formattedEvents = sortData(data, "createdAt", "desc").map((event) => {
      if (event?.stop_time) {
        const [hours, minutes] = event.start_time.split(":").map(Number);
        const [hoursStop, minutesStop] = event?.stop_time
          .split(":")
          .map(Number);
        const startDate = new Date(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hours,
            minutes
          ).getTime() +
            7 * 60 * 60 * 1000
        );
        const endDate = new Date(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hoursStop,
            minutesStop
          ).getTime() +
            7 * 60 * 60 * 1000
        );
        if (startDate.getDate() !== today.getDate()) {
          startDate.setDate(today.getDate());
        }

        if (endDate.getDate() !== today.getDate()) {
          endDate.setDate(today.getDate());
        }
        return {
          id: event._id,
          _id: event._id,
          start: startDate,
          end: endDate,
          resource: newResources.find((r) => r.name === event.name)?.id || 1, 
          text: event.name,
          botIds: event.botIds,
          name: event.name,
          start_time: event.start_time,
          stop_time: event.stop_time,
        };
      } else {
        const [hours, minutes] = event.start_time.split(":").map(Number);
        const startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes
        );
        const endDate = new Date(
          startDate.getTime(),
          today.getMonth(),
          today.getDate() + 36000
        );
        return {
          id: event._id,
          _id: event._id,
          start: startDate,
          end: endDate,
          resource: newResources.find((r) => r.name === event.name)?.id || 1, // Match resource id based on name
          text: event.name,
          botIds: event.botIds,
          name: event.name,
          start_time: event.start_time,
          stop_time: event.stop_time,

        };
      }
    });
    setEvents(formattedEvents);
  }, [data, change]);

  const getRandomColor = () => {
    // Function to generate random color for resources
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
        <Typography color={"success.main"} fontSize={14} fontWeight={600}>
          {resource?.name}
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton
            onClick={() => {
              toggleDrawer();
              setIsEdit(true);
              setSelectedSchedule(resource);
            }}
          >
            <EditBudgetStrategy />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteSchedule(true);
              setSelectedSchedule(resource);
            }}
          >
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

  return (
    <Layout>
      <Box pt={2} pb={4} sx={{ width: "100%" }}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? "" : "20px" }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItefs={"center"}
              mb={2}
            >
              <Box>
                <Typography fontSize={18} fontWeight={600}>
                  {t("Timer List")}
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
                  {t("Add Timer")}
                </Button>
              </Box>
            </Box>
            {data?.length > 0 && (
              <Box sx={{ overflow: "auto" }}>
                <Eventcalendar
                  onPageLoaded={()=> {
                    setLoading(false)
                  }}
                  onPageLoading={()=> {
                    setLoading(true)
                  }}
                  // ={()=> console.log("loading")}
                  // onPageLoading={()=> setLoading(true)}
                  // drag
                  timeFormat="HH:mm"
                  cssClass={
                    isDark(theme)
                      ? "custom-background-dark"
                      : "custom-background-light"
                  }
                  view={myView}
                  data={myEvents}
                  resources={resources}
                  renderResource={renderResource}
                  renderResourceHeader={renderResourceHeader}
                  renderHeader={renderHeader}
                  onEventClick={(data) => {
                    toggleDrawer();
                    setIsEdit(true);
                    setSelectedSchedule(data?.event);
                  }}
                />
              </Box>
            )}
            {loading === false && data?.length <= 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmptyPage
                  title={"Danh mục hẹn giờ trống"}
                  disableButton={true}
                />
              </Box>
            )}
            {loading === true && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <NewSchedule
        open={drawerOpen}
        onClose={toggleDrawer}
        dataProps={data}
        setDataProps={setData}
        selectedSchedule={selectedSchedule}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setChange={setChange}
        // setS
      />
      <DeleteSchedule
        selectedSchedule={selectedSchedule}
        open={deleteSchedule}
        onClose={() => {
          setDeleteSchedule(false);
        }}
        dataProps={data}
        setDataProps={setData}
      />
    </Layout>
  );
};

export default PortfolioSchedule;
