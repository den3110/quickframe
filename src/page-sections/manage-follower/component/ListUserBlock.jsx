import {
  Box,
  Button,
  FormControl,
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
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import UnblockFollowerDialog from "../dialog/UnblockFollowerDialog";
import { useTranslation } from "react-i18next";

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

const ListUserBlock = ({ data, setData, dataProps, setChange }) => {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected] = useState();
  const [page, setPage] = useState(1);
  const [blockFollower, setBlockFollower] = useState(false);
  //   const [data, set]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ padding: "16px" }}>
      <TableContainer component={Paper}>
        <Table>
          {!downLg && (
            <TableHead>
              <TableRow>
                <StyledTableCell>Biệt danh</StyledTableCell>
                <StyledTableCell>Thời gian chặn</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data?.map((item, key) => (
              <TableRow key={key} sx={{display: downLg ? "flex" : "", flexWrap: "wrap"}}>
              <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {downLg && <Typography>Nick name</Typography>}
                  <Typography>{item?.nickName}</Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {downLg && <Typography>Thời gian tạo</Typography>}
                  <Typography>
                  {moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell sx={{width: downLg ? "100%" : "", order: 1}}>
                  <Button
                  fullWidth={downLg ? true : false}
                    onClick={() => {
                      setSelected(item);
                      setBlockFollower(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Bỏ chặn
                  </Button>
                </StyledTableCell>
              </TableRow>
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
          <Typography>{t("Show result:")}:</Typography>
          <FormControl variant="outlined" sx={{ minWidth: 60 }}>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={data.length}>{t("All")}</MenuItem>
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
      <UnblockFollowerDialog
        open={blockFollower}
        onClose={() => setBlockFollower(false)}
        selectedProps={selected}
        setData={setData}
        data={data}
        dataProps={dataProps} 
        setChange={setChange}
      />
    </Box>
  );
};

export default ListUserBlock;
