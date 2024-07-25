import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import userApi from "api/user/userApi";
import NoTransactionIcon from "icons/wallet/NoTransaction";
import { isDark } from "util/constants";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#00bcd4",
  },
  amount: {
    fontWeight: "bold",
  },
  date: {
    color: "#999",
    marginLeft: "auto",
  },
}));

const TransactionWallet = (props) => {
  const {t }= useTranslation()
  const classes = useStyles();
  const {selectedLinkAccount }= useContext(AuthContext)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [dataBalance, setDataBalance] = useState({ d: { c: [] } });
  const [dataBalanceSpot, setDataBalanceSpot] = useState({ d: { c: [] } });
  const handleOpenTransaction = () => {
    props?.handleOpenDetailTransaction();
  };

  const normalizeDataBalance = dataBalance?.d?.c?.map((item) => ({
    ts: item.ts,
    type: item.type,
    amount: item.amount,
    status: item.status,
    network: item.network,
    txid: item.txid,
    memo: item.memo || "",
  }));

  const normalizeDataBalanceSpot = dataBalanceSpot?.d?.c?.map((item) => ({
    ts: item.transactionTime,
    type: item.type,
    amount: item.amount,
    status: item.status,
    network: "",
    txid: "",
    memo: "",
  }));

  const mergedData = [...normalizeDataBalance, ...normalizeDataBalanceSpot];
  const sortedData = mergedData.sort((a, b) => a.amount - b.amount);

  const getIconByType = (type) => {
    switch (type) {
      case "Deposit":
      case "InternalDeposit":
        return <AccountBalanceWallet className={classes.icon} />;
      case "Withdraw":
      case "InternalWithdraw":
        return <ArrowBack className={classes.icon} />;
      case "TRANSFER_IN":
        return <ArrowForward className={classes.icon} />;
      case "TRANSFER_OUT":
        return <ArrowBack className={classes.icon} />;
      default:
        return <AccountBalanceWallet className={classes.icon} />;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response1 =
          await userApi.getUserExchangeLinkAccountTransactionsBalance({
            params: { page, size },
          }, selectedLinkAccount);
        const response2 =
          await userApi.getUserExchangeLinkAccountSpotWalletTransactions({
            params: { page, size },
          }, selectedLinkAccount);
        setDataBalance(response1?.data);
        setDataBalanceSpot(response2?.data);
      } catch (error) {
        showToast(error?.response?.data?.m);
      }
    })();
  }, [page, size, selectedLinkAccount]);

  return (
    <>
      <Typography variant="h6">{t("recent_transaction")}</Typography>
      {sortedData?.length <= 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={2}
          mb={2}
          color="grey.500"
        >
          <NoTransactionIcon />
          <Typography>{t("no_transaction")}</Typography>
        </Box>
      )}
      {sortedData?.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <List>
            {sortedData?.slice(0, 7)?.map((transaction, index) => (
              <ListItem
                onClick={handleOpenTransaction}
                key={index}
                className={classes.listItem}
                sx={{
                  borderBottom: (theme) =>
                    isDark(theme)
                      ? "1px solid rgb(51, 50, 70)"
                      : "1px solid rgb(239, 241, 245)",
                  padding: "10px 6px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>{getIconByType(transaction.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.amount}
                      >
                        ${transaction.amount.toFixed(2)}
                      </Typography>
                      {" - "}
                      {transaction.type}
                    </React.Fragment>
                  }
                />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.date}
                >
                  {new Date(transaction.ts).toLocaleString()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default TransactionWallet;
