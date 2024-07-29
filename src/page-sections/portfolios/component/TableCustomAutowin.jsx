import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  styled,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import {
  BudgetStrategyType,
  BudgetStrategyTypeTitle,
} from "type/BudgetStrategyType";
import FlickAnimate from "icons/FlickAnimate";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
import isNumber from "util/isNumber";
import round2number from "util/round2number";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  whiteSpace: "nowrap",
  color: theme.palette.text.main,
}));

const CustomAutowinTable = () => {
  const { dataStat } = useContext(PortfolioDetailContext);
  const theme = useTheme();
  const [itemColumnTable, setItemColumnTable] = useState(
    useMediaQuery(theme.breakpoints.down("lg")) ? 4 : 7
  );

  const StyledFirstTableCell = styled(TableCell)(({ theme }) => ({
    padding: "16px",
    display: "block",
    maxWidth: "20%",
    width: "20%",
    minWidth: "20%",
    "&.MuiTableCell-root": {
      borderLeft: `1px solid ${theme.palette.border}`,
      borderTop: `2px solid ${theme.palette.border}`,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "16px",
    display: "block",
    maxWidth: `calc(80% / ${itemColumnTable})`,
    width: `calc(80% / ${itemColumnTable})`,
    minWidth: `calc(80% / ${itemColumnTable})`,
    "&.MuiTableCell-root": {
      borderLeft: `1px solid ${theme.palette.border}`,
      borderTop: `2px solid ${theme.palette.border}`,
    },
  }));

  useEffect(() => {
    try {
      if (
        dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
          ?.toString()
          .split("-")?.length /
          itemColumnTable <
        1
      ) {
        setItemColumnTable(
          dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
            ?.toString()
            .split("-")?.length
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [dataStat?.lastData?.budgetStrategy?.bs?.method_data, itemColumnTable]);

  return (
    <TableContainer className="asklaws" component={Paper}>
      <Box
        fullWidth
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" align="left" style={{ padding: "16px" }}>
          {
            BudgetStrategyTypeTitle[
              dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType
            ]
          }
        </Typography>
        <FlickAnimate sx={{ marginRight: "8px" }} />
      </Box>
      <Box>
        <Box>
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
            }}
          >
            {console.log(dataStat?.lastData?.budgetStrategy)}
            {Array.from(
              Array(
                isNumber(
                  Math.ceil(
                    dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                      ?.toString()
                      ?.split("-")?.length / itemColumnTable
                  )
                )
                  ? Math.ceil(
                      dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                        ?.toString()
                        ?.split("-")?.length / itemColumnTable
                    )
                  : 0
              ).keys()
            )?.map((item, keyParent) => (
              <SwiperSlide key={keyParent}>
                <Box display={"block"}>
                  {dataStat?.lastData?.budgetStrategy?.bs
                    ?.budgetStrategyType !== BudgetStrategyType.FIBO_X_STEP &&
                    dataStat?.lastData?.budgetStrategy?.bs
                      ?.budgetStrategyType !==
                      BudgetStrategyType.CUSTOM_AUTOWIN &&
                    dataStat?.lastData?.budgetStrategy?.bs?.method_data?.map(
                      (item, key) => (
                        <Fragment key={key}>
                          <Box
                            display="flex"
                            style={{
                              backgroundColor:
                                dataStat?.lastData.budgetStrategy?.bs?.row ===
                                parseInt(key) + 1
                                  ? theme.palette.success[101]
                                  : theme.palette.background.cell,
                            }}
                          >
                            <StyledFirstTableCell align="center">
                              <StyledTypography
                                color={
                                  dataStat?.lastData.budgetStrategy?.bs?.row ===
                                  parseInt(key) + 1
                                    ? theme.palette.success.buy + "!important"
                                    : theme.palette.background.fcell
                                }
                              >
                                Hàng {parseInt(key) + 1}
                              </StyledTypography>
                            </StyledFirstTableCell>
                            {item
                              ?.toString()
                              ?.split("-")
                              ?.slice(
                                keyParent * itemColumnTable,
                                (keyParent + 1) * itemColumnTable
                              )
                              ?.map((item2, key2) => (
                                <Fragment key={key2}>
                                  <StyledTableCell
                                    align="center"
                                    sx={{
                                      position: "relative",
                                      background:
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.row
                                        ) ===
                                          parseInt(key) + 1 &&
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.index
                                        ) ===
                                          parseInt(
                                            key2 + keyParent * itemColumnTable
                                          )
                                          ? theme.palette.success.buy
                                          : parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.index
                                            ) ===
                                              parseInt(
                                                key2 +
                                                  keyParent * itemColumnTable
                                              ) &&
                                            parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.row
                                            ) !==
                                              parseInt(key) + 1
                                          ? theme.palette.success[101]
                                          : "",
                                    }}
                                  >
                                    <StyledTypography
                                      sx={{
                                        color:
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.row
                                          ) ===
                                            parseInt(key) + 1 &&
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.index
                                          ) ===
                                            parseInt(
                                              key2 + keyParent * itemColumnTable
                                            )
                                            ? "white"
                                            : "",
                                      }}
                                    >
                                      {round2number(item2)}
                                    </StyledTypography>
                                    {parseInt(key) === 0 && <Box
                                      sx={{
                                        position: "absolute",
                                        right: 4,
                                        top: 4,
                                      }}
                                    >
                                      <Typography fontSize={10}>
                                        {parseInt(
                                          key2 + keyParent * itemColumnTable
                                        ) + parseInt(1)}
                                      </Typography>
                                    </Box>}
                                  </StyledTableCell>
                                </Fragment>
                              ))}
                            {(keyParent + 1) * itemColumnTable >
                              dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                ?.toString()
                                ?.split("-")?.length &&
                              Array.from(
                                Array(
                                  dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                    ?.toString()
                                    ?.split("-")?.length -
                                    keyParent * itemColumnTable +
                                    1
                                ).keys()
                              ).map((item, key) => (
                                <StyledTableCell></StyledTableCell>
                              ))}
                          </Box>
                        </Fragment>
                      )
                    )}

                  {dataStat?.lastData?.budgetStrategy?.bs
                    ?.budgetStrategyType ===
                    BudgetStrategyType.CUSTOM_AUTOWIN &&
                    dataStat?.lastData?.budgetStrategy?.bs?.method_data?.map(
                      (item, key) => (
                        <Fragment key={key}>
                          <Box
                            display="flex"
                            style={{
                              backgroundColor:
                                parseInt(
                                  dataStat?.lastData.budgetStrategy?.bs?.row
                                ) ===
                                parseInt(key) + 1
                                  ? theme.palette.success[101]
                                  : theme.palette.background.cell,
                            }}
                          >
                            <StyledFirstTableCell align="center">
                              <StyledTypography
                                color={
                                  parseInt(
                                    dataStat?.lastData.budgetStrategy?.bs?.row
                                  ) ===
                                  parseInt(key) + 1
                                    ? theme.palette.success.buy + "!important"
                                    : theme.palette.background.fcell
                                }
                              >
                                {parseInt(key) === 0 && "Hàng win"}
                                {parseInt(key) === 1 && "Giá trị"}
                                {parseInt(key) === 2 && "Hàng lose"}
                              </StyledTypography>
                            </StyledFirstTableCell>
                            {item
                              ?.split("-")
                              ?.slice(
                                keyParent * itemColumnTable,
                                (keyParent + 1) * itemColumnTable
                              )
                              ?.map((item2, key2) => (
                                <Fragment key={key2}>
                                  <StyledTableCell
                                    align="center"
                                    sx={{
                                      position: "relative",
                                      background:
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.row
                                        ) ===
                                          parseInt(key) + 1 &&
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.index
                                        ) ===
                                          parseInt(
                                            key2 + keyParent * itemColumnTable
                                          )
                                          ? theme.palette.success.buy
                                          : parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.index
                                            ) ===
                                              parseInt(
                                                key2 +
                                                  keyParent * itemColumnTable
                                              ) &&
                                            parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.row
                                            ) !==
                                              parseInt(key) + 1
                                          ? theme.palette.success[101]
                                          : "",
                                    }}
                                  >
                                    <StyledTypography
                                      sx={{
                                        color:
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.row
                                          ) ===
                                            parseInt(key) + 1 &&
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.index
                                          ) ===
                                            parseInt(
                                              key2 + keyParent * itemColumnTable
                                            )
                                            ? "white"
                                            : "",
                                      }}
                                    >
                                      {round2number(item2)}
                                    </StyledTypography>
                                    {parseInt(key) === 1 && 
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        right: 4,
                                        top: 4,
                                      }}
                                    >
                                      <Typography fontSize={10}>
                                        {parseInt(
                                          key2 + keyParent * itemColumnTable
                                        ) + parseInt(1)}
                                      </Typography>
                                    </Box>
                                    }
                                  </StyledTableCell>
                                </Fragment>
                              ))}
                            {(keyParent + 1) * itemColumnTable >
                              dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                ?.toString()
                                ?.split("-")?.length &&
                              Array.from(
                                Array(
                                  dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                    ?.toString()
                                    ?.split("-")?.length -
                                    keyParent * itemColumnTable +
                                    1
                                ).keys()
                              ).map((item, key) => (
                                <StyledTableCell key={key}></StyledTableCell>
                              ))}
                          </Box>
                        </Fragment>
                      )
                    )}

                  {/*  */}
                  {dataStat?.lastData?.budgetStrategy?.bs
                    ?.budgetStrategyType === BudgetStrategyType.FIBO_X_STEP &&
                    dataStat?.lastData?.budgetStrategy?.bs?.method_data
                      ?.slice(0, 1)
                      ?.map((item, key) => (
                        <Fragment key={key}>
                          <Box
                            display="flex"
                            sx={{
                              backgroundColor:
                                parseInt(
                                  dataStat?.lastData.budgetStrategy?.bs?.row
                                ) ===
                                parseInt(key) + 1
                                  ? theme.palette.success[101]
                                  : theme.palette.background.cell,
                            }}
                          >
                            <StyledFirstTableCell align="center">
                              <StyledTypography
                                color={
                                  parseInt(
                                    dataStat?.lastData.budgetStrategy?.bs?.row
                                  ) ===
                                  parseInt(key) + 1
                                    ? theme.palette.success.buy + "!important"
                                    : theme.palette.background.fcell
                                }
                              >
                                Hàng {parseInt(key) + 1}
                              </StyledTypography>
                            </StyledFirstTableCell>
                            {item
                              ?.split("-")
                              ?.slice(
                                keyParent * itemColumnTable,
                                (keyParent + 1) * itemColumnTable
                              )
                              ?.map((item2, key2) => (
                                <Fragment key={key2}>
                                  <StyledTableCell
                                    align="center"
                                    sx={{
                                      position: "relative",
                                      background:
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.row
                                        ) ===
                                          parseInt(key) + 1 &&
                                        parseInt(
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.index
                                        ) ===
                                          parseInt(
                                            key2 + keyParent * itemColumnTable
                                          )
                                          ? theme.palette.success.buy
                                          : parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.index
                                            ) ===
                                              parseInt(
                                                key2 +
                                                  keyParent * itemColumnTable
                                              ) &&
                                            parseInt(
                                              dataStat?.lastData.budgetStrategy
                                                ?.bs?.row
                                            ) !==
                                              parseInt(key) + 1
                                          ? theme.palette.success[101]
                                          : "",
                                    }}
                                  >
                                    <StyledTypography
                                      sx={{
                                        color:
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.row
                                          ) ===
                                            parseInt(key) + 1 &&
                                          parseInt(
                                            dataStat?.lastData.budgetStrategy
                                              ?.bs?.index
                                          ) ===
                                            parseInt(
                                              key2 + keyParent * itemColumnTable
                                            )
                                            ? "white"
                                            : "",
                                      }}
                                    >
                                      {round2number(item2)}
                                    </StyledTypography>
                                    {parseInt(key) === 0 && <Box
                                      sx={{
                                        position: "absolute",
                                        right: 4,
                                        top: 4,
                                      }}
                                    >
                                      <Typography fontSize={10}>
                                        {parseInt(
                                          key2 + keyParent * itemColumnTable
                                        ) + parseInt(1)}
                                      </Typography>
                                    </Box>}
                                  </StyledTableCell>
                                </Fragment>
                              ))}
                            {(keyParent + 1) * itemColumnTable >
                              dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                ?.toString()
                                ?.split("-")?.length &&
                              Array.from(
                                Array(
                                  dataStat?.lastData?.budgetStrategy?.bs?.method_data?.[0]
                                    ?.toString()
                                    ?.split("-")?.length -
                                    keyParent * itemColumnTable +
                                    1
                                ).keys()
                              ).map((item, key) => (
                                <StyledTableCell key={key}></StyledTableCell>
                              ))}
                          </Box>
                        </Fragment>
                      ))}
                </Box>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
              <Box display={"block"}>
                {dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType !==
                  BudgetStrategyType.FIBO_X_STEP &&
                  dataStat?.lastData?.budgetStrategy?.bs?.method_data?.map(
                    (item, key) => (
                      <Fragment key={key}>
                        <TableRow
                          style={{
                            backgroundColor:
                              dataStat?.lastData.budgetStrategy?.bs?.row ===
                              parseInt(key) + 1
                                ? theme.palette.success[101]
                                : "#f9f9fa",
                          }}
                        >
                          <StyledTableCell align="center">
                            <StyledTypography
                              color={
                                dataStat?.lastData.budgetStrategy?.bs?.row ===
                                parseInt(key) + 1
                                  ? theme.palette.success.buy + "!important"
                                  : ""
                              }
                            >
                              Hàng {parseInt(key) + 1}
                            </StyledTypography>
                          </StyledTableCell>
                          {item
                            ?.split("-")
                            ?.slice(14, 21)
                            ?.map((item2, key2) => (
                              <Fragment key={key2}>
                                <StyledTableCell
                                  align="center"
                                  sx={{
                                    background:
                                      dataStat?.lastData.budgetStrategy?.bs
                                        ?.row ===
                                        parseInt(key) + 1 &&
                                      dataStat?.lastData.budgetStrategy?.bs
                                        ?.index === parseInt(key2)
                                        ? theme.palette.success.buy
                                        : dataStat?.lastData.budgetStrategy?.bs
                                            ?.index === parseInt(key2) &&
                                          dataStat?.lastData.budgetStrategy?.bs
                                            ?.row !==
                                            parseInt(key) + 1
                                        ? theme.palette.success[101]
                                        : "",
                                  }}
                                >
                                  <StyledTypography
                                    sx={{
                                      color:
                                        dataStat?.lastData.budgetStrategy?.bs
                                          ?.row ===
                                          parseInt(key) + 1 &&
                                        dataStat?.lastData.budgetStrategy?.bs
                                          ?.index === parseInt(key2)
                                          ? "white"
                                          : "",
                                    }}
                                  >
                                    {item2}
                                  </StyledTypography>
                                </StyledTableCell>
                              </Fragment>
                            ))}
                        </TableRow>
                      </Fragment>
                    )
                  )}
                {dataStat?.lastData?.budgetStrategy?.bs?.budgetStrategyType ===
                  BudgetStrategyType.FIBO_X_STEP &&
                  dataStat?.lastData?.budgetStrategy?.bs?.method_data
                    ?.slice(0, 1)
                    ?.map((item, key) => (
                      <Fragment key={key}>
                        <TableRow
                          style={{
                            backgroundColor:
                              dataStat?.lastData.budgetStrategy?.bs?.row ===
                              parseInt(key) + 1
                                ? theme.palette.success[100]
                                : "#f9f9fa",
                          }}
                        >
                          <StyledTableCell align="center">
                            <StyledTypography
                              color={
                                dataStat?.lastData.budgetStrategy?.bs?.row ===
                                parseInt(key) + 1
                                  ? theme.palette.success.buy
                                  : ""
                              }
                            >
                              Hàng {parseInt(key) + 1}
                            </StyledTypography>
                          </StyledTableCell>
                          {item?.split("-")?.map((item2, key2) => (
                            <Fragment key={key2}>
                              <StyledTableCell
                                align="center"
                                sx={{
                                  background:
                                    dataStat?.lastData.budgetStrategy?.bs
                                      ?.row ===
                                      parseInt(key) + 1 &&
                                    dataStat?.lastData.budgetStrategy?.bs
                                      ?.index ===
                                      parseInt(key2) + 1
                                      ? theme.palette.success.main
                                      : "",
                                }}
                              >
                                <StyledTypography
                                  sx={{
                                    color:
                                      dataStat?.lastData.budgetStrategy?.bs
                                        ?.row ===
                                        parseInt(key) + 1 &&
                                      dataStat?.lastData.budgetStrategy?.bs
                                        ?.index === parseInt(key2)
                                        ? "white"
                                        : "",
                                  }}
                                >
                                  {item2}
                                </StyledTypography>
                              </StyledTableCell>
                            </Fragment>
                          ))}
                        </TableRow>
                      </Fragment>
                    ))}
              </Box>
            </SwiperSlide> */}
          </Swiper>
        </Box>
      </Box>
    </TableContainer>
  );
};

export default CustomAutowinTable;
