import React, { Fragment, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
  Divider,
  useTheme,
} from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import { BudgetStrategyType, BudgetStrategyTypeTitle } from "type/BudgetStrategyType";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  // borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  // width: theme.breakpoints.down("lg") ? "50%" : "auto",
  "&.MuiTableCell-root": {
      borderLeft: "1px solid #eeeff2",
      borderTop: "2px solid #fff"
    }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  whiteSpace: "nowrap",
  color: theme.palette.text.main
}));

const CustomAutowinTable = () => {
  const { dataStat } = useContext(PortfolioDetailContext); 
  const theme= useTheme()

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="left" style={{ padding: "16px" }}>
        {BudgetStrategyTypeTitle[dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType]}
      </Typography>
      <Table border>
        <TableBody>
          {dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType !== BudgetStrategyType.FIBO_X_STEP && dataStat?.lastData?.budgetStrategy?.bs?.method_data?.map(
            (item, key) => (
              <Fragment key={key}>
                <TableRow style={{ backgroundColor: dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 ? theme.palette.success[101] : "#f9f9fa" }}>
                  <StyledTableCell align="center">
                    <StyledTypography color={ dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 ? theme.palette.success.buy + "!important" : ""}>
                      Hàng {parseInt(key) + 1}
                    </StyledTypography>
                  </StyledTableCell>
                  {item?.split("-")?.map((item2, key2) => (
                    <Fragment key={key2}>
                      <StyledTableCell align="center" sx={{background: (dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 && dataStat?.lastData.budgetStrategy?.bs?.index === parseInt(key2)) ? theme.palette.success.buy : (dataStat?.lastData.budgetStrategy?.bs?.index=== parseInt(key2) && dataStat?.lastData.budgetStrategy?.bs?.row !== parseInt(key) + 1 ? theme.palette.success[101] : "")}}>
                        <StyledTypography sx={{color: (dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 && dataStat?.lastData.budgetStrategy?.bs?.index === parseInt(key2)) ? "white" : ""}}>{item2}</StyledTypography>
                      </StyledTableCell>
                      {/* {dataStat?.lastData.budgetStrategy?.bs?.index=== parseInt(key2) &&} */}
                    </Fragment>
                  ))}
                </TableRow>
                {/* <Divider /> */}
              </Fragment>
            )
          )}
          {dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType === BudgetStrategyType.FIBO_X_STEP && dataStat?.lastData?.budgetStrategy?.bs?.method_data?.slice(0, 1)?.map(
            (item, key) => (
              <Fragment key={key}>
                <TableRow style={{ backgroundColor: dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 ? theme.palette.success[100] : "#f9f9fa" }}>
                  <StyledTableCell align="center">
                    <StyledTypography color={ dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 ? theme.palette.success.buy : ""}>
                      Hàng {parseInt(key) + 1}
                    </StyledTypography>
                  </StyledTableCell>
                  {item?.split("-")?.map((item2, key2) => (
                    <Fragment key={key2}>
                      <StyledTableCell align="center" sx={{background: (dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 && dataStat?.lastData.budgetStrategy?.bs?.index === parseInt(key2) + 1) ? theme.palette.success.main : ""}}>
                        <StyledTypography sx={{color: (dataStat?.lastData.budgetStrategy?.bs?.row === parseInt(key) + 1 && dataStat?.lastData.budgetStrategy?.bs?.index === parseInt(key2)) ? "white" : ""}}>{item2}</StyledTypography>
                      </StyledTableCell>
                    </Fragment>
                  ))}
                </TableRow>
                <Divider />
              </Fragment>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomAutowinTable;
