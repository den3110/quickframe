import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add"
import { isDark } from "util/constants";

const PopupControllSignalStategy = ({ onClickNewPlan }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        position: downLg ? "fixed" : "absolute",
        left: "50%",
        top: !downLg && "50px",
        bottom: downLg && "56px",
        transform: "translateX(-50%)",
        width: downLg ? "100%" : "auto",
        zIndex: 9,
        background: theme=> isDark(theme) ? theme.palette.background.cell : "white",
        boxShadow:
          !downLg && "8.08219px 12.1233px 40.411px rgb(97 106 119 / 53%)",
        borderRadius: !downLg && "8px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: downLg ? "center" : "", padding: 1 }}>
        <Button
          onClick={onClickNewPlan}
          startIcon={<AddIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          Tạo plan
        </Button>
      </Box>
      {downLg && <Divider />}
    </Box>
  );
};

export default PopupControllSignalStategy;
