import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LoopIcon from "@mui/icons-material/Loop";
import TollIcon from "@mui/icons-material/Toll";
import TransactionIcon from "icons/wallet/Transaction";
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

export default function DetailTransactionDrawer(props) {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { open, setOpen } = props;
  const classes = useStyles();

  const onClose = () => {
    setOpen(false);
    props?.openWalletPopup();
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
        <Box>
          <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
            <TransactionIcon />
            <Box>
              <Typography fontSize={12}>TRANSFER_OUT USDT (Bep20)</Typography>
              <Typography>02/07/2024, 02:28:10</Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            align="left"
            fontWeight={600}
            gutterBottom
            mb={3}
          >
            0.1 USDT
          </Typography>
          <Divider />
          <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
            <LoopIcon />
            <Box>
              <Typography fontSize={12}>Trạng thái</Typography>
              <Typography>Thành công</Typography>
            </Box>
          </Box>
          <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
            <TollIcon />
            <Box>
              <Typography fontSize={12}>Số lượng</Typography>
              <Typography>0.1 USDT</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.footer}>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.backButton}
              onClick={onClose}
              startIcon={<ArrowBackIosNewIcon />}
            >
              Quay lại ví
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
