import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper } from "@mui/material";
import useLayout from "./context/useLayout";
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from "react-router-dom";
export default function BottomMenu() {
  const [value, setValue] = React.useState(0);
  const { handleOpenMobileSidebar } = useLayout();
  const navigate= useNavigate()
  const handleNavigate= (link)=> {
    navigate(link)
  }
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
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
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard")} label="Dashboard" icon={<RestoreIcon />} />
          <BottomNavigationAction onClick={()=> handleNavigate("/dashboard/profile")} label="Profile" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Wallet" icon={<LocationOnIcon />} />
          <BottomNavigationAction onClick={handleOpenMobileSidebar} label="More" icon={<MenuIcon />} />
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
