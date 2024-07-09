import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from '@mui/icons-material/Home';
import { Paper } from "@mui/material";
import useLayout from "./context/useLayout";
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from "react-router-dom";
import BottomMenuDialog from "layouts/layout-parts/dialog/BottomMenuDialog";
import duotone from "icons/duotone";

export default function BottomMenu() {
  const [value, setValue] = React.useState(0);
  const { handleOpenMobileSidebar } = useLayout()
  const [openBottomMenuDialog, setOpenBottomMenuDialog]= React.useState(false)
  const navigate= useNavigate()
  const handleOpenBottomMenuDialog= ()=> {
    setOpenBottomMenuDialog(true)
  }
  const handleNavigate= (link)=> {
    setOpenBottomMenuDialog(false)
    navigate(link)
  }
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5 }}
      elevation={3}
    >
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard")}  icon={<duotone.DashboardIcon />} />
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard/portfolios")} icon={<duotone.Portfolios />} />
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard/budget-strategies")}  icon={<duotone.BudgetStrategy />} />
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard/signal-strategies")}  icon={<duotone.SignalStrategy />} />
          <BottomNavigationAction onClick={setOpenBottomMenuDialog} icon={<duotone.Menu />} />
        </BottomNavigation>
      </Box>
      <BottomMenuDialog open={openBottomMenuDialog} setOpen={setOpenBottomMenuDialog} />
    </Paper>
  );
}
