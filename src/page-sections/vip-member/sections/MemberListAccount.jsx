import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { VipMemberContext } from "..";
import { isDark } from "util/constants";
// import sortData from "util/sortData";
// import { BudgetStrategyTypeTitle } from "type/BudgetStrategyType";
// import moment from "moment/";
// import { MoreVert } from "@mui/icons-material";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import numberWithCommas from "util/numberSeparatorThousand";
import round2number from "util/round2number";
import LevelSelect from "../component/LevelSelect";
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  width: useMediaQuery((theme) => theme.breakpoints.down("lg"))
    ? "50%"
    : "auto",
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

const MemberListAccount = () => {
  const {t }= useTranslation()

  const { data, loading, page, setPage } = useContext(VipMemberContext);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [dataState, setDataState] = useState({ c: [] });
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme= useTheme()
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <Box
      className="amskawx"
      sx={{ width: "100%" }}
      paddingBottom={downLg ? 5 : 0}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: downLg ? "start" : "space-between",
          alignItems: downLg ? "start" : "center",
          flexDirection: downLg ? "column" : "row",
        }}
        mb={2}
      >
        <Box mt={downLg ? 1 : 0} mb={downLg ? 1 : 0}>
          <Typography fontSize={downLg ? 18 : 24} fontWeight={600}>
            Manage Your Affiliate
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LevelSelect />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{background: theme.palette.background.default}}>
        <Table>
          {!downLg && (
            <TableHead>
              <TableRow>
                <StyledTableCell>User name</StyledTableCell>
                <StyledTableCell>Vip Level</StyledTableCell>
                <StyledTableCell>Total Vol</StyledTableCell>
                <StyledTableCell>Com.Earned</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {loading === true && (
              <TableRow>
                <TableCell
                  rowSpan={10}
                  colSpan={3}
                  align="center"
                  sx={{ height: 200 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {loading === false &&
              dataState?.c.map((row, index) => (
                <StyledTableRow
                  sx={{
                    display: downLg ? "flex" : "",
                    flexWrap: "wrap",
                    borderBottom: downLg ? "" : "none",
                    marginBottom: "12px",
                    background: theme.palette.background.t2,
                    borderRadius: downLg ? "10px" : 0
                  }}
                  key={index}
                >
                  <StyledTableCell
                    sx={{
                      width: downLg ? "50%" : "aaa",
                      borderBottom: downLg ? "none" : "",
                    }}
                  >
                    <Typography variant="body1" fontWeight={"600"}>
                      {row.nick}
                    </Typography>
                    {downLg && (
                      <Typography
                        variant="body1"
                        fontSize={12}
                        color={"secondary"}
                      >
                        User name
                      </Typography>
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "50%" : "aaa",
                      borderBottom: downLg ? "none" : "",
                    }}
                  >
                    <Typography variant="body1" fontWeight={"600"}>
                      {row?.rank}
                    </Typography>
                    {downLg && (
                      <Typography
                        variant="body1"
                        fontSize={12}
                        color={"secondary"}
                      >
                        Vip Level
                      </Typography>
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "50%" : "aaa",
                      borderBottom: downLg ? "none" : "",
                    }}
                  >
                    <Typography fontSize={14} sx={{ whiteSpace: "nowrap" }}  fontWeight={"600"}>
                      ${numberWithCommas(round2number(row?.tradevol))}
                    </Typography>
                    {downLg && (
                      <Typography
                        variant="body1"
                        fontSize={12}
                        color={"secondary"}
                      >
                        Total Vol
                      </Typography>
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "50%" : "aaa",
                      borderBottom: downLg ? "none" : "",
                    }}
                  >
                    <Typography variant="body1" fontWeight={"600"}>
                      ${numberWithCommas(round2number(row?.coms))}
                    </Typography>
                    {downLg && (
                      <Typography
                        variant="body1"
                        fontSize={12}
                        color={"secondary"}
                      >
                        Com. Earned
                      </Typography>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading === false && dataState?.c?.length <= 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmptyPage title={"Không có dữ liệu tại đây"} disableButton={true} />
        </Box>
      )}
      <PaginationContainer>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>{t("Show result:")}:</Typography>
          <FormControl variant="outlined" sx={{ minWidth: 60 }}>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={dataState?.t?.length}>{t("All")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Pagination
          count={Math.ceil(dataState?.t / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </PaginationContainer>
    </Box>
  );
};

export default MemberListAccount;
