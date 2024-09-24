import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  maxWidth: "500px",
  textAlign: "center",
  marginTop: theme.spacing(10), 
}));

const ConnectAccountPage = () => {
  const navigate = useNavigate();
  const {t }= useTranslation()
  const {selectedLinkAccount, setSelectedLinkAccount }= useContext(AuthContext)
  const [open2Fa, setOpen2Fa] = useState(false);
  const [token, setToken] = useState();
  const [exchangeUrl, setExchangeUrl] = useState("");
  const [dataExchangeUrl, setDataExchangeUrl] = useState();
  const [exchangeUrls, setExchangeUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [exchangeEmail, setExchangeEmail] = useState("");
  const [exchangePassword, setExchangePassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

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
        
        showToast("Kết nối tài khoản thành công", "success");
        localStorage.setItem("linkAccount", result?.data?.d?._id)
        setSelectedLinkAccount(result?.data?.d?._id)
        window.history.replaceState({}, '')
        navigate("/")
      } else {
        showToast(t(result?.data?.m), "error");
      }
    } catch (error) {
      console.log(error)
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
                  {t("Connect your account")}
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
                        height={30}
                        draggable={false}
                        src={
                          constant.API_URL +
                          "/assets/exchange/" +
                          dataExchangeUrl?.clientId +
                          ".png"
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
                  {t("Step 1: Enter your Exchange URL")} {dataExchangeUrl?.name}
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
                      {t("Select your Exchange URL")}
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
                  {t("continue")}
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
                  {t("Connect your account")}
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
                    height={30}
                      draggable={false}
                      src={
                        constant.API_URL +
                        "/assets/exchange/" +
                        dataExchangeUrl?.clientId +
                        ".png"
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
                  {t("Step 2: Input Your Informations")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: 4,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  {t("Enter your exchange account credentials to continue the connection.")}
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
                      {t("Exchange Email")}
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("Exchange Email")}
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
                      {t("Exchange Password")}
                    </InputLabel>
                    <TextField
                      type="password"
                      fullWidth
                      variant="outlined"
                      placeholder={t("Exchange Password")}
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
                  {isSubmitting ? t("Connecting...") : t("Connect Now")}
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
                  {t("back")}
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
