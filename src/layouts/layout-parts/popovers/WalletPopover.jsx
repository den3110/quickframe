import { Fragment, useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Typography,
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

const WalletPopover = () => {
  const [mode, setMode] = useState(false);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen= ()=> {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleMode = () => {
    setMode(!mode);
    localStorage.setItem("walletMode", JSON.stringify(!mode));
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMoveBalanceDrawer, setOpenMoveBalanceDrawer] = useState(false);
  const [openDetailTransactionDrawer, setOpenDetailTransactionDrawer] =
    useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleOpenMoveBalanceDrawer = () => {
    setOpenMoveBalanceDrawer(true);
  };
  const handleDetailTransactionDrawer = () => {
    setOpenDetailTransactionDrawer(true);
    setOpen(false)
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("walletMode"))) {
      setMode(JSON.parse(localStorage.getItem("walletMode")));
    } else {
      setMode(false);
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
        <Box>
          <Typography>$0.00</Typography>
          {mode === true && <Typography fontSize={12}>Ví TK Live</Typography>}
          {mode === false && <Typography fontSize={12}>Ví TK Demo</Typography>}
        </Box>
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Ví giao dịch
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
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
          Chuyển sang chế độ {mode === true ? "DEMO" : "LIVE"}{" "}
          <LoopIcon fontSize={"18px"} />
        </Typography>
        <DialogContent>
          {mode === false && (
            <DemoWallet
              handleOpenDetailTransaction={handleDetailTransactionDrawer}
            />
          )}
          {mode === true && (
            <LiveWallet
              openDrawer={openDrawer}
              handleClosePopover={handleClose}
              handleOpenDrawer={handleOpenDrawer}
              openMoveDrawer={openMoveBalanceDrawer}
              handleOpenMoveBalanceDrawer={handleOpenMoveBalanceDrawer}
              handleOpenDetailTransaction={handleDetailTransactionDrawer}
            />
          )}
        </DialogContent>
      </Dialog>
      <DepositDrawer open={openDrawer} setOpen={setOpenDrawer} openWalletPopup={handleOpen} />
      <MoveBalanceDrawer
        open={openMoveBalanceDrawer}
        setOpen={setOpenMoveBalanceDrawer}
        openWalletPopup={handleOpen}
      />
      <DetailTransactionDrawer
        open={openDetailTransactionDrawer}
        setOpen={setOpenDetailTransactionDrawer}
        openWalletPopup={handleOpen}
      />
    </Fragment>
  );
};

export default WalletPopover;
