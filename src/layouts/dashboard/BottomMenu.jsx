import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useLayout from "./context/useLayout";
import BottomMenuDialog from "layouts/layout-parts/dialog/BottomMenuDialog";
import duotone from "icons/duotone";
import { GlobalContext } from "contexts/GlobalContext";

export default function BottomMenu() {
  const {botTotal }= React.useContext(GlobalContext)
  const { handleOpenMobileSidebar } = useLayout();
  const [openBottomMenuDialog, setOpenBottomMenuDialog] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenBottomMenuDialog = () => {
    setOpenBottomMenuDialog(true);
  };

  const handleCloseBottomMenuDialog = () => {
    setOpenBottomMenuDialog(false);
  };

  const handleNavigate = (link) => {
    setOpenBottomMenuDialog(false);
    navigate(link);
  };

  // Determine the active index based on the current path
  const getActiveIndex = () => {
    switch (location.pathname) {
      case "/dashboard":
        return 0;
      case "/portfolios":
        return 1;
      case "/budget-strategies":
        return 2;
      case "/signal-strategies":
        return 3;
      default:
        return 4; // Assuming the last item is the menu
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5 }}
      elevation={3}
    >
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={activeIndex}
        >
          <BottomNavigationAction 
            onClick={() => handleNavigate("/dashboard")} 
            icon={<duotone.DashboardIcon />} 
          />
          <BottomNavigationAction 
            onClick={() => handleNavigate("/portfolios")} 
            icon={
              <Badge badgeContent={botTotal} color="primary">
                <duotone.Portfolios />
              </Badge>
            }
          />
          <BottomNavigationAction 
            onClick={() => handleNavigate("/budget-strategies")} 
            icon={<duotone.BudgetStrategy />} 
          />
          <BottomNavigationAction 
            onClick={() => handleNavigate("/signal-strategies")} 
            icon={<duotone.SignalStrategy />} 
          />
          <BottomNavigationAction 
            onClick={handleOpenBottomMenuDialog} 
            icon={<duotone.Menu />} 
          />
        </BottomNavigation>
      </Box>
      <BottomMenuDialog open={openBottomMenuDialog} setOpen={setOpenBottomMenuDialog} onClose={handleCloseBottomMenuDialog} />
    </Paper>
  );
}
