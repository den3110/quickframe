import { Fragment, useContext, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
// CUSTOM COMPONENTS
// CUSTOM ICON COMPONENT
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
import AuthContext from "contexts/AuthContext";
import LoopIcon from '@mui/icons-material/Loop';
import DemoWallet from "page-sections/wallet/DemoWallet";
import LiveWallet from "page-sections/wallet/LiveWallet";

const WalletPopover = () => {
  const [mode, setMode]= useState(false)
  const { linked } = useContext(ConnectExchangeContext);
  const { user } = useContext(AuthContext);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleMode= ()=> {
    setMode(!mode)
  }

  return (
    <Fragment>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge color="error" badgeContent={0}>
          <WalletIcon
            sx={{
              color: "grey.400",
              fontSize: 18,
            }}
          />
        </Badge>
      </IconButton>

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
        <Typography onClick={handleToggleMode} align="center" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} fontSize={14} style={{cursor: "pointer"}} mb={1} mt={1}>Chuyển sang chế độ {mode=== false ? "DEMO" : "LIVE"} <LoopIcon fontSize={"18px"} /></Typography>
        <DialogContent>
          {mode=== false && <DemoWallet />}
          {mode=== true && <LiveWallet />}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default WalletPopover;
