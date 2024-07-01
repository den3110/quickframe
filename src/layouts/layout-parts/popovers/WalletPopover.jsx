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
import TemporaryDrawer from "./TestDrawe";
import DepositDrawer from "../drawers/DepositDrawer";

const WalletPopover = () => {
  const [mode, setMode] = useState(false);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleMode = () => {
    setMode(!mode);
  };

  const [openDrawer, setOpenDrawer]= useState(false)
  const handleOpenDrawer= ()=> {
    setOpenDrawer(true)
  }

  return (
    <Fragment>
      <Box
        display="flex"
        alignItems={"center"}
        mr={1}
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
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
          {mode === false && <Typography fontSize={12}>Ví TK Live</Typography>}
          {mode === true && <Typography fontSize={12}>Ví TK Demo</Typography>}
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
          {mode === false && <DemoWallet />}
          {mode === true && <LiveWallet openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />}
        </DialogContent>
      </Dialog>
      <DepositDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </Fragment>
  );
};

export default WalletPopover;
