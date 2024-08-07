import { Box, styled } from "@mui/material";
// LAYOUT BASED HOOK
import useLayout from "../dashboard/context/useLayout";

// STYLED COMPONENT
const RootBox = styled(Box)(({
  theme,
  compact
}) => ({
  marginLeft: compact ? 86 : 280,
  transition: "margin-left 0.3s ease-in-out",
  [theme.breakpoints.down(974)]: {
    marginLeft: 0
  }
}));
const LayoutBodyWrapper = ({
  children
}) => {
  const {
    sidebarCompact
  } = useLayout();
  return <RootBox compact={sidebarCompact ? 1 : 0}>
      <Box sx={{width: "100%"}} className="anmasw">{children}</Box>
    </RootBox>;
};
export default LayoutBodyWrapper;