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
import formatCurrency from "util/formatCurrency";
import BlockFollowerDialog from "../dialog/BlockFollowerDialog";
import FollowerPlanDialog from "../dialog/FollowerPlanDialog";
import BlockIcon from "@mui/icons-material/Block";
import { constant } from "constant/constant";
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

const ListUserFollow = ({ data, setData, dataProps, setChange }) => {
  const {t }= useTranslation()

  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected] = useState();
  const [page, setPage] = useState(1);
  const [blockFollower, setBlockFollower] = useState(false);
  const [openFollowerPlan, setOpenFollowerPlan] = useState(false);
  // const [selected, setSelected]=
  //   const [data, set]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: downLg ? 0 : "16px" }}>
      <TableContainer component={Paper}>
        <Table>
          {!downLg && (
            <TableHead>
              <TableRow>
                <StyledTableCell>{t("nickname")}</StyledTableCell>
                {/* <StyledTableCell>Loại tài khoản</StyledTableCell> */}
                <StyledTableCell>{t("profit_day")}</StyledTableCell>
                <StyledTableCell>{t("vol_day")}</StyledTableCell>
                <StyledTableCell>{t("actions")}</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data?.map((item, key) => (
              <TableRow
                onClick={() => {
                  setSelected(item);
                  setOpenFollowerPlan(true);
                }}
                key={key}
                sx={{ display: downLg ? "flex" : "", flexWrap: "wrap" }}
              >
                <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    {downLg && <Typography>Nick name</Typography>}
                    {downLg && (
                      <Typography
                        fontSize={14}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        {t("Plan")}: {item?.count || 0}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Box display={"flex"} alignItems={"center"} gap={.5}>
                      <img
                        style={{ width: 32, height: 32 }}
                        src={
                          constant.URL_ASSETS_LOGO +
                          "/" +
                          item?.clientId +
                          ".ico"
                        }
                        alt="Can't open"
                      />{" "}
                      <Typography
                        fontSize={14}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                      >
                        {item?.nickName}
                      </Typography>
                    </Box>
                    {!downLg && (
                      <Typography
                        fontSize={14}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        {t("Plan")}: {item?.count || 0}
                      </Typography>
                    )}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {downLg && <Typography>Lợi nhuận:</Typography>}
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                    color={
                      parseFloat(item?.day_profit) >= 0
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {formatCurrency(item?.day_profit)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {downLg && <Typography>VOL:</Typography>}
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                    color={
                      parseFloat(item?.day_volume) >= 0
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {formatCurrency(item?.day_volume)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: downLg ? "100%" : "",
                    display: downLg ? "flex" : "",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    startIcon={<BlockIcon />}
                    fullWidth={downLg ? true : false}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(item);
                      setBlockFollower(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {t("block")}
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
      <BlockFollowerDialog
        setChange={setChange}
        dataProps={dataProps}
        open={blockFollower}
        data={data}
        onClose={() => setBlockFollower(false)}
        selectedProps={selected}
        setData={setData}
      />
      <FollowerPlanDialog
        open={openFollowerPlan}
        onClose={() => {
          setOpenFollowerPlan(false);
        }}
        selected={selected}
      />
    </Box>
  );
};

export default ListUserFollow;
