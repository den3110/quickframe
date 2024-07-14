import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
// CUSTOM DEFINED HOOK
import useAuth from "hooks/useAuth";
import useNavigate from "hooks/useNavigate";
import useLocation from "hooks/useLocation";
// LAYOUT BASED HOOK
import useLayout from "./context/useLayout";
// CUSTOM COMPONENTS
import SidebarAccordion from "./SidebarAccordion";
import { navigations } from "../layout-parts/navigation";
// CUSTOM STYLED COMPONENTS
import {
  ItemText,
  ListLabel,
  BulletIcon,
  ICON_STYLE,
  ExternalLink,
  NavItemButton,
} from "../layout-parts/styles/sidebar";
import { Box, Divider, Badge, useMediaQuery } from "@mui/material";
import { GlobalContext } from "contexts/GlobalContext";

// ===========================================================================

// ===========================================================================

const MultiLevelMenu = ({ sidebarCompact }) => {
  const {botTotal }= useContext(GlobalContext)
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleCloseMobileSidebar } = useLayout();

  // HANDLE ACTIVE CURRENT PAGE
  const activeRoute = (path) => {
    // Check if the current pathname matches the path exactly or starts with the path followed by a '/'
    if(path=== "/dashboard/" && window.location.pathname==="/dashboard") {
      return 1
    }
    return pathname === path || pathname.startsWith(path + '/') ? 1 : 0;
  };

  // HANDLE NAVIGATE TO ANOTHER PAGE
  const handleNavigation = (path) => {
    navigate(path);
    handleCloseMobileSidebar?.();
  };

  // ACTIVATE SIDEBAR COMPACT
  const COMPACT = sidebarCompact ? 1 : 0;

  // RECURSIVE FUNCTION TO RENDER MULTI LEVEL MENU
  const renderLevels = (data) => {
    return data.map((item, index) => {
      // MENU LABEL DESIGN
      if (item.type === "label") {
        return (
          <ListLabel key={index} compact={COMPACT}>
            {t(item.label)}
          </ListLabel>
        );
      }
      if (item.type === "divider") {
        return (
          <Box key={index} mt={1} mb={1}>
            <Divider />
          </Box>
        );
      }

      // MENU LIST WITH CHILDREN
      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      }

      // MENU ITEM WITH EXTERNAL LINK
      if (item.type === "extLink") {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavItemButton key={item.name} name="child" active={0}>
              <Box className="asklaskaw">
                {item.icon ? (
                  <item.icon sx={ICON_STYLE(0)} />
                ) : (
                  <span className="item-icon icon-text">{item.iconText}</span>
                )}

                <ItemText compact={COMPACT} active={activeRoute(item.path)}>
                  {item.name}
                </ItemText>
              </Box>
              <Badge
                badgeContent={item.badgeContent}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              />
            </NavItemButton>
          </ExternalLink>
        );
      }
      return (
        <NavItemButton
          key={index}
          disabled={item.disabled}
          active={activeRoute(item.path)}
          onClick={() => handleNavigation(item.path)}
          sx={{justifyContent: "space-between"}}
        >
          <Box className="asklaskaw" sx={{width: COMPACT=== 1 ? "100%" : "aaa"}}>
            {item?.icon ? (
              <item.icon sx={ICON_STYLE(activeRoute(item.path))} />
            ) : (
              <BulletIcon active={activeRoute(item.path)} />
            )}

            <ItemText compact={COMPACT} active={activeRoute(item.path)}>
              {t(item.name)}
            </ItemText>
          </Box>
          {index=== 2 && 
            <Badge
              badgeContent={botTotal?.toString()}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            />
          }
        </NavItemButton>
      );
    });
  };

  // USER ROLE BASED ON FILTER NAVIGATION
  const filterNavigation = useMemo(() => {
    return navigations.filter((navigation) => {
      if (!navigation.access) return true;
      else if (navigation.access === user?.role) return true;
      else return false;
    });
  }, [user?.role]);
  return <>{renderLevels(filterNavigation)}</>;
};
export default MultiLevelMenu;
