import { useContext } from "react";
import { Box, Card, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import SignalStrategyContext from "contexts/SignalStrategyContext";

const StyledNavLink = styled(NavLink)`
  &.active {
    font-weight: bold;
    color: ${props => props.theme.palette.primary.main} !important;
  }
`;

const Layout = ({ children }) => {
  const theme= useTheme()
  const { data } = useContext(SignalStrategyContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
          activeStyle={{
            color: theme.palette.primary,
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary } }}
          >
            Danh sách ({data?.length})
          </Typography>
        </StyledNavLink>
        <StyledNavLink
        theme={theme}
          to="/signal-strategies/top-signal"
          activeStyle={{
            color: theme.palette.primary,
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary } }}
          >
            Xếp hạng
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          theme={theme}
          to="/signal-strategies/telegram-channel"
          activeStyle={{
            color: theme.palette.primary,
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary } }}
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
