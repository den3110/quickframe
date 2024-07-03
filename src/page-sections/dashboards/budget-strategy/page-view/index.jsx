import {
  Box,
  Button,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "icons/SearchIcon";
import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { isDark } from "utils/constants";
import EditBudgetStrategy from "icons/budget-strategy/EditBudgetStrategy";
import ShareBudgetStrategy from "icons/budget-strategy/ShareBudgetStrategy";
import DeleteBudgetStrategy from "icons/budget-strategy/DeleteBudgetStrategy";
import CopyBudgteStrategy from "page-sections/budget-strategy/CopyBudgetStrategy";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StyledMenuItem= styled(MenuItem)(({theme})=> ({
  display: "flex", alignItems: "center",
  paddingLeft: 4, 
  paddingRight: 4,
  gap: 10
}))

const EcommercePageView = () => {
  const data = [
    {
      name: "Xlosse 1 Copy_BT_286675_BT_286788 Copy Copy Copy Copy",
      date: "01/07/2024, 09:31:05",
      method: "Martingale",
      safeMode: true,
    },
    {
      name: "hehe",
      date: "30/06/2024, 12:52:29",
      method: "Fibo",
      safeMode: true,
    },
    {
      name: "hehe",
      date: "30/06/2024, 12:51:51",
      method: "Fibo",
      safeMode: true,
    },
    {
      name: "XZCXZC",
      date: "15/06/2024, 12:59:02",
      method: "Martingale",
      safeMode: true,
    },
    {
      name: "hehe",
      date: "02/12/2023, 15:15:57",
      method: "Victor 3",
      safeMode: true,
    },
    {
      name: "hehe",
      date: "02/12/2023, 15:15:01",
      method: "Fibo",
      safeMode: true,
    },
  ];
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(()=> {
    (async ()=> {
      try {
        const response= await budgetStrategyApi.userBudgetStrategyList()
        if(response?.data?.ok=== true) {

        }
        else if(response?.data?.ok=== false) {
          showToast(response?.data?.m, "error")
        }
      } catch (error) {
        showToast(error?.response?.data?.message)
      }
    })()
  }, [])

  return (
    <Box
      pt={2}
      pb={4}
      sx={{
        background: (theme) =>
          isDark(theme) ? "rgb(17, 24, 39)" : "rgb(249, 250, 251)",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Budget Management (13)
        </Typography>
        <Box
          sx={{
            padding: "20px",
            background: (theme) => (isDark(theme) ? "#1f2937" : "white"),
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search Strategy..."
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <Box>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleDialogOpen}>
                Copy
              </Button>
              <Button variant="contained" color="success">
                New Strategy
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Strategy name</StyledTableCell>
                  <StyledTableCell>Method Using</StyledTableCell>
                  <StyledTableCell>Safe Mode</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow sx={{}} key={index}>
                    <StyledTableCell>
                      <Typography variant="body1" fontWeight={"600"}>
                        {row.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Created: {row.date}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>{row.method}</StyledTableCell>
                    <StyledTableCell>
                      <Switch checked={row.safeMode} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton onClick={handleClick}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        disableScrollLock
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <StyledMenuItem onClick={handleClose}><EditBudgetStrategy />Edit Strategy</StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}><ShareBudgetStrategy />Share Strategy</StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}><DeleteBudgetStrategy />Delete Strategy</StyledMenuItem>
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
                <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Pagination
              count={3}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
            />
          </PaginationContainer>
        </Box>
      </Box>
      <CopyBudgteStrategy open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
};
export default EcommercePageView;
