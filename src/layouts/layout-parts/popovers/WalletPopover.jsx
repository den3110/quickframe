import { Fragment, useContext, useEffect, useRef, useState } from "react";
import {
  // Avatar,
  Badge,
  Box,
  // Button,
  // Dialog,
  // DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
// CUSTOM COMPONENTS
// CUSTOM ICON COMPONENT
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import LoopIcon from "@mui/icons-material/Loop";
import DemoWallet from "page-sections/wallet/DemoWallet";
import LiveWallet from "page-sections/wallet/LiveWallet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DepositDrawer from "../drawers/DepositDrawer";
import MoveBalanceDrawer from "../drawers/MoveBalanceDrawer";
import DetailTransactionDrawer from "../drawers/DetailTransactionDrawer";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import WithdrawDrawer from "../drawers/WithdrawDrawer";
import { SettingsContext } from "contexts/settingsContext";
import { useTranslation } from "react-i18next";
import AuthContext from "contexts/AuthContext";

const WalletPopover = () => {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { spotBalance, setChange } = useContext(SpotBalanceContext);
  const {walletMode, setWalletMode }= useContext(SettingsContext)
  const [mode, setMode] = useState(walletMode);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [dataDetailTransaction, setDataDetailTransaction]= useState()
  const {loading }= useContext(AuthContext)

  const handleOpen = () => {
    setChange(prev=> !prev)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleMode = () => {
    setMode(!mode);
    setWalletMode(!mode)
    localStorage.setItem("walletMode", JSON.stringify(!mode));
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMoveBalanceDrawer, setOpenMoveBalanceDrawer] = useState(false);
  const [openDetailTransactionDrawer, setOpenDetailTransactionDrawer] =
    useState(false);
  const [openWithdrawDrawer, setOpenWithdrawDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleOpenMoveBalanceDrawer = () => {
    setOpenMoveBalanceDrawer(true);
  };
  const handleOpenDetailTransactionDrawer = () => {
    setOpenDetailTransactionDrawer(true);
    setOpen(false);
  };
  const handleOpenWithdrawDrawer = () => {
    setOpenWithdrawDrawer(true);
    setOpen(false);
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("walletMode"))) {
      setMode(JSON.parse(localStorage.getItem("walletMode")));
      setWalletMode(JSON.parse(localStorage.getItem("walletMode")))
    } else {
      setMode(false);
      setWalletMode(false)
    }
  }, []);

  return (
    <Fragment>
      <Box
        display="flex"
        alignItems={"center"}
        mr={1}
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        <IconButton ref={anchorRef}>
          <Badge color="error" badgeContent={0}>
            <WalletIcon
              sx={{
                color: "grey.400",
                fontSize: 24,
              }}
            />
          </Badge>
        </IconButton>
        {
          loading && <Skeleton variant={"rouned"} height={24}></Skeleton>
        }
        {loading=== false && 
          <Box>
            <Typography fontSize={downLg ? 14  : 16}>
              $
              {mode === true
                ? spotBalance?.availableBalance?.toFixed(2)
                : spotBalance?.demoBalance?.toFixed(2)}
            </Typography>
            {mode === true && <Typography fontSize={12}>{t("Live Wallet")}</Typography>}
            {mode === false && <Typography fontSize={12}>{t("Demo Wallet")}</Typography>}
          </Box>
        }
        <IconButton>
          <Badge color="error" badgeContent={0}>
            <KeyboardArrowDownIcon
              sx={{
                color: "grey.400",
                fontSize: 24,
              }}
            />
          </Badge>
        </IconButton>
      </Box>

      <Drawer
        anchor={downLg ? "bottom" : "right"}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{zIndex: ""}}
      >
        <DialogTitle>
          {t("transaction_wallet")}
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
          }}
        >
          <Typography
            onClick={handleToggleMode}
            align="center"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            fontSize={14}
            style={{ cursor: "pointer" }}
            mb={1}
            mt={1}
          >
            {t("switch_mode")} {mode === true ? "DEMO" : "LIVE"}{" "}
            <LoopIcon fontSize={"18px"} />
          </Typography>
          {mode === false && (
            <DemoWallet
              handleOpenDetailTransaction={handleOpenDetailTransactionDrawer}
              dataDetailTransaction={dataDetailTransaction}
              setDataDetailTransaction={setDataDetailTransaction}
            />
          )}
          {mode === true && (
            <LiveWallet
              handleClosePopover={handleClose}
              handleOpenDrawer={handleOpenDrawer}
              openDrawer={openDrawer}
              openMoveDrawer={openMoveBalanceDrawer}
              openWithdrawDrawer={openWithdrawDrawer}
              handleOpenWithdrawDrawer={handleOpenWithdrawDrawer}
              handleOpenMoveBalanceDrawer={handleOpenMoveBalanceDrawer}
              handleOpenDetailTransaction={handleOpenDetailTransactionDrawer}
              dataDetailTransaction={dataDetailTransaction}
              setDataDetailTransaction={setDataDetailTransaction}
            />
          )}
        </Box>
      </Drawer>
      <DepositDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        openWalletPopup={handleOpen}
      />
      <WithdrawDrawer
        open={openWithdrawDrawer}
        setOpen={setOpenWithdrawDrawer}
        openWalletPopup={handleOpen}
      />
      <MoveBalanceDrawer
        open={openMoveBalanceDrawer}
        setOpen={setOpenMoveBalanceDrawer}
        openWalletPopup={handleOpen}
      />
      <DetailTransactionDrawer
        dataDetailTransaction={dataDetailTransaction}
        setDataDetailTransaction={setDataDetailTransaction}
        open={openDetailTransactionDrawer}
        setOpen={setOpenDetailTransactionDrawer}
        openWalletPopup={handleOpen}
      />
    </Fragment>
  );
};

export default WalletPopover;
