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
import { isDark } from "utils/constants";
import { SwapHoriz } from "@mui/icons-material";
import SpotBalanceContext from "contexts/SpotBalanceContext";

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
  amountInput: {
    border: "none",
    width: "100%",
    textAlign: "center",
    fontWeight: 800,
    fontSize: 48,
    lineHeight: "120%",
    letterSpacing: -0.5,
    color: "rgb(17, 24, 39)",
    background: "transparent",
    outline: "none",
  },
}));

export default function MoveBalanceDrawer(props) {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { spotBalance, setChange } = React.useContext(SpotBalanceContext);
  const { open, setOpen } = props;
  const classes = useStyles();
  const [balanceMove, setBalanceMove] = React.useState();
  const [mode, setMode] = React.useState(false);

  const onClose = () => {
    setOpen(false);
    props?.openWalletPopup();
  };

  const handleToggleMode = () => {
    setMode((prev) => !prev);
  };

  const handleMoveBalance = async () => {
    try {
      const data = {
        amount: parseFloat(balanceMove),
      };
      if (mode === false) {
        const response = await userApi.postUserExchangeLinkAccountMoveUsdtBo(
          data
        );
        if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
        if(response?.data?.ok === true) {
          showToast("Bạn đã chuyển thành công $" + balanceMove + " đến ví TK Live", "success")
          setChange(prev=> !prev)
          setBalanceMove()
          onClose()
        }
      }         
      if (mode === true) {
        const response = await userApi.postUserExchangeLinkAccountMoveBoUsdt(
          data
        );
        if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
        if(response?.data?.ok === true) {
          showToast("Bạn đã chuyển thành công $" + balanceMove + " đến ví USDT", "success")
          setChange(prev=> !prev)
          setBalanceMove()
          onClose()
        }
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  const DrawerList = (
    <Box sx={{ width: downLg ? "100%" : 448 }} role="presentation">
      <Box className={classes.header} sx={{ padding: "24px 16px" }}>
        <Typography variant="h6">Ví giao dịch</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "24px 16px",
          height: downLg ? "70vh" : "calc(100vh - 89px)",
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box className={classes.content}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {mode === false ? (
              <Box>
                <Typography variant="body1">Từ</Typography>
                <Typography variant="h6">Ví USDT</Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1">Đến</Typography>
                <Typography variant="h6">Ví TK Live</Typography>
              </Box>
            )}
            <IconButton onClick={handleToggleMode} className={classes.swapIcon}>
              <SwapHoriz />
            </IconButton>
            {mode === false ? (
              <Box>
                <Typography variant="body1">Đến</Typography>
                <Typography variant="h6">Ví TK Live</Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1">Từ</Typography>
                <Typography variant="h6">Ví USDT</Typography>
              </Box>
            )}
          </Box>
          <Box mt={5} mb={1}>
            <input
              placeholder="$0"
              type="number"
              className={classes.amountInput}
              inputMode="decimal"
              value={balanceMove}
              onChange={(e) => setBalanceMove(e.target.value)}
            />
          </Box>
          <Typography
            align="center"
            className={classes.balanceText}
            mt={1}
            mb={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (mode === false) {
                setBalanceMove(spotBalance?.usdtAvailableBalance);
              } else {
                setBalanceMove(spotBalance?.availableBalance);
              }
            }}
          >
            Số dư:{" "}
            {mode === false
              ? spotBalance?.usdtAvailableBalance?.toFixed(2)
              : spotBalance?.availableBalance?.toFixed(2)}{" "}
            <Typography color="#6950E8" fontWeight={"600"}>
              TỐI ĐA
            </Typography>
          </Typography>
        </Box>

        <Box className={classes.footer}>
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
              className={classes.copyButton}
              onClick={handleMoveBalance}
              disabled={
                balanceMove?.length < 0 ||
                balanceMove === 0 ||
                !balanceMove ||
                (mode === false &&
                  balanceMove !== 0 &&
                  balanceMove > spotBalance?.usdtAvailableBalance) ||
                (mode === true &&
                  balanceMove !== 0 &&
                  balanceMove > spotBalance?.availableBalance)
              }
            >
              {(mode === false &&
                balanceMove !== 0 &&
                balanceMove > spotBalance?.usdtAvailableBalance) ||
              (mode === true &&
                balanceMove !== 0 &&
                balanceMove > spotBalance?.availableBalance)
                ? "Số dư không đủ"
                : "Chuyển ngay"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        anchor={downLg ? "bottom" : "right"}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
