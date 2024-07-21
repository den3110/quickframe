import {
  Box,
  Button,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "contexts/AuthContext";
import { constant } from "constant/constant";
import { useNavigate } from "react-router-dom";
import exchangeApi from "api/exchange/exchangeApi";
import { showToast } from "components/toast/toast";

const UserLinkAccountListDrawer = ({ open, handleClose }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { userLinkAccountList, selectedLinkAccount,setSelectedLinkAccount , dataSelectedLinkAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddNewLinkedAccount = () => {
    navigate("/connect", { state: {is_add_account: true} });
  };

  const handleDisconnect= async ()=> {
    try {
      const response= await exchangeApi.userExchangeLinkAccountLogout({}, selectedLinkAccount)
      if(response?.data?.ok=== true) {
        setSelectedLinkAccount(undefined)
        localStorage.removeItem("linkAccount")
        showToast("Disconnect exchange account successfully", "success")
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
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: "" }}
    >
      <DialogTitle>
        Tài khoản liên kết
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Box
        sx={{
          width: downLg ? "100%" : 448,
          padding: "24px 16px",
          height: downLg ? "70vh" : "calc(100vh - 89px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", flex: 1, overflow: "auto" }}>
          {userLinkAccountList?.map((item, key) => (
            <Box
              key={key}
              width="100%"
              sx={{
                position: "relative",
                background:
                  "linear-gradient(95.4deg, rgba(77, 84, 109, 0.89) 6.95%, rgba(28, 30, 38, 0.89) 100%)",
                  overflow: "hidden"
              }}
              color="white"
              borderRadius="8px"
              p={2}
              mb={2}
              textAlign="center"
              className="custom-wallet-demo"
            >
              <img
                src={constant.URL_ASSETS_LOGO + "/" + item?.clientId + ".svg"}
                style={{ height: 28 }}
                alt="Can't open"
              />
              <Typography fontSize={14} align="left" mt={1} mb={1}>
                Tài khoản email: {item?.email}
              </Typography>
              <Divider style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
              <Typography fontSize={14} align="left" mt={1} mb={1}>
                {/* ${spotBalance?.demoBalance?.toFixed(2)} */}
                Nickname: {item?.nickName}
              </Typography>
              {
                item?._id === dataSelectedLinkAccount?._id && 
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
              }
            </Box>
          ))}
        </Box>
        <Box>
          <Box sx={{ position: "sticky", top: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button onClick={handleAddNewLinkedAccount}>
                Thêm tài khoản liên kết
              </Button>
              <Button onClick={handleDisconnect}>Disconnect current account</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserLinkAccountListDrawer;
