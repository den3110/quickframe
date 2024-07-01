import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowForward, ArrowBack, AccountBalanceWallet } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import userApi from "api/user/userApi";
import NoTransactionIcon from "icons/wallet/NoTransaction";
import { isDark } from "utils/constants";

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

const dataBalance = {
  ok: true,
  d: {
    t: 5,
    p: 1,
    s: 10,
    c: [
      {
        ts: 1719814053787,
        type: "Deposit",
        amount: 10.0362,
        txid: '{"TransactionId": "0x02acc34f3271ae67a215206e55706d01e277b8e18fba115ac1937171a5baf436"}',
        network: "bsc",
        status: "Succeed",
      },
      {
        ts: 1719804036643,
        type: "Withdraw",
        amount: 10.36,
        txid: '{"TransactionId": "0xacfa758a5f84dd917954e3bc9f6c3a73b2b8c867530cc8a433a084998165bfee","Memo":""}',
        network: "bsc",
        memo: "",
        status: "Succeed",
      },
      {
        ts: 1719803990123,
        type: "InternalDeposit",
        amount: 11.36,
        txid: '{"TransactionId": "Natsu1","Memo":""}',
        network: "eth",
        memo: "",
        status: "Succeed",
      },
      {
        ts: 1719803946283,
        type: "InternalWithdraw",
        amount: 11.36,
        txid: '{"ReceiverNickName": "natsu1","Memo":""}',
        network: "eth",
        memo: "",
        status: "Succeed",
      },
      {
        ts: 1719803861443,
        type: "Deposit",
        amount: 11.3603,
        txid: '{"TransactionId": "0x6891f17992bdb85b581b0da137f96bb815e17d4c55fef9adffe8749c95dd518f"}',
        network: "bsc",
        status: "Succeed",
      },
    ],
  },
};

const dataBalanceSpot = {
  ok: true,
  d: {
    t: 2,
    p: 1,
    s: 10,
    c: [
      {
        betAmount: 0,
        amount: 5,
        type: "TRANSFER_OUT",
        desc: "TRANSFER_OUT",
        status: "Accept",
        transactionTime: 1719814085077,
        totalCount: 2,
      },
      {
        betAmount: 0,
        amount: 5,
        type: "TRANSFER_IN",
        desc: "TRANSFER_IN",
        status: "Accept",
        transactionTime: 1719814079450,
        totalCount: 2,
      },
    ],
  },
};

const TransactionWallet = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [transactionWallet, setTransactionWallet] = useState();

  const handleOpenTransaction= ()=> {
    props?.handleOpenDetailTransaction()
  }
  
  const normalizeDataBalance = dataBalance.d.c.map((item) => ({
    ts: item.ts,
    type: item.type,
    amount: item.amount,
    status: item.status,
    network: item.network,
    txid: item.txid,
    memo: item.memo || "",
  }));

  const normalizeDataBalanceSpot = dataBalanceSpot.d.c.map((item) => ({
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
        const response1 = await userApi.getUserExchangeLinkAccountTransactionsBalance({
          params: { page, size },
        });
        const response2 = await userApi.getUserExchangeLinkAccountSpotWalletTransactions({
          params: { page, size },
        });
        console.log(response1?.data);
        console.log(response2);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page, size]);

  return (
    <>
      <Typography variant="h6">Giao dịch gần đây</Typography>
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
          <Typography>Không có giao dịch nào tại đây!</Typography>
        </Box>
      )}
      {sortedData?.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <List>
            {sortedData.map((transaction, index) => (
              <ListItem onClick={handleOpenTransaction} key={index} className={classes.listItem} sx={{borderBottom: theme=> isDark(theme) ? "1px solid rgb(51, 50, 70)" : "1px solid rgb(239, 241, 245)", padding: '10px 6px', cursor: "pointer"}}>
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
