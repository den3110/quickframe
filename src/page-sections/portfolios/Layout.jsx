import { useContext, useEffect, useState } from "react";
import { Box, Card, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import PortfoliosContext from "contexts/PortfoliosContext";
import { useTranslation } from "react-i18next";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  "&.active-custom": {
    fontWeight: 600,
    color: theme.palette.primary.main
  }
}));

const Layout = ({ children }) => {
  const theme= useTheme()
  const { data } = useContext(PortfoliosContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location= useLocation()
  const {t }= useTranslation()
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
          to="/portfolios"
          className={selectedLink=== "/portfolios" && "active-custom"}
          sx={{ textDecoration: "none", color: "inherit",  "&:active": { color: theme.palette.primary + "!important" }}}
        >
          <Typography
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary } }}
          >
            {t("My Portfolio")} ({data?.length})
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          theme={theme}
          to="/portfolios/statistic"
          className={selectedLink=== "/portfolios/statistic" && "active-custom"}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography 
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary },  "&:active": { color: theme.palette.primary } }}
          >
            {t("statics")}
          </Typography>
        </StyledNavLink>
        <StyledNavLink
          theme={theme}
          to="/portfolios/schedule"
          className={selectedLink=== "/portfolios/schedule" && "active-custom"}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography 
            variant="h6"
            fontWeight={"600"}
            sx={{ "&:hover": { color: theme.palette.primary },  "&:active": { color: theme.palette.primary } }}
          >
            {t("timer")}
          </Typography>
        </StyledNavLink>
      </Box>
      <Card
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{width: '100%'}} flexGrow={1}>{children}</Box>
      </Card>
    </Box>
  );
};

export default Layout;
