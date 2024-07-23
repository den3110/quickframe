const { Box, Typography } = require("@mui/material");

const CustomDaySlot = ({ children }) => (
    <div className="rbc-day-bg">
      <Box
        sx={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="body2">{children}</Typography>
      </Box>
    </div>
  );
  
  export default CustomDaySlot