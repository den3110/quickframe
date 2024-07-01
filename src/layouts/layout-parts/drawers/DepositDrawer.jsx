import { Box, Drawer } from "@mui/material";
import React from "react";

const DepositDrawer = (props) => {
  const toggleDrawer = () => {
    props?.setOpen((prev) => !prev);
  };
  return (
    <Drawer
      opne={props?.open}
      onClose={toggleDrawer}
      anchor={"right"}
    >
      <Box sx={{width: 300}}>
        aaa
      </Box>
    </Drawer>
  );
};

export default DepositDrawer;
