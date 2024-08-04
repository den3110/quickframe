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
import { useTranslation } from "react-i18next";
import moment from "moment";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from '@mui/icons-material/Note';

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
  const { t } = useTranslation();
  const onClose = () => {
    setOpen(false);
    props?.openWalletPopup();
  };

  const DrawerList = (
    <Box sx={{ width: downLg ? "100%" : 448 }} role="presentation">
      <Box className={classes.header} sx={{ padding: "24px 16px" }}>
        <Typography variant="h6">{t("transaction_wallet")}</Typography>
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
              <Typography fontSize={12}>
                {t(props?.dataDetailTransaction?.type)}
              </Typography>
              <Typography>
                {moment(props?.dataDetailTransaction?.ts).format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            align="left"
            fontWeight={600}
            gutterBottom
            mb={3}
          >
            {props?.dataDetailTransaction?.amount} USDT
          </Typography>
          <Divider />
          <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
            <LoopIcon />
            <Box>
              <Typography fontSize={12}>{t("status")}</Typography>
              <Typography>{t(props?.dataDetailTransaction?.status)}</Typography>
            </Box>
          </Box>
          <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
            <TollIcon />
            <Box>
              <Typography fontSize={12}>{t("amount")}</Typography>
              <Typography>
                {props?.dataDetailTransaction?.amount} USDT
              </Typography>
            </Box>
          </Box>
          {props?.dataDetailTransaction?.txid && (
            <TxId row={props?.dataDetailTransaction} />
          )}
          {props?.dataDetailTransaction?.memo &&
            <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
              <NoteIcon />
              <Box>
                <Typography fontSize={12}>{t("memo")}</Typography>
                <Typography>
                  {props?.dataDetailTransaction?.memo}
                </Typography>
              </Box>
            </Box>
          }
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
              {t("Back to wallet")}
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
        sx={{ zIndex: "" }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

const TxId = ({ row }) => {
  // thêm 1 dòng là TxId/Mô tả oke a
  const { t } = useTranslation();
  try {
    const openInNewTab = (url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    if (row.type === "InternalWithdraw") {
      const obj = JSON.parse(row.txid);
      // nos laf cai doan Txid , e thêm dòng là Txid
      return (
        <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <DescriptionIcon />
          </Box>
          <Box>
            <Typography fontSize={12}>{t("Recipient nickname")}</Typography>
            <Box display="flex" alignItems={"center"} gap={1}>
              <Typography sx={{ color: "warning.main" }}>
                {" "}
                {obj?.ReceiverNickName}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }

    if (row.type === "InternalDeposit") {
      const obj = JSON.parse(row.txid);
      // nos laf cai doan Txid , e thêm dòng là Txid
      return (
        <Box mt={2} mb={4} display={"flex"} alignItems={"center"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <DescriptionIcon />
          </Box>
          <Box>
            <Typography fontSize={12}>{t("Sender nickname")}</Typography>
            <Box display="flex" alignItems={"center"} gap={1}>
              <Typography sx={{ color: "warning.main" }}>
                {" "}
                {obj?.SenderNickName}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }

    if (row.txid === "") return <></>;
    const data = JSON.parse(row.txid);

    if (!data.TransactionId) return <></>;
    return (
      <Typography
        sx={{ color: "primary.main", cursor: "pointer" }}
        onClick={() =>
          data.TransactionId.indexOf("0x") > -1 &&
          openInNewTab(`https://bscscan.com/tx/${data.TransactionId}`)
        }
      >
        {data.TransactionId.indexOf("0x") > -1
          ? `${data.TransactionId.substring(0, 8)}...`
          : data.TransactionId}
      </Typography>
    );
  } catch (e) {
    return <></>;
  }
};
