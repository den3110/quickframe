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
} from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
// CUSTOM DEFINED HOOK
import useNavigate from "hooks/useNavigate";
// CUSTOM COMPONENTS
import { Paragraph, Small } from "components/typography";
import { FlexBetween, FlexBox } from "components/flexbox";
// CUSTOM LAYOUT COMPONENT
import Layout from "../Layout";
// CUSTOM ICON COMPONENTS
import Trash from "icons/duotone/Trash";
import Archive from "icons/duotone/Archive";
import UnreadMail from "icons/duotone/UnreadMail";
// CUSTOM UTILS METHOD
import { isDark } from "utils/constants";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import moment from "moment";
// STYLED COMPONENTS
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

const MailActionWrapper = styled(Box)(({ theme }) => ({
  right: 24,
  top: "50%",
  zIndex: 11,
  display: "none",
  position: "absolute",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.grey[isDark(theme) ? 900 : 100],
}));
const MailItem = styled(FlexBetween)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  borderBottom: `1px solid ${theme.palette.divider}`,
  ":hover": {
    backgroundColor: theme.palette.grey[isDark(theme) ? 900 : 100],
    "& .actions": {
      display: "block",
    },
  },
}));
const SignalStrategyList = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [anchorEls, setAnchorEls] = useState({}); // Dùng để lưu trữ trạng thái anchorEl cho mỗi hàng
  const [page, setPage] = useState(1);
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
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

  return (
    <Layout>
      <Box
        pt={2}
        pb={4}
        sx={{
          // background: (theme) =>
          //   isDark(theme) ? "rgb(17, 24, 39)" : "rgb(249, 250, 251)",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Box
            sx={{
              padding: "20px",
              // background: (theme) => (isDark(theme) ? "#1f2937" : "white"),
            }}
          >
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
                >
                  New Strategy
                </Button>
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
                  {data
                    .slice(
                      rowsPerPage * (page - 1),
                      rowsPerPage * (page - 1) + rowsPerPage
                    )
                    .map((row, index) => (
                      <StyledTableRow
                        sx={{
                          display: downLg ? "flex" : "",
                          flexWrap: "wrap",
                          borderBottom: downLg ? "" : "none",
                        }}
                        key={index}
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
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            order: downLg ? 2 : 4,
                            display: downLg ? "flex" : "",
                            flexDirection: "row-reverse",
                            borderBottom: downLg ? "none" : "",
                          }}
                        >
                          <IconButton 
                            onClick={(e) => handleClick(e, index)}
                          >
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
                                // setSelectedStrategy(row);
                                // setIsEditStrategy(true);
                                handleClose(index);
                                // handleOpenNewBudgetStrategy();
                              }}
                            >
                              {/* <EditBudgetStrategy /> */}
                              Edit Strategy
                            </StyledMenuItem>
                            <StyledMenuItem>
                              {/* <ShareBudgetStrategy /> */}
                              Share Strategy
                            </StyledMenuItem>
                            <StyledMenuItem
                              onClick={() => {
                                // setSelectedStrategy(row);
                                // handleOpenDeleteStrategy();
                                handleClose(index);
                              }}
                            >
                              {/* <DeleteBudgetStrategyIcon /> */}
                              Delete Strategy
                            </StyledMenuItem>
                          </Menu>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
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
        {/* <CopyBudgteStrategy open={dialogOpen} onClose={handleDialogClose} /> */}
        {/* <NewBudgetStrategy
          is_edit={isEditStrategy}
          open={openNewBudgetStrategy}
          setData={setData}
          onClose={() => {
            setOpenNewBudgetStrategy(false);
            setIsEditStrategy(false);
          }}
          selectedStrategy={selectedStrategy}
        /> */}
        {/* <DeleteBudgetStrategy
          open={isDeleteStrategy}
          onClose={handleCloseDeleteStrategy}
          selectedStrategy={selectedStrategy}
          setChange={setChange}
        /> */}
      </Box>
    </Layout>
  );
};
export default SignalStrategyList;
