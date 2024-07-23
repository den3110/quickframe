const { Typography, useTheme, useMediaQuery, Box } = require("@mui/material");
const { default: formatCurrency } = require("util/formatCurrency");
const { default: hexToRgb } = require("util/hexToRgba");
const { default: rgbToRgba } = require("util/rgbTorgba");

const CustomEvent = ({ event }) => {
    const theme= useTheme()
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  
    return (
      <Box sx={{ padding: downLg ? 0 : "4px", background: "transparent" }}>
        <Box
          sx={{
            backgroundColor: rgbToRgba(hexToRgb(event.color), 0.1),
            color: "white",
            padding: downLg ? 0 : "4px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              paddingLeft: "8px",
              "&::after": {
                background: event.color,
                borderRadius: 2,
                content: '""',
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: 3,
              },
            }}
          >
            <Typography
              sx={{ filter: "contrast(2.5)", color: theme.palette.text.primary }}
              fontSize={downLg ? 8 : 10}
            >
              {event.title}
            </Typography>
            <Typography
              fontSize={downLg ? 8 : 14}
              fontWeight={600}
              sx={{ color: event.color, filter: "contrast(2.5)" }}
            >
              {formatCurrency(event.desc)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  export default CustomEvent