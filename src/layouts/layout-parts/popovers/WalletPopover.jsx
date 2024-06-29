import { Fragment, useContext, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
// CUSTOM COMPONENTS
import PopoverLayout from "./PopoverLayout";
import { FlexBox } from "components/flexbox";
import { Paragraph, Small } from "components/typography";
// CUSTOM ICON COMPONENT
import Apps from "icons/duotone/Apps";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
import AuthContext from "contexts/AuthContext";
// DUMMY DATA SET
const SERVICES = [
  {
    id: 1,
    title: "Slack",
    body: "Email collaboration software",
    image: "/static/connect-accounts/slack.svg",
  },
  {
    id: 2,
    title: "Github",
    body: "Email collaboration software",
    image: "/static/connect-accounts/github.svg",
  },
  {
    id: 3,
    title: "Stack Overflow",
    body: "Email collaboration software",
    image: "/static/connect-accounts/stack-overflow.svg",
  },
];

const WalletPopover = () => {
  const { linked } = useContext(ConnectExchangeContext);
  const { user } = useContext(AuthContext);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

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
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              width="100%"
              sx={{
                position: "relative",
                background:
                  "linear-gradient(112.77deg, rgb(32, 0, 65) 14.65%, rgb(140, 98, 255) 87.93%)",
                "&::before": {
                  position: "absolute",
                  right: 16,
                  bottom: 0,
                  fontSize: 40,
                  fontWeight: 900,
                  color: "rgb(250, 250, 250)",
                  opacity: 0.1,
                  content: '"DEMO"',
                  zIndex: 999,
                },
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
                {user?.email}
              </Typography>
              <Typography variant="body1" align="left" fontSize={12} mb={2}>
                Tài khoản email
              </Typography>
              <Divider style={{ borderColor: " rgba(255, 255, 255, 0.2)" }} />
              <Typography variant="h6" align="left" mt={1} mb={1}>
                $0.00
              </Typography>
              <Typography variant="body1" align="left" fontSize={12} mb={2}>
                Ví USDT
              </Typography>
              <Typography variant="h6" align="left" mt={1} mb={1}>
                $0.00
              </Typography>
              <Typography variant="body1" align="left" fontSize={12} mb={2}>
                Ví Live
              </Typography>
            </Box>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              Nạp lại số dư
            </Button>
            <Typography variant="h6">Giao dịch gần đây</Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
              color="grey.500"
            >
              <Avatar
                src="/static/connect-accounts/slack.svg"
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography>Không có giao dịch nào tại đây!</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default WalletPopover;
