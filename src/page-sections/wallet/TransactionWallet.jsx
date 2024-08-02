import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Table,
  TableCell,
  TableHead,
  TextField,
  Typography,
  TableRow,
  TableBody,
  CircularProgress, // Import CircularProgress for the loading indicator
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
import Amount from "components/wallet/Amount";
import moment from "moment";
// import TxId from "components/wallet/Txtd";
// import Memo from "components/wallet/Memo";
import Status from "components/wallet/Status";
import { SettingsContext } from "contexts/settingsContext";

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
  const { t } = useTranslation();
  const classes = useStyles();
  const { selectedLinkAccount } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [dataBalance, setDataBalance] = useState({ d: { c: [] } });
  const [dataBalanceSpot, setDataBalanceSpot] = useState({ d: { c: [] } });
  const [type, setType] = useState("usdt");
  const [dataTradingComission, setDataTradingComission] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [currencies, setCurrencies]= useState([])
  const {walletMode }= useContext(SettingsContext)

  const handleChange = async (e) => {
    try {
      setPage(1);
      setType(e.target.value);
      if (e.target.value === "TRADING_COMMISION") {
        setLoading(true)
        const response = await userApi.userExchangeLinkAccountHistoryComission(
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          setDataTradingComission(response?.data?.d?.c);
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m, "error");
        }
      }
      
    } catch (error) {
      
    }
    finally {
      setLoading(false)
    }
  };

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

  // Sort data with loading state
  useEffect(() => {
    if (mergedData.length > 0) {

      const sortedData = mergedData.sort(
        (a, b) => a.transactionTime - b.transactionTime
      );
      setSortedData(sortedData);
    }
  }, [mergedData]);

  const [sortedData, setSortedData] = useState([]);

  const getIconByType = (type) => {
    switch (type) {
      case "Deposit":
      case "InternalDeposit":
        return <AccountBalanceWallet className={classes.icon} />;
      case "Withdraw":
      case "InternalWithdraw":
        return <ArrowBack className={classes.icon} />;
      case "TRANSFER_IN":
        return <ArrowForward color="error" className={classes.icon} />;
      case "TRANSFER_OUT":
        return <ArrowBack color="success" className={classes.icon} />;
      default:
        return <AccountBalanceWallet className={classes.icon} />;
    }
  };

  useEffect(()=> {
    if(walletMode) {
      setCurrencies([
        { name: "usdt", value: "usdt", iconSrc: "/static/icons/usdt.svg" },
        {
          name: "trading_commission",
          value: "TRADING_COMMISION",
          iconSrc: "/static/icons/win_coms.svg",
        },
      ])
    }
    else {
      setCurrencies([
        { name: "usdt", value: "usdt", iconSrc: "/static/icons/usdt.svg" },
      ])
    }
  }, [walletMode])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response1 =
          await userApi.getUserExchangeLinkAccountTransactionsBalance(
            {
              params: { page, size },
            },
            selectedLinkAccount
          );
        const response2 =
          await userApi.getUserExchangeLinkAccountSpotWalletTransactions(
            {
              params: { page, size },
            },
            selectedLinkAccount
          );
        setDataBalance(response1?.data);
        setDataBalanceSpot(response2?.data);
      } catch (error) {
        showToast(error?.response?.data?.m);
      }
      finally {
        setLoading(false)
      }
    })();
  }, [page, size, selectedLinkAccount]);

  return (
    <>
      <Typography variant="h6">{t("recent_transaction")}</Typography>
      <Box mt={1} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          select
          label={t("type")}
          value={type}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div style={{ display: "flex" }}>
                <img
                  src={option.iconSrc}
                  style={{
                    width: "15px",
                    height: "15px",
                    marginRight: "0.5em",
                    marginTop: "0.2em",
                  }}
                  alt="icon "
                />
                {t(option.name)}
              </div>
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {type === "usdt" && (
        <Box sx={{ width: "100%" }} mt={1}>
          {loading ? ( // Show loading indicator when loading
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              mb={2}
            >
              <CircularProgress />
            </Box>
          ) : sortedData?.length <= 0 ? (
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
          ) : (
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
                        {t(transaction.type)}
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
          )}
        </Box>
      )}
      {type === "TRADING_COMMISION" && (
        <Box sx={{ width: "100%" }} mt={1}>
          {dataTradingComission?.length > 0 && (
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.thead}>
                <TableRow>
                  {/* <TableCell padding="checkbox" /> */}
                  <TableCell>{t("time")}</TableCell>
                  <TableCell>{t("value")}</TableCell>
                  {/* <TableCell>{t("txid/description")}</TableCell> */}
                  {/* <TableCell>{t("memo")}</TableCell> */}
                  <TableCell>{t("status")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTradingComission?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={classes.row}
                    sx={{
                      borderBottom: (theme) =>
                        isDark(theme)
                          ? "1px solid rgb(51, 50, 70)"
                          : "1px solid rgb(239, 241, 245)",
                      height: 57,
                    }}
                  >
                    <TableCell>
                      {moment(item?.ts).format("DD/MM/YYYY hh:mm")}
                    </TableCell>
                    <TableCell>
                      <Amount row={{...item}} />
                    </TableCell>
                    {/* <TableCell>
                            <TxId item={item} />
                          </TableCell> */}
                    {/* <TableCell>
                            <Memo item={item} />
                          </TableCell> */}
                    <TableCell>
                      <Status item={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}
    </>
  );
};

export default TransactionWallet;
