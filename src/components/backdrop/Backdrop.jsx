import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Backdrop = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        position: "absolute",
        height: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      height={"100%"}
      {...props}
    >
      <CircularProgress {...props} />
    </Box>
  );
};

export default Backdrop;
