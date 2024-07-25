import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
// import formatCurrency from "util/formatCurrency";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InfoCard = ({ title, value, tooltip }) => {
  return (
    <Card variant="outlined" style={{ borderRadius: 16 }}>
      <Box sx={{ padding: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" fontSize={12} color="textSecondary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip placement={"top"} title={tooltip}>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography variant="body1" fontSize={14}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

function VIPInformation() {
  return (
    <Box mt={4} mb={4} >
      <Card
        sx={{
          backgroundColor: "#1c1c1c",
          color: "#fff",
          // padding: "20px",
          backgroundImage:
            'url("https://quickinvest.ai/static/media/07.d8642d0d575db73e0bfd.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 480,
            padding: "77px",
          }}
        >
          <Box>
            <Box mt={1} mb={1}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontSize={18} color="black" fontWeight={600}>
                  Thông tin VIP
                </Typography>
              </Box>
            </Box>
            <CardContent
              sx={{
                background:
                  "linear-gradient(100.6deg, rgb(0, 157, 138) 2.15%, rgb(0, 5, 19) 96.19%)",
                borderRadius: "20px",
                paddingLeft: 0,
                paddingRight: 0,
                backgroundImage:
                  "url(https://quickinvest.ai/static/media/05.0716606d155186823795.png)",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                height: 134,
                position: "relative",
                width: 480,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ padding: "0 16px" }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  {/* {dataStat?.name} */}
                  Cấp bậc VIP của bạn
                </Typography>
              </Box>
              <Box sx={{ padding: "0 16px" }}>
                <Typography variant="h4" color="success.main">
                  {/* {dataStat?.name} */}
                  1
                </Typography>
              </Box>
            </CardContent>
            <Box mt={1}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontSize={18} color="black" fontWeight={600}>
                  Điều kiện cấp bậc tiếp theo
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={6}>
                <InfoCard title="F1 VIP" value={"21/3"} tooltip={"F1 VIP"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard
                  title="KLGD F1 (Tuần này)"
                  value={"$1.09 /$2,000.00"}
                  tooltip={"KLGD F1 (Tuần này)"}
                />
              </Grid>
            </Grid>
          </Box>
          <Box flex={1} sx={{ position: "relative", textAlign: "right", height: "100%" }}>
            <img
              width={"100%"}
              height={"100%"}
              src="https://quickinvest.ai/static/media/12.d05f39a25debb79dbccf.png"
              alt="Can't display"
              style={{
                width: "100%",
                height: "auto",
                bottom: 0,
                position: "absolute",
                right: 0,
                transform: "translateY(77px)",
                maxWidth: "666.75px",
              }}
            ></img>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default VIPInformation;