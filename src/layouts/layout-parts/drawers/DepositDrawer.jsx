import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import userApi from "api/user/userApi";
import { showToast } from "components/toast/toast";
import { isDark } from "util/constants";
import QRCode from "react-qr-code";
import { QrCode } from "@mui/icons-material";
import AuthContext from "contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "350px",
    padding: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrCode: {
    textAlign: "center",
    margin: 10,
  },
  addressBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
    padding: 10,
    borderRadius: "5px",
    marginBottom: 10,
  },
  addressText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 14,
    textAlign: "center",
  },
  copyButton: {
    marginLeft: 10,
    padding: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: 10,
  },
  backButton: {
    marginRight: 10,
    padding: "10px 16px",
  },
}));

export default function DepositDrawer(props) {
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  const { open, setOpen } = props;
  const classes = useStyles();
  const [address, setAddress] = React.useState();
  const {selectedLinkAccount }= React.useContext(AuthContext)
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address?.a);
    showToast("Sao chép thành công", "success")
  };

  const onClose = () => {
    setOpen(false);
    props?.openWalletPopup()
  };

  const handlePostAddress= async ()=> { 
    try {
        const response= await userApi.postUserExchangeLinkAccountAddress({}, selectedLinkAccount)
        if(response?.data?.ok=== true) {
            setAddress(response?.data?.d)
        }
        else {
            showToast(response?.data?.m, "error")
        }
    } catch (error) {
        showToast(error?.response?.data?.m, "error")
    }
  }

  React.useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUserExchangeLinkAccountAddress({}, selectedLinkAccount);
        if (response?.data?.ok === true) {
          setAddress(response?.data?.d);
        }
        else {
            showToast(response?.data?.m, "error");
        }
      } catch (error) {
        showToast(error?.response?.data?.m, "error");
      }
    })();
  }, [selectedLinkAccount]);

  const DrawerList = (
    <Box sx={{ width: downLg ? "100%" : 448 }} role="presentation">
      <Box className={classes.header} sx={{ padding: "24px 16px" }}>
        <Typography variant="h6">Ví giao dịch</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
     <Divider />
      {address?.a === null && (
        <Box
          sx={{ padding: "24px 16px", height: downLg ? "70vh" : "calc(100vh - 89px)" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box></Box>
          <Button onClick={handlePostAddress}>Lấy mã ví</Button>
        </Box>
      )}
      {address?.a !== null && (
        <Box
          sx={{ padding: "24px 16px", height: downLg ? "70vh" : "calc(100vh - 89px)" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        > 
          <Box>
            <Typography variant="h6" align="left" fontWeight={600} gutterBottom>
              Nạp USDT (BEP20)
            </Typography>

            <Box className={classes.qrCode}>
              <QRCode
                alt="QR Code"
                size={200}
                value={address?.a}
              />
            </Box>

            <Box className={classes.addressBox} sx={{backgroundColor: theme=> isDark(theme) ? "#5e666f" : "#f5f5f5",}}>
              <Typography className={classes.addressText}>
                {address?.a}
              </Typography>
            </Box>

            <Typography align="center" color="textSecondary" fontSize={12}>
              Sử dụng địa chỉ này để chuyển USDT (BEP-20) từ ví khác sang ví
              này.
            </Typography>
          </Box>

          <Box className={classes.footer}>
            <Typography variant="body2" mb={1}>
              Số tiền nạp tối thiểu là 5 USDT.
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.backButton}
                onClick={onClose}
                startIcon={<ArrowBackIosNewIcon />}
              >
                Quay lại
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCopyAddress}
                className={classes.copyButton}
              >
                Sao Chép Địa Chỉ Ví
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor={downLg ? "bottom" : "right"} sx={{zIndex: ""}}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
