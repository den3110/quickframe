import {
  Stack,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  Pagination,
//   FormControl,
//   Select,
//   MenuItem,
//   Badge,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import { makeStyles, styled } from "@mui/styles";
import { useTranslation } from "react-i18next";
import jackpotApi from "api/jackpot/jackpotApi";
import AuthContext from "contexts/AuthContext";
// import { constant } from "constant/constant";
import { useInView } from "react-intersection-observer";
import JackpotIcon from "icons/duotone/JackpotIcon";
// import { isDark } from "util/constants";
import { showToast } from "components/toast/toast";
import Claim2FA from "../dialog/Claim2Fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  "&.MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "transparent",
    },
    cursor: "pointer",
  },
  thead: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

function JackpotPopover(props) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const { selectedLinkAccount, userLinkAccountList } = useContext(AuthContext);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  //   const [totalPage, setTotalPage]= useState()
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openClaim, setOpenClaim] = useState(false);
  const [requestCode, setRequestCode] = useState("");
  const [change, setChange] = useState(false);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { t } = useTranslation();

  const renderColor= (color)=> {
    switch (color) {
        case "APPROVED":
            return "primary"
        case "REJECTED":
            return "error"
    case "PENDING":
            return "warning"
        default:
            break;
    }
  }

  const getHistoryWinning = useCallback(async () => {
    try {
      const payload = {
        params: {
          _id: selectedLinkAccount,
          page,
        },
      };
      const response = await jackpotApi.getUserJackpotWinningHistory(
        selectedLinkAccount,
        payload
      );
      if (response.data.ok) {
        setData(response.data.d.c);
        setTotalPage(response?.data?.d?.t);
        // const current = { page: 0 };
        // current.page = Math.round(response.data.t / 10);
        // if (parseFloat(response.data.t / 10) > current.page) {
        //   current.page += 1;
        // }
        // setTotalPage(current.page);
      }
    } catch (e) {
      console.log(e);
    }
  }, [selectedLinkAccount, page]);

  const handleClaimWinning = async () => {
    try {
      const response = await jackpotApi.getCodeClaim2FA(
        selectedLinkAccount,
        {}
      );
      const rc = response.data;
      if (rc.ok) {
        setRequestCode(rc.d.data);
        setOpenClaim(true);
      } else {
        showToast(rc.d.m);
      }
    } catch (error) {
      showToast(error?.response?.data?.m);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (inView) {
      getHistoryWinning();
    }
  }, [page, inView, change]);

  useEffect(() => {
    getHistoryWinning();
  }, [selectedLinkAccount]);

  const handleOpenDialog = (row) => {
    // Subtract one day from createdAt before showing the dialog
    if (row?.status !== "PENDING") {
      const updatedRow = { ...row };
      const date = new Date(updatedRow.time);
      date.setDate(date.getDate());
      updatedRow.createdAt = date.toISOString();
      setDialogData(updatedRow);
    //   setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogData(null);
  };

  const classes = useStyles();

  return (
    <>
      <Tooltip title={t("jackpot")}>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <JackpotIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            margin: 0,
            width: downLg && "94%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{t("jackpot")}</DialogTitle>
        <DialogContent >
          <Box ref={ref}>
            <Card>
              <CardContent>
                <Claim2FA
                  setChange={setChange}
                  open={openClaim}
                  setOpen={setOpenClaim}
                  linkAccountId={selectedLinkAccount}
                  requestCode={requestCode}
                  getHistoryWinning={getHistoryWinning}
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} className={classes.root}>
                    <Table className={classes.table} aria-label="simple table">
                      {!downLg && (
                        <TableHead
                          className={classes.thead}
                          sx={{
                            borderBottom: (theme) =>
                              `solid 1px ${theme.palette.divider}`,
                          }}
                        >
                          <TableRow>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                              style={{
                                color:
                                  theme.palette.mode === "light" && "black",
                              }}
                            >
                              {t("time")}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                              style={{
                                color:
                                  theme.palette.mode === "light" && "black",
                              }}
                            >
                              {t("Streak")}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                              style={{
                                color:
                                  theme.palette.mode === "light" && "black",
                              }}
                            >
                              {t("prize")}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                              style={{
                                color:
                                  theme.palette.mode === "light" && "black",
                              }}
                            >
                              {t("status")}
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                      )}
                      <TableBody>
                        {data?.map((row, index) => (
                          <TableRow
                            hover
                            sx={{
                              borderBottom: (theme) =>
                                index !== data.length - 1 &&
                                `solid 1px ${theme.palette.divider}`,
                              display: downLg ? "flex" : "",
                              flexWrap: "wrap",
                            }}
                            key={row._id}
                            onClick={() => handleOpenDialog(row)}
                          >
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                            >
                              <Typography fontSize={14} fontWeight={600}>
                                {format(new Date(row.time), "HH:mm dd/MM")}
                              </Typography>
                              {downLg && 
                              <Typography fontSize={14} mt={2}>
                                {t("time")}
                              </Typography>
                              }
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    row.type === "WIN"
                                      ? "success.main"
                                      : "error.main",
                                }}
                              >
                                {row.streakname}
                              </Typography>
                              {downLg && 
                              <Typography fontSize={14} mt={2}>
                                Streak
                              </Typography>
                              }
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                            >
                              <Typography sx={{ color: "info.main" }}>
                                {parseFloat(row.prize.toFixed(2))} $
                              </Typography>
                              {downLg && 
                              <Typography fontSize={14} mt={2}>
                                Phần thưởng
                              </Typography>
                              }
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ p: 1.5, width: downLg ? "50%" : "aaa" }}
                            >
                              {row.is_claimed ? (
                                <Box
                                  //   variant={
                                  //     theme.palette.mode === "light"
                                  //       ? "ghost"
                                  //       : "filled"
                                  //   }
                                  //   color={
                                  //     row.status === "PENDING"
                                  //       ? "warning"
                                  //       : "primary"
                                  //   }
                                  sx={{ backgroundColor: "warning" }}
                                >
                                  <Chip label={t(row.status)} color={renderColor(row.status)} sx={{height: 24}} />
                                  {/* <Badge badgeContent={t(row.status)} color="secondary" className="badge-jackpot-custom">{t(row.status)}</Badge> */}
                                </Box>
                              ) : (
                                <Box>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={handleClaimWinning}
                                >
                                  {t("take")}
                                </Button>
                                </Box>
                              )}
                              {downLg && 
                              <Typography fontSize={14} mt={2}>
                                Trạng thái
                              </Typography>
                              }
                              {/* <Button
                                size="small"
                                variant="contained"
                                //   onClick={handleClaimWinning}
                              >
                                {t("take")}
                              </Button> */}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </CardContent>
              <PaginationContainer>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                >
                  {/* <Typography>{t("Show result")}:</Typography>
                  <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                    <Select
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={data.length}>{t("all")}</MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
                <Pagination
                  count={Math.ceil(totalPage / 10)}
                  page={page}
                  onChange={handleChangePage}
                  shape="rounded"
                />
              </PaginationContainer>

              {/* Dialog for displaying and editing data */}
              <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{t("Details")}</DialogTitle>
                <DialogContent>
                  {dialogData && (
                    <Box>
                      <Typography variant="body1">
                        {t("time")}:{" "}
                        {format(new Date(dialogData.createdAt), "HH:mm dd/MM")}
                      </Typography>
                      {/* Add other details here as needed */}
                    </Box>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>{t("close")}</Button>
                </DialogActions>
              </Dialog>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Close")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default JackpotPopover;
