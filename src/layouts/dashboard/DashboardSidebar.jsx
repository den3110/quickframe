import { useState } from "react";
import { Box, IconButton } from "@mui/material";
// LAYOUT BASED HOOK
import useLayout from "./context/useLayout";
// CUSTOM COMPONENTS
import { Link } from "components/link";
import { Scrollbar } from "components/scrollbar";
import { FlexBetween } from "components/flexbox";
import MultiLevelMenu from "./MultiLevelMenu";
// CUSTOM ICON COMPONENT
import ArrowLeftToLine from "icons/duotone/ArrowLeftToLine";
// STYLED COMPONENTS
import { SidebarWrapper } from "../layout-parts/styles/sidebar";
import InfoExchange from "../layout-parts/InfoExchange";
const TOP_HEADER_AREA = 70;
const DashboardSidebar = () => {
  const { sidebarCompact, handleSidebarCompactToggle } = useLayout();
  const [onHover, setOnHover] = useState(false);

  // ACTIVATE COMPACT WHEN TOGGLE BUTTON CLICKED AND NOT ON HOVER STATE
  const COMPACT = sidebarCompact && !onHover ? 1 : 0;
  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween padding="1.5rem 1rem .5rem 1.8rem" height={TOP_HEADER_AREA}>
        {/* LOGO */}
        <Link href="/">
          <Box
            component="img"
            src="/static/logo/logo-svg.svg"
            alt="logo"
            width={60}
          />
        </Link>

        {/* SIDEBAR COLLAPSE BUTTON */}
        {!COMPACT ? (
          <IconButton onClick={handleSidebarCompactToggle}>
            <ArrowLeftToLine />
          </IconButton>
        ) : null}
      </FlexBetween>

      <Scrollbar
        className="scroll-container-navigation-bar"
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: "hidden",
          height: `calc(100vh - ${TOP_HEADER_AREA}px)`,
        }}
      >
        <Box height="calc(100vh - 70px)" px={2} display="flex" flexDirection={"column"} justifyContent={"space-between"}>
          {/* NAVIGATION ITEMS */}
          <div className="container-horizontal-bar">
            <MultiLevelMenu sidebarCompact={!!COMPACT} />
          </div>
          {/* USER ACCOUNT INFO */}
          {!COMPACT ? <InfoExchange /> : null}
        </Box>
      </Scrollbar>
    </SidebarWrapper>
  );
};
export default DashboardSidebar;
