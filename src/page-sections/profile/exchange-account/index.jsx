import {
  Grid,
  Box,
  Stack,
  Card,
  styled,
  Button,
  CardContent,
  Typography,
  Divider,
  CardActions,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { useContext, useEffect, useState } from "react";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
import exchangeApi from "api/exchange/exchangeApi";
import { showToast } from "components/toast/toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import userApi from "api/user/userApi";

const StyledCard = styled(Card)({
  marginBottom: "20px",
});

const DisconnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
}));

const TurnOff2FAButton = styled(Button)({
  backgroundColor: "#333",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#555",
  },
});

const ExchangeAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userLinkAccountListState, setUserLinkAccountListState] = useState([]);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [loading, setLoading] = useState();
  // const { linked } = useContext(ConnectExchangeContext);
  const {
    // userLinkAccountList,
    selectedLinkAccount,
    setSelectedLinkAccount,
    // dataSelectedLinkAccount,
    setDataSelectedLinkAccount,
    userLinkAccountList,
    logoutFromSystem,
    setAccessToken,
  } = useContext(AuthContext);

  const handleDisconnect = async () => {
    try {
      const response = await exchangeApi.userExchangeLinkAccountLogout(
        {},
        selectedLinkAccount
      );
      if (response?.data?.ok === true) {
        showToast("Disconnect exchange account successfully", "success");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("linkAccount");
        setSelectedLinkAccount(undefined);
        setAccessToken(undefined);
        navigate("/connect");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    }
  };

  const handleAddNewLinkedAccount = () => {
    navigate("/connect", { state: { is_add_account: true } });
  };

  const toggleLinkAccount = async (linkAccountId) => {
    try {
      localStorage.setItem("linkAccount", linkAccountId);
      setSelectedLinkAccount(linkAccountId);
      setDataSelectedLinkAccount(
        userLinkAccountList?.find((item) => item?._id === linkAccountId)
      );
      showToast("Chuyển tài khoản thành công", "success");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await userApi.getUserLinkAccountList();
        if (response?.data?.ok === true) {
          setUserLinkAccountListState(
            response?.data?.d?.filter((item) => item?.isLogin === true)
          );
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          logoutFromSystem();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [logoutFromSystem]);

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Stack spacing={3}>
            <Box padding={downLg ? 1 : 2}>
              <Box
                sx={{
                  padding: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  flexDirection: downLg ? "column" : "row",
                }}
              >
                {/* <StyledCard sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    You have successfully connected
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Disconnecting the linked exchange will stop the active
                    investment plan. Are you sure you want to disconnect?
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    width="100%"
                    sx={{
                      position: "relative",
                      background:
                        "linear-gradient(95.4deg, rgba(77, 84, 109, 0.89) 6.95%, rgba(28, 30, 38, 0.89) 100%)",
                    }}
                    color="white"
                    borderRadius="8px"
                    p={2}
                    mb={2}
                    textAlign="center"
                    className="custom-wallet-demo"
                  >
                    <img
                      src={
                        constant.URL_ASSETS_LOGO +
                        "/" +
                        linked?.exchange?.clientId +
                        ".svg"
                      }
                      style={{ height: 46 }}
                      alt="Can't open"
                    />
                    <Typography variant="h6" align="left" mt={1} mb={1}>
                      {linked?.d?.e}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="left"
                      fontSize={12}
                      mb={2}
                    >
                      {t("email_account")}
                    </Typography>
                    <Divider
                      style={{ borderColor: " rgba(255, 255, 255, 0.2)" }}
                    />
                    <Typography variant="h6" align="left" mt={1} mb={1}>
                      
                      {linked?.d?.nn}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="left"
                      fontSize={12}
                      mb={2}
                    >
                      Nickname
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <DisconnectButton onClick={handleDisconnect} variant={"outlined"} fullWidth>Disconnect Now!</DisconnectButton>
                </CardActions>
              </StyledCard> */}

                {/* <StyledCard sx={{ flex: 1 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <ShieldIcon style={{ fontSize: 60, color: "green" }} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h6" component="div">
                        Two-factor authentication on bullnow
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Required for security updates.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <TurnOff2FAButton fullWidth>Turn off 2FA</TurnOff2FAButton>
                </CardActions>
              </StyledCard> */}
              </Box>
              <Box sx={{ width: "100%", flex: 1, overflow: "auto" }}>
                <Grid container spacing={2}>
                  {loading === false && (
                    <>
                      {userLinkAccountListState?.map((item, key) => (
                        <Grid item xs={12} md={12} lg={6} xl={4} key={key} mb={2}>
                          <Box
                            key={key}
                            width="100%"
                            sx={{
                              position: "relative",
                              background:
                                "linear-gradient(95.4deg, rgba(77, 84, 109, 0.89) 6.95%, rgba(28, 30, 38, 0.89) 100%)",
                              overflow: "hidden",
                            }}
                            color="white"
                            borderRadius="8px"
                            p={2}
                            mb={2}
                            textAlign="center"
                            className="custom-wallet-demo"
                          >
                            <img
                              src={
                                constant.URL_ASSETS_LOGO +
                                "/" +
                                item?.clientId +
                                ".svg"
                              }
                              style={{ height: 28 }}
                              alt="Can't open"
                            />
                            <Typography
                              fontSize={14}
                              align="left"
                              mt={1}
                              mb={1}
                            >
                              Email: {item?.email}
                            </Typography>
                            <Divider
                              style={{
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              }}
                            />
                            <Typography
                              fontSize={14}
                              align="left"
                              mt={1}
                              mb={1}
                            >
                              {/* ${spotBalance?.demoBalance?.toFixed(2)} */}
                              Nickname: {item?.nickName}
                            </Typography>
                            {item?._id === selectedLinkAccount && (
                              <Box
                                position={"absolute"}
                                sx={{
                                  background:
                                    "linear-gradient(154.83deg,#03c768 15.98%,#0062ff 85.83%)",
                                  fontSize: 9,
                                  height: 20,
                                  lineHeight: 2,
                                  right: -20,
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  top: 15,
                                  transform: "rotate(45deg)",
                                  width: 90,
                                  borderRadius: "12px",
                                  fontWeight: 600,
                                  minWidth: 70,
                                  overflow: "hidden",
                                  padding: "0 6px",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  color: "white",
                                }}
                              >
                                Active
                              </Box>
                            )}
                            <Box>
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                              >
                                {item?._id === selectedLinkAccount && (
                                  <Button
                                    color="error"
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleDisconnect}
                                  >
                                    Đăng xuất
                                  </Button>
                                )}
                                {item?._id !== selectedLinkAccount && (
                                  <Button
                                    fullWidth
                                    onClick={() => toggleLinkAccount(item?._id)}
                                  >
                                    {t("switch_account")}
                                  </Button>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                {loading === true && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ position: "sticky", top: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button fullWidth onClick={handleAddNewLinkedAccount}>
                      {t("add_linked_account")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ExchangeAccount;
