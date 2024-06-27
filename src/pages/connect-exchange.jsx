import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  Link,
  AppBar,
  Toolbar,
  Container,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import userApi from "api/user/userApi";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f9fafc",
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  maxWidth: "500px",
  textAlign: "center",
  marginTop: theme.spacing(10), // Adjusted margin top to avoid overlap with AppBar
}));

const ConnectAccountPage = () => {
  const [exchangeUrl, setExchangeUrl] = useState("");
  const [exchangeUrls, setExchangeUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeUrls = async () => {
      try {
        const response = await userApi.getUserExchangeList();
        setExchangeUrls(response.data?.d);
      } catch (error) {
        console.error("Error fetching exchange URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeUrls();
  }, []);

  const handleUrlChange = (event) => {
    setExchangeUrl(event.target.value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        style={{ backgroundColor: "#fff" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <img src="/logo.png" alt="Quickinvest Logo" style={{ height: '30px', marginRight: '10px' }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Quickframe
            </Typography>
          </Box>
          <Box>
            <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
              English
            </Link>
            <Link href="#" color="inherit">
              Logout
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <RootContainer>
        <ContentContainer maxWidth={"522px"}>
          <Typography
            variant="h4"
            component="div"
            sx={{ marginBottom: 2, color: "#28a745", fontWeight: 600 }}
          >
            Connect your account
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 4, color: "text.secondary" }}
          >
            Step 1: Enter your Exchange URL
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Select
              fullWidth
              variant="outlined"
              value={exchangeUrl}
              onChange={handleUrlChange}
              displayEmpty
              sx={{
                marginBottom: 2,
                backgroundColor: "#f9fafc",
                textAlign: "left", // Đặt textAlign là 'left' để căn trái
              }}
            >
              <MenuItem value="" disabled>
                Select your Exchange URL
              </MenuItem>
              {exchangeUrls.map((item, key) => (
                <MenuItem key={key} value={item._id}>
                  {item?.apiUrl}
                </MenuItem>
              ))}
            </Select>
          )}
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              marginTop: 2,
              padding: (theme) => theme.spacing(1.5, 0),
              fontWeight: 600,
            }}
            disabled={!exchangeUrl}
          >
            Continue
          </Button>
        </ContentContainer>
      </RootContainer>
    </>
  );
};

export default ConnectAccountPage;
