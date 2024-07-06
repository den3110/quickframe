import { useContext } from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import SignalStrategyContext from "contexts/SignalStrategyContext";

const StyledNavLink = styled(NavLink)`
  &.active {
    font-weight: bold;
    color: #6950E8 !important;
  }
`;

const Layout = ({ children }) => {
  const { data } = useContext(SignalStrategyContext);

  return (
    <Box
      sx={{ padding: "16px 10px 32px 10px" }}
      height="100%"
      className="abaskw"
    >
      <Box display={"flex"} alignItems={"center"} gap={2} mb={2}>
        <StyledNavLink
          exact
          to="/dashboard/signal-strategies"
          activeStyle={{
            color: "#6950E8",
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: "#6950E8" } }}
          >
            Danh sách ({data?.length})
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          to="/dashboard/signal-strategies/top-signal"
          activeStyle={{
            color: "#6950E8",
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: "#6950E8" } }}
          >
            Xếp hạng
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          to="/dashboard/signal-strategies/telegram-channel"
          activeStyle={{
            color: "#6950E8",
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: "#6950E8" } }}
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
