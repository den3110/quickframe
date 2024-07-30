import { Fragment, memo, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  styled,
  Tab,
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

const NotificationsPopover = (props) => {
  const { hiddenViewButton } = props;
  const anchorRef = useRef(null);
  const [data, setData] = useState([]);
  const [unReadNotification, setUnReadNotification] = useState();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("1");
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

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
      }
    } catch (error) {
      showToast();
    } finally {
    }
  };

  const handleReadAllNotification = async () => {
    setUnReadNotification(0)
    setOpen(false);
    try {
      const response = await notificationApi.userReadAllNotification();
      if (response?.data?.ok === true) {
        setUnReadNotification(0)
      }
      // assumption
      else {
        setUnReadNotification(0)
      }
    } catch (error) {
      console.log(error)
      // assumption 
      setUnReadNotification(0)
      showToast();
    } finally {
    }
  };
  // const handleTabChange = (_, value) => setTabValue(value);

  useEffect(() => {
    (async () => {
      try {
        const response = await notificationApi.getUserNotification();
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
          setUnReadNotification(response?.data?.no_read_count);
        } else if (response?.data?.ok === false) {
        }
      } catch (error) {
        showToast(error?.response?.data?.m || t("unknown_error"), "error");
      }
    })();
  }, [t]);

  // UNREAD MESSAGES LENGTH
  return (
    <Fragment>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge color="error" badgeContent={unReadNotification}>
          <NotificationsIcon
            sx={{
              color: "grey.400",
            }}
          />
        </Badge>
      </IconButton>

      <PopoverLayout
        title="Notifications"
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
      >
        <TabContext value={tabValue}>
          {/* <TabList onChange={handleTabChange}>
            <StyledTab value="1" label={`Messages (${UNREAD_MSG_LEN})`} />
            <StyledTab value="2" label="Archived" />
          </TabList> */}

          <Box ref={ref}>
            {data.length === 0 ? (
              <Paragraph fontWeight="500" textAlign="center" p={2}>
                There are no notifications
              </Paragraph>
            ) : (
              <TabPanel value="1">
                {data.map((msg) => (
                  <ListItem
                    onClick={handleReadNotification}
                    msg={msg}
                    key={msg.id}
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                ))}
                {!hiddenViewButton ? (
                  <Box p={1} pb={0.5}>
                    <Button onClick={handleReadAllNotification} variant="text" fullWidth disableRipple>
                      Mark read all
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

// ListItem component props

function ListItem({ msg, onClose, onClick }) {
  const isNew = msg.type === "new_message";
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
        backgroundColor: isNew ? "action.hover" : "transparent",
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
          {msg.content}
        </Small>
      </Box>
    </FlexBox>
  );
}
export default memo(NotificationsPopover);
