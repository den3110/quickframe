import { useContext } from "react";
import { Box, Card, styled, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import PortfoliosContext from "contexts/PortfoliosContext";

const StyledNavLink = styled(NavLink)`
  &.active {
    font-weight: bold;
    color: #6950E8 !important;
  }
`;

const Layout = ({ children }) => {
  const { data } = useContext(PortfoliosContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{ padding: downLg ? "8px" : "26px 24px 32px 24px" }}
      height="100%"
      className="abaskw"
    >
      <Box display={"flex"} alignItems={"center"} gap={2} mb={2}>
        <StyledNavLink
          exact
          to="/dashboard/portfolios"
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
          to="/dashboard/portfolios/statistic"
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
            Thống kê
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          to="/portfolios/schedule  "
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
            Hẹn giờ
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
