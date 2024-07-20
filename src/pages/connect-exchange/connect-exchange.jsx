import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  CircularProgress,
  TextField,
  InputLabel,
  IconButton,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import userApi from "api/user/userApi";
import { useNavigate } from "react-router-dom";
import { showToast } from "components/toast/toast";
import Dialog2Fa from "components/dialog/Dialog2Fa";
import AppBarSection from "./AppBar";
import { constant } from "constant/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  // backgroundColor: "#f9fafc",
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  // backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  maxWidth: "500px",
  textAlign: "center",
  marginTop: theme.spacing(10), // Adjusted margin top to avoid overlap with AppBar
}));

const ConnectAccountPage = () => {
  const navigate = useNavigate();
  const [open2Fa, setOpen2Fa] = useState(false);
  const [token, setToken] = useState();
  const [exchangeUrl, setExchangeUrl] = useState("");
  const [dataExchangeUrl, setDataExchangeUrl] = useState();
  const [exchangeUrls, setExchangeUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [exchangeEmail, setExchangeEmail] = useState("");
  const [exchangePassword, setExchangePassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

  const handleStep = (step) => {
    setStep(parseInt(step));
  };

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

  const connectExchangeLinkAccount = async () => {
    setIsSubmitting(true);
    try {
      const data = {
        email: exchangeEmail,
        password: exchangePassword,
        clientId: dataExchangeUrl?.clientId,
      };
      const result = await userApi.postUserExchangeLinkAccount(data);
      if (result.data?.ok === true && result?.data?.d?.require2Fa === true) {
        setOpen2Fa(true);
        setToken(result?.data?.d?.t);
      } else if (result.data?.ok === true) {
        console.log(111);
        showToast(result.data?.m, "success");
        window.location.reload();
      } else {
        showToast(result?.data?.m, "error");
      }
    } catch (error) {
      showToast(
        error?.response?.data?.m || "Error connecting exchange account",
        "error"
      );
    } finally {
      setIsSubmitting(false); // Set to false when submission ends
    }
  };

  return (
    <>
      <AppBarSection />
      {step === 1 && (
        <RootContainer>
          <ContentContainer maxWidth={"522px"}>
            <Card>
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ marginBottom: 2, color: "#28a745", fontWeight: 600 }}
                >
                  Connect your account
                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                  {dataExchangeUrl && (
                    <Box
                      style={{
                        background:
                          "linear-gradient(rgb(102, 108, 117) 0%, rgb(2, 13, 29) 100%)",
                        width: "max-content",
                      }}
                      pl={4}
                      pr={4}
                      pt={2}
                      pb={2}
                      borderRadius={80}
                    >
                      <img
                        draggable={false}
                        src={
                          constant.API_URL +
                          "/assets/exchange/" +
                          dataExchangeUrl?.clientId +
                          ".svg"
                        }
                        alt="Can't open"
                      />
                    </Box>
                  )}
                </Box>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 4, color: "text.secondary" }}
                  mt={3}
                >
                  Step 1: Enter your Exchange {dataExchangeUrl?.name}
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
                      // backgroundColor: "#f9fafc",
                      textAlign: "left", // Đặt textAlign là 'left' để căn trái
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select your Exchange URL
                    </MenuItem>
                    {exchangeUrls.map((item, key) => (
                      <MenuItem
                        onClick={() => {
                          setDataExchangeUrl(item);
                        }}
                        key={key}
                        value={item._id}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <img
                            draggable={false}
                            style={{ width: 32, height: 32 }}
                            src={
                              constant.API_URL +
                              "/assets/exchange/" +
                              item?.clientId +
                              ".ico"
                            }
                            alt="Can't open"
                          />
                          <Typography>{item?.name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => handleStep(2)}
                  sx={{
                    marginTop: 2,
                    padding: (theme) => theme.spacing(1.5, 0),
                    fontWeight: 600,
                  }}
                  disabled={!exchangeUrl}
                >
                  Continue
                </Button>
              </Box>
            </Card>
          </ContentContainer>
        </RootContainer>
      )}
      {step === 2 && (
        <RootContainer>
          <ContentContainer maxWidth={"522px"}>
            <Card>
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ marginBottom: 2, color: "#28a745", fontWeight: 600 }}
                >
                  Connect your account
                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    style={{
                      background:
                        "linear-gradient(rgb(102, 108, 117) 0%, rgb(2, 13, 29) 100%)",
                      width: "max-content",
                    }}
                    pl={4}
                    pr={4}
                    pt={2}
                    pb={2}
                    borderRadius={80}
                  >
                    <img
                      draggable={false}
                      src={
                        constant.API_URL +
                        "/assets/exchange/" +
                        dataExchangeUrl?.clientId +
                        ".svg"
                      }
                      alt="Can't open"
                    />
                  </Box>
                </Box>
                <Typography
                  component="div"
                  sx={{ marginBottom: 2, color: "#555", fontWeight: 600 }}
                  mt={1}
                >
                  {dataExchangeUrl?.homeUrl?.replace("https://", "")}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ marginBottom: 4, color: "text.secondary" }}
                >
                  Step 2: Input Your Information
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: 4,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  Enter your exchange account credentials to continue the
                  connection.
                </Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <InputLabel
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      Exchange Email
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Exchange Email"
                      value={exchangeEmail}
                      onChange={(e) => setExchangeEmail(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <InputLabel
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      Exchange Password
                    </InputLabel>
                    <TextField
                      type="password"
                      fullWidth
                      variant="outlined"
                      placeholder="Exchange Password"
                      value={exchangePassword}
                      onChange={(e) => setExchangePassword(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                  </>
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
                  disabled={!exchangeEmail || !exchangePassword || isSubmitting} // Disable if submitting
                  onClick={connectExchangeLinkAccount}
                >
                  {isSubmitting ? "Connecting..." : "Connect"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: (theme) => theme.spacing(1.5, 0),
                    fontWeight: 600,
                  }}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </Box>
            </Card>
            <Dialog2Fa
              open={open2Fa}
              setOpen={setOpen2Fa}
              dataExchangeUrl={dataExchangeUrl}
              email={exchangeEmail}
              token={token}
            />
          </ContentContainer>
        </RootContainer>
      )}
    </>
  );
};

export default ConnectAccountPage;
