import {
  Box,
  Button,
  CircularProgress,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "contexts/AuthContext";
import { constant } from "constant/constant";
import { useNavigate } from "react-router-dom";
import exchangeApi from "api/exchange/exchangeApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import userApi from "api/user/userApi";

const UserLinkAccountListDrawer = ({ open, handleClose }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [loading, setLoading] = useState();
  const { ref, inView } = useInView({ threshold: 0 });
  const { t } = useTranslation();
  const {
    selectedLinkAccount,
  setSelectedLinkAccount,
    setDataSelectedLinkAccount,
    logoutFromSystem,
  } = useContext(AuthContext);
  const [userLinkAccountListState, setUserLinkAccountListState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddNewLinkedAccount = () => {
    navigate("/connect", { state: { is_add_account: true } });
  };

  const handleDisconnect = async () => {
    try {
      const response = await exchangeApi.userExchangeLinkAccountLogout(
        {},
        selectedLinkAccount
      );
      if (response?.data?.ok === true) {
        localStorage.removeItem("linkAccount");
        setSelectedLinkAccount(undefined);
        showToast("Disconnect exchange account successfully", "success");
        navigate("/connect");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    }
  };

  const toggleLinkAccount = async (linkAccountId) => {
    try {
      localStorage.setItem("linkAccount", linkAccountId);
      setSelectedLinkAccount(linkAccountId);
      setDataSelectedLinkAccount(
        userLinkAccountListState?.find((item) => item?._id === linkAccountId && item?.isLogin === true)
      );
      showToast("Chuyển tài khoản thành công", "success");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inView) {
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
    }
  }, [inView, logoutFromSystem]);

  const filteredUserLinkAccounts = userLinkAccountListState.filter(
    (item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nickName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {t("linked_account")}
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
        ref={ref}
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
        <Box sx={{ width: "100%", mb: 2 }}>
          <TextField
            fullWidth
            label={t("Search")}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Box sx={{ width: "100%", flex: 1, overflow: "auto" }}>
          {loading === false && (
            <>
              {filteredUserLinkAccounts.map((item, key) => (
                <Box key={key} mb={2}>
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
                        constant.URL_ASSETS_LOGO + "/" + item?.clientId + ".svg"
                      }
                      style={{ height: 28 }}
                      alt="Can't open"
                    />
                    <Typography fontSize={14} align="left" mt={1} mb={1}>
                      Email: {item?.email}
                    </Typography>
                    <Divider
                      style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
                    />
                    <Typography fontSize={14} align="left" mt={1} mb={1}>
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
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        {item?._id === selectedLinkAccount && (
                          <Button
                            color="error"
                            variant="outlined"
                            fullWidth
                            onClick={handleDisconnect}
                          >
                            {t("logout")}
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
                </Box>
              ))}
            </>
          )}
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
              <Button variant={"outlined"} onClick={handleClose}>
                Đóng
              </Button>
              <Button fullWidth onClick={handleAddNewLinkedAccount}>
                {t("add_linked_account")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserLinkAccountListDrawer;
