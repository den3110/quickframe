import { useState } from "react";
import {
  Box,
  Card,
  Tooltip,
  useTheme,
  Checkbox,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Menu,
  MoreVert,
} from "@mui/icons-material";
// CUSTOM COMPONENTS
import { Paragraph } from "components/typography";
import { SearchInput } from "components/search-input";
import { FlexBetween, FlexBox } from "components/flexbox";
// CUSTOM PAGE SECTION COMPONENTS
import MailSidebar from "./MailSidebar";
// CUSTOM ICON COMPONENTS
import Trash from "icons/duotone/Trash";
import Reload from "icons/duotone/Reload";
import Report from "icons/duotone/Report";
import Archive from "icons/duotone/Archive";
import ReadMail from "icons/duotone/ReadMail";
import UnreadMail from "icons/duotone/UnreadMail";
import { NavLink } from "react-router-dom";

// ==============================================================

// ==============================================================

const Layout = ({ children, showTopActions = true }) => {
  const { palette, direction } = useTheme();
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const ICONS = [
    {
      title: "Reload",
      Icon: Reload,
    },
    {
      title: "Archive",
      Icon: Archive,
    },
    {
      title: "Report",
      Icon: Report,
    },
    {
      title: "Trash",
      Icon: Trash,
    },
    {
      title: "Read All",
      Icon: ReadMail,
    },
    {
      title: "Unread All",
      Icon: UnreadMail,
    },
  ];
  return (
    <Box sx={{padding: "16px 10px 32px 10px"}} height="100%" className="abaskw">
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <NavLink to="/dashboard/signal-strategies">
          <Typography variant="h6" fontWeight={"600"}>
            Danh sách
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/signal-strategies/top-signal">
          <Typography variant="h6" fontWeight={"600"}>
            Xếp hạng
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/signal-strategies/telegram-channel">
          <Typography variant="h6" fontWeight={"600"}>
            Kênh Telegram
          </Typography>
        </NavLink>
      </Box>
      <Card
        sx={{
          display: "flex",
        }}
      >
        <Box flexGrow={1}>
          {children}
        </Box>
      </Card>
    </Box>
  );
};
export default Layout;
