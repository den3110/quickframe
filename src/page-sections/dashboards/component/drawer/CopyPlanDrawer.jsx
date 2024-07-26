import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { showToast } from "components/toast/toast";

const CopyPlanDrawer = (props) => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { open, setOpen } = props;
  const onClose = () => {
    setOpen(false);
  };

  const handleConfirmAndSave= ()=> {
    showToast("Copy gói thành công", "success")
    setOpen(false)
  }

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} height={downLg ? "70vh" : "100vh"} open={open} onClose={onClose}>
      <Box width={downLg ? "100%" : 480}>
        <Box p={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" gutterBottom>
              Review plan
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box p={3}>
          <Typography
            textAlign={"center"}
            variant="h6"
            color="success.main"
            gutterBottom
          >
            Easy to set up plan - Easy to multiply earnings
          </Typography>
          <Typography
            textAlign={"center"}
            variant="body2"
            color="textSecondary"
          >
            Simply save and you’ll have an excellent investing strategy right
            away.
          </Typography>
          <Box mt={4} p={3} border="1px solid #e0e0e0" borderRadius="8px">
            <Typography fontWeight={600} variant="h6" gutterBottom>
              kennguyentrader Copy
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Allocated Budget</Typography>
              <Typography variant="h6">$5,000.00</Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Account Type</Typography>
              <Typography fontSize={14} fontWeight={600}>
                LIVE
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Take Profit/Stoploss</Typography>
              <Typography fontSize={14} fontWeight={600}>
                $0.00/$0.00
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Budget Strategy</Typography>
              <Typography fontSize={14} fontWeight={600}>
                All orders
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Signal Strategy</Typography>
              <Typography fontSize={14} fontWeight={600}>
                Bot AI
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontSize={12}>Base Amount</Typography>
              <Typography fontSize={14} fontWeight={600}>
                $50.00
              </Typography>
            </Box>
          </Box>
          <Box mt={3} textAlign="right">
            <Button variant="contained" color="success" onClick={handleConfirmAndSave}>
              Confirm & Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CopyPlanDrawer;
