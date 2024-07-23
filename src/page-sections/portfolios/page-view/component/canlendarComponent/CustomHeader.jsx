import { Box, useMediaQuery } from "@mui/material";

const CustomDateHeader = ({ label }) => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  
    return (
      <Box
        sx={{
          padding: "10px",
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
        fontSize={downLg && 8}
      >
        {label}
      </Box>
    );
  };

  export default CustomDateHeader