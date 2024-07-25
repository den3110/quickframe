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
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { useContext } from "react";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
import exchangeApi from "api/exchange/exchangeApi";
import { showToast } from "components/toast/toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)({
  marginBottom: "20px",
});

const DisconnectButton = styled(Button)(({theme})=> ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main
}));


const TurnOff2FAButton = styled(Button)({
  backgroundColor: "#333",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#555",
  },
});

const ExchangeAccount = () => {
  const {t }= useTranslation()
  const navigate= useNavigate()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { linked } = useContext(ConnectExchangeContext);
  const {selectedLinkAccount }= useContext(AuthContext)

  const handleDisconnect= async ()=> {
    try {
      const response= await exchangeApi.userExchangeLinkAccountLogout({}, selectedLinkAccount)
      if(response?.data?.ok=== true) {
        showToast("Disconnect exchange account successfully", "success")
        localStorage.removeItem("linkAccount")
        navigate("/connect")
      }
      else if(response?.data?.ok=== false) {
        showToast(response?.data?.m, "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error")
    }
  }

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Stack spacing={3}>
            <Box
              sx={{
                padding: 3,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexDirection: downLg ? "column" : "row"
              }}
            >
              <StyledCard sx={{ flex: 1 }}>
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
                      {/* ${spotBalance?.demoBalance?.toFixed(2)} */}
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
              </StyledCard>

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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ExchangeAccount;
