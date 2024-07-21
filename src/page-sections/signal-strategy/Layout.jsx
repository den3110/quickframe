import { useContext, useEffect, useState } from "react";
import { Box, Card, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import SignalStrategyContext from "contexts/SignalStrategyContext";

const StyledNavLink = styled(NavLink)`
  &.active-custom {
    font-weight: bold;
    color: ${props => props.theme.palette.primary.main} !important;
  }
`;

const Layout = ({ children }) => {
  const theme = useTheme();
  const { data } = useContext(SignalStrategyContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location= useLocation()
  const [selectedLink, setSelectedLink]= useState(location.pathname)

  useEffect(()=> {
    setSelectedLink(location.pathname)
  }, [location.pathname])

  return (
    <Box
      sx={{ padding: downLg ? "8px" : "26px 24px 32px 24px" }}
      height="100%"
      className="abaskw"
    >
      <Box display={"flex"} alignItems={"center"} gap={2} mb={2}>
        <StyledNavLink
          theme={theme}
          exact
          to="/signal-strategies"
          className={selectedLink=== "/signal-strategies" && "active-custom"}
          // activeClassName="active"
          style={{ textDecoration: "none", color: "inherit" }}
          // sx={{color: theme.palette.primary.main + "!important"}}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary.main }, whiteSpace: "nowrap" }}
          >
            Danh sách ({data?.length})
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          theme={theme}
          to="/signal-strategies/top-signal"
          // activeClassName="active"
          className={selectedLink=== "/signal-strategies/top-signal" && "active-custom"}
          style={{ textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"} 
            sx={{ "&:hover": { color: theme.palette.primary.main }, whiteSpace: "nowrap" }}
          >
            Xếp hạng
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          theme={theme}
          to="/signal-strategies/telegram-channel"
          // activeClassName="active"
          className={selectedLink=== "/signal-strategies/telegram-channel" && "active-custom"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary.main } , whiteSpace: "nowrap" }}
          >
            Kênh Telegram
          </Typography>
        </StyledNavLink>
      </Box>
      <Card
        sx={{
          display: "flex",
        }}
      >
        <Box flexGrow={1}>{children}</Box>
      </Card>
    </Box>
  );
};

export default Layout;
