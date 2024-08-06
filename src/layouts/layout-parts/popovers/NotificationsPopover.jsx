import { Fragment, memo, useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  styled,
  Tab,
  Tooltip,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// CUSTOM COMPONENTS
import PopoverLayout from "./PopoverLayout";
import { FlexBox } from "components/flexbox";
import { Paragraph, Small } from "components/typography";
// CUSTOM ICON COMPONENT
import NotificationsIcon from "icons/NotificationsIcon";
import notificationApi from "api/notification/notificationApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { NotificationContext } from "contexts/NotificationsContext";

const NotificationsPopover = (props) => {
  const { data, setData, unReadNotification, setUnReadNotification}= useContext(NotificationContext)
  const { hiddenViewButton } = props;
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const anchorRef = useRef(null);
  
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("1");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleReadNotification = async (selectedNotification) => {
    try {
      const response = await notificationApi.userReadNotification(
        selectedNotification?._id,
        {}
      );
      if (response?.data?.ok === true) {
        const dataTemp = data;
        const findIndex = data?.findIndex(
          (item) => item?._id === selectedNotification?._id
        );
        if (findIndex !== -1) {
          if (
            dataTemp?.find(
              (item) =>
                item?._id === selectedNotification?._id &&
                item?.is_read === false
            )
          ) {
            setUnReadNotification((prev) => parseInt(prev) - 1);
            dataTemp[findIndex] = { ...dataTemp[findIndex], is_read: true };
          }
        }
        setData([...dataTemp]);
      }
    } catch (error) {
      showToast();
    }
  };

  const handleReadAllNotification = async () => {
    setUnReadNotification(0);
    setOpen(false);
    try {
      const response = await notificationApi.userReadAllNotification();
      if (response?.data?.ok === true) {
        const updatedData = data.map((item) => ({ ...item, is_read: true }));
        setData(updatedData);
      }
    } catch (error) {
      showToast();
    }
  };

  useEffect(() => {
    if (!inView) {
      setVisibleCount(6);
    }
  }, [inView]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <Fragment>
      <Tooltip title={t("Notifications")}>
        <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
          <Badge color="error" badgeContent={unReadNotification}>
            <NotificationsIcon
              sx={{
                color: "grey.400",
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>

      <PopoverLayout
        title={t("Notifications")}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
      >
        <TabContext value={tabValue}>
          <Box ref={ref}>
            {data.length === 0 ? (
              <Paragraph fontWeight="500" textAlign="center" p={2}>
                There are no notifications
              </Paragraph>
            ) : (
              <TabPanel value="1">
                {data.slice(0, visibleCount).map((msg) => (
                  <ListItem
                    onClick={handleReadNotification}
                    msg={msg}
                    key={msg._id}
                    onClose={() => setOpen(false)}
                  />
                ))}
                {visibleCount < data.length && (
                  <Box p={1} pb={0.5}>
                    <Button
                      onClick={handleShowMore}
                      variant="text"
                      fullWidth
                      disableRipple
                    >
                      {t("See more")}
                    </Button>
                  </Box>
                )}
                {!hiddenViewButton ? (
                  <Box p={1} pb={0.5}>
                    <Button
                      onClick={handleReadAllNotification}
                      variant="text"
                      fullWidth
                      disableRipple
                    >
                      {t("mark_read_all")}
                    </Button>
                  </Box>
                ) : null}
              </TabPanel>
            )}
          </Box>
        </TabContext>
      </PopoverLayout>
    </Fragment>
  );
};

function ListItem({ msg, onClose, onClick }) {
  const navigate = useNavigate();

  return (
    <FlexBox
      onClick={() => {
        onClick(msg);
        navigate(msg?.href);
        onClose();
      }}
      p={2}
      gap={2}
      alignItems="center"
      sx={{
        borderBottom: 1,
        cursor: "pointer",
        borderColor: "divider",
        backgroundColor: msg?.is_read === false ? "grey.700" : "transparent",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <FlexBox alignItems="center">
        <Box />
        <Box dangerouslySetInnerHTML={{ __html: msg.icon }}></Box>
      </FlexBox>

      <Box>
        <Paragraph fontWeight={500}>{msg.title}</Paragraph>
        <Small
          sx={{ overflow: "hidden" }}
          ellipsis={true}
          color="text.secondary"
        >
          <Box sx={{whiteSpace: "normal"}} dangerouslySetInnerHTML={{ __html: msg.content }}>
            
          </Box>
          {/* {msg.content} */}
        </Small>
      </Box>
    </FlexBox>
  );
}

export default memo(NotificationsPopover);
