import {
  Box,
  Avatar,
  styled,
  Tooltip,
  Checkbox,
  IconButton,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Layout from "../Layout";
import { isDark } from "utils/constants";
import SearchIcon from '@mui/icons-material/Search';
import { Fragment, useContext, useState } from "react";
import { MoreVert, Add, InsertChart } from "@mui/icons-material";
import moment from "moment";
import NewBotAI from "../NewBotAI";
import SignalStrategyContext from "contexts/SignalStrategyContext";
import NewBotAIStringMethod from "../NewBotAIStringMethod";
import DeleteSignalStrategy from "../DeleteSignalStrategy";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  width: theme.breakpoints.down("lg") ? "50%" : "auto",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: 4,
  paddingRight: 4,
  gap: 10,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const SignalStrategyList = () => {
  const { data, setData, loading } = useContext(SignalStrategyContext);
  const [initState, setInitState] = useState(false);
  const [selectedBot, setSelectedBot] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditStringMethod, setIsEditStringMethod]= useState(false)
  const [isDeleteBot, setIsDeleteBot]= useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [anchorEls, setAnchorEls] = useState({});
  const [page, setPage] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openNewBotAI, setOpenNewBotAI] = useState(false);
  const [openNewBotAIStringMethod, setOpenNewBotAIStringMethod]= useState(false)
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  // const [loading, setLoading]= useState(false)

  const handleOpenDeleteBot= ()=> {
    setIsDeleteBot(true)
  }
  const handleCloseDeleteBot= ()=> {
    setIsDeleteBot(false)
  }
  const handleCloseNewBotAI = () => {
    setOpenNewBotAI(false);
  };

  const handleOpenNewBotAI = () => {
    setOpenNewBotAI(true);
    setInitState(false);
    setIsEdit(false);
  };

  const handleOpenNewBotAIStringMethod = () => {
    setOpenNewBotAIStringMethod(true);
  };
  const handleCloseNewBotAIStringMethod = () => {
    setOpenNewBotAIStringMethod(false);
  };

  const handleClick = (event, index) => {
    setAnchorEls((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index) => {
    setAnchorEls((prev) => ({ ...prev, [index]: null }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  return (
    <Layout>
      <Box pt={2} pb={4}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: downLg ? "column" : "row",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search Strategy..."
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
              <Box mt={downLg ? 2 : 0} display={downLg ? "flex" : "block"}>
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  size={downLg ? "large" : "medium"}
                  fullWidth={downLg ? true : false}
                  // onClick={handleDialogOpen}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  fullWidth={downLg ? true : false}
                  size={downLg ? "large" : "medium"}
                  color="success"
                  // onClick={handleOpenNewBudgetStrategy}
                  onClick={handleMenuClick}
                >
                  Thiết kế Bot AI
                </Button>
                <Menu
                  anchorEl={anchorElMenu}
                  open={Boolean(anchorElMenu)}
                  onClose={handleMenuClose}
                  // anchorPosition={""}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleOpenNewBotAIStringMethod()
                      handleMenuClose();
                    }}
                  >
                    <Add />
                    String Method mới
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      // Handle new candle model action
                      handleOpenNewBotAI();
                      handleMenuClose();
                    }}
                  >
                    <InsertChart />
                    Mô hình nến mới
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                {!downLg && (
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Strategy name</StyledTableCell>
                      <StyledTableCell>Method Using</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {loading=== true && <TableRow>
                      <TableCell rowSpan={10} colSpan={3} align="center" sx={{height: 200}}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>}
                  {loading=== false && data
                    .slice(
                      rowsPerPage * (page - 1),
                      rowsPerPage * (page - 1) + rowsPerPage
                    )
                    .map((row, index) => (
                      <Fragment key={index}>
                        <StyledTableRow
                          sx={{
                            display: downLg ? "flex" : "",
                            flexWrap: "wrap",
                            borderBottom: downLg ? "" : "none",
                          }}
                        >
                          <StyledTableCell
                            sx={{
                              order: downLg ? 1 : 1,
                              borderBottom: downLg ? "none" : "",
                            }}
                          >
                            <Typography variant="body1" fontWeight={"600"}>
                              {row.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Created:{" "}
                              {moment(row.createdAt).format(
                                "DD-MM-YYYY, HH:mm:ss"
                              )}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              order: downLg ? 3 : 2,
                              borderBottom: downLg ? "none" : "",
                            }}
                          >
                            {/* {BudgetStrategyTypeTitle[row.type]} */}
                            {row?.type}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              order: downLg ? 2 : 4,
                              display: downLg ? "flex" : "",
                              flexDirection: "row-reverse",
                              borderBottom: downLg ? "none" : "",
                            }}
                          >
                            <IconButton onClick={(e) => handleClick(e, index)}>
                              <MoreVert />
                            </IconButton>
                            <Menu
                              disableScrollLock
                              anchorEl={anchorEls[index]}
                              open={Boolean(anchorEls[index])}
                              onClose={() => handleClose(index)}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <StyledMenuItem
                                onClick={() => {
                                  if(row.type=== "STRING_METHOD") {
                                    handleOpenNewBotAIStringMethod()
                                    setIsEditStringMethod(true)
                                    setSelectedBot(row);
                                    handleClose(index);

                                  }
                                  else if(row.type=== "BUBBLE_METHOD") {
                                    handleOpenNewBotAI();
                                    handleClose(index);
                                    setIsEdit(true);
                                    setSelectedBot(row);
                                    setInitState(true);
                                  }
                                }}
                              >
                                Edit Bot
                              </StyledMenuItem>
                              <StyledMenuItem>
                                Share Bot
                              </StyledMenuItem>
                              <StyledMenuItem
                                onClick={() => {
                                  handleClose(index);
                                  setSelectedBot(row)
                                  handleOpenDeleteBot()
                                }}
                              >
                                Delete Bot
                              </StyledMenuItem>
                            </Menu>
                          </StyledTableCell>
                        </StyledTableRow>
                      </Fragment>
                    ))}
                </TableBody>
                {loading=== false && data?.length <= 0 &&
                <Box sx={{width: "200%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <EmptyPage />
                </Box>
              }
              </Table>
            </TableContainer>
            <PaginationContainer>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography>Show result:</Typography>
                <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                  >
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
              />
            </PaginationContainer>
          </Box>
        </Box>
        <NewBotAI
          initState={initState}
          open={openNewBotAI}
          onClose={handleCloseNewBotAI}
          selectedBot={selectedBot}
          setSelectedBot={setSelectedBot}
          is_edit={isEdit}
          setIsEdit={setIsEdit}
        />
        <NewBotAIStringMethod open={openNewBotAIStringMethod} onClose={handleCloseNewBotAIStringMethod} is_edit={isEditStringMethod} setIsEdit={setIsEditStringMethod} selectedBot={selectedBot} />
        <DeleteSignalStrategy open={isDeleteBot} onClose={handleCloseDeleteBot} selectedBot={selectedBot} setData={setData} data={data} />
      </Box>
    </Layout>
  );
};
export default SignalStrategyList;
