import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { random } from "lodash";
import { useInView } from "react-intersection-observer";
// import { v4 } from "uuid";
import { isDark } from "util/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useTranslation } from "react-i18next";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:disabled": {
    backgroundColor: theme.palette.mode === "dark" ? "#2e3645" : "#f7f7f7",
  },
}));
const colors = [
  (theme) => (isDark(theme) ? "#565d67" : "#d9d9d9"),
  "#0caf60",
  "#fd4f4f",
  "#ff6e00",
];

// const BallButton = ({
//   number,
//   state,
//   onClick,
//   handleBallSelected,
//   selectedCandle,
//   index,
//   handleBallStates,
// }) => {
//   useEffect(() => {
//     if (selectedCandle) {
//       if (number === selectedCandle.betIndex - 80) {
//         console.log("index", index)
//         const newBallStates = Array(20).fill(0);
//         newBallStates[index] = 1;
//         handleBallStates(newBallStates);
//       }
//     }
//   }, [selectedCandle, index, number]);
//   return (
//     <IconButton
//       disabled={number % 2 === 0}
//       onClick={() => {
//         onClick();
//         handleBallSelected(number);
//       }}
//       sx={{
//         width: 30,
//         height: 30,
//         backgroundColor: colors[state],
//         color: number % 2 === 0 ? "#323b49" : "white",
//         border: state === 0 ? "#565d67" : "#565d67",
//         "&.Mui-disabled": {
//           backgroundColor: colors[state],
//           color: "#323b49",
//           border: state === 0 ? "#565d67" : "#565d67",
//         },
//       }}
//     >
//       <Typography fontSize={10}>{number}</Typography>
//     </IconButton>
//   );
// };
// load data từ api chỗ nào
const GridBallButton = ({
  state,
  onClick,
  number,
  setSelectedGridBall,
  selectedGridBall,
  selectedCandle,
  index,
  handleGridBallStates,
  tableIndex,
  gridBallStates,
  is_edit,
}) => {
  const disableBubble = (betIndex) => {
    // tinh nhu nay dung khong a
    switch (betIndex) {
      case 81:
        return 100;
      default:
        return selectedCandle?.betIndex - 22 - 80 + 100 + 1;
    }
  };

  const renderType= (state)=> {
    if (state === 0) {
      return "UP";
    }
    if (state === 1) {
      return "DOWN";
    }
    if (state === 2) {
      return "RITY";
    }
  }

  useEffect(() => {
    if (selectedCandle) {
      selectedCandle?.conditions?.map((item, key) => {
        if (
          number === item.index &&
          number <= disableBubble(selectedCandle?.betIndex)
        ) {
          const newGridBallStates = gridBallStates;
          const resultType = item.resultType;
          let state;
          if (resultType === "UP") {
            state = 1;
          }
          if (resultType === "DOWN") {
            state = 2;
          }
          if (resultType=== "RITY") {
            state= 3
          }
          newGridBallStates[tableIndex][index] = state;
          handleGridBallStates(newGridBallStates);
        }
      });
    }
  }, [selectedCandle, index, number, tableIndex]);

  return (
    <StyledIconButton
      disableRipple
      disabled={
        number <= disableBubble(selectedCandle?.betIndex) ? false : true
      }
      onClick={() => {
        onClick();
        console.log("state", state)
        if (parseInt(state) === 3) {
          setSelectedGridBall(
            selectedGridBall.filter((item) => parseInt(item.index) !== parseInt(number))
          );
        } else {
          setSelectedGridBall((prev) => {
            const existingIndex = prev.findIndex(
              (item) => parseInt(item.index) === parseInt(number)
            );
            if (existingIndex !== -1) {
              // exist
              const updatedSelectedGridBall = [...prev];
              updatedSelectedGridBall[existingIndex] = {
                index: number,
                resultType: renderType(parseInt(state)),
              };
              return updatedSelectedGridBall;
            } else {
              return [
                ...prev,
                { index: number, resultType: renderType(parseInt(state)) },
              ];
            }
          });
        }
      }}
      sx={{
        width: 30,
        height: 30,
        backgroundColor: colors[state],
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{opacity: 1}} fontSize={10}>{number - (20 * tableIndex)}</Typography>
    </StyledIconButton>
  );
};

const CandleShadow = ({
  open,
  onClose,
  setTargetConditions,
  selectedCandle,
  is_edit,
  targetConditions,
  is_new,
  setIsNew,
  setIsEdit,
  selectedBallProps,
}) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const {t}= useTranslation()
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [selectedBall, setSelectedBall] = useState(1);
  const [selectedGridBall, setSelectedGridBall] = useState([]);
  const [ballStates, setBallStates] = useState([1, ...Array(19).fill(0)]);
  const [gridBallStates, setGridBallStates] = useState(
    Array(5)
      .fill()
      .map(() => Array(20).fill(0))
  );

  const [longShort, setLongShort] = useState("UP");

  const renderLongShort= (type)=> {
    switch (type) {
      case "UP":
        return "UP"
      case "DOWN":
        return "DOWN"
      case "NONE":
        return "NONE"
      case "MAJORITY":
        return "MAJORITY"
      case "MINORITY":
        return "MINORITY"
      default:
        break;
    }
  }

  const renderColorType= (type)=> {
    switch (type) {
      case "UP":
        return "#0caf60"
      case "DOWN":
        return "#fd4f4f"
      case "NONE":
        return "#ffff00"
      case "MAJORITY":
        return "#7300ff"
      case "MINORITY":
        return "#e80cce"
      default:
        return ""
    }
  }

  // const handleBallClick = (index) => {
  //   const newStates = Array(20).fill(0);
  //   newStates[index] = 1;

  //   setBallStates(newStates);
  // };

  const handleGridBallClick = (gridIndex, ballIndex) => {
    const newGridStates = [...gridBallStates];
    newGridStates[gridIndex][ballIndex] =
      (newGridStates[gridIndex][ballIndex] + 1) % 4;
      // console.log("newGridStates", newGridStates)
    setGridBallStates(newGridStates);
  };

  const handleSave = () => {
    const data = {
      betIndex: selectedBall,
      conditions: selectedGridBall.map((item) => ({
        ...item,
        // betIndex: item
      })),
      betType: longShort,
    };
    if (selectedCandle?.index && is_edit === true) {
      data.index = selectedCandle?.index;
    } else {
      data.index = random(10000000);
    }
    if (is_edit === true) {
      setTargetConditions((prev) => {
        const existingIndex = targetConditions?.findIndex(
          (item) => item.index === selectedCandle?.index
        );
        console.log("existing", existingIndex);
        if (existingIndex !== -1) {
          const updatedConditions = targetConditions;
          updatedConditions[existingIndex] = data;
          return updatedConditions;
        } else {
          const updatedConditions = targetConditions;
          return updatedConditions;
        }
      });
    } else {
      setTargetConditions((prev) => [...prev, data]);
    }
    setBallStates([1, ...Array(19).fill(0)]);
    setGridBallStates(
      Array(5)
        .fill()
        .map(() => Array(20).fill(0))
    );
    handleCloseCandleShadow();
  };

  const handleDelete = () => {
    setTargetConditions(
      targetConditions.filter((item) => item.betIndex !== selectedBall)
    );
    handleCloseCandleShadow();
  };

  const handleCopy = () => {
    const data = {
      betIndex: selectedBall,
      conditions: selectedGridBall.map((item) => ({
        ...item,
        // betIndex: item
      })),
      betType: longShort,
    };
    data.index = random(1000000000);
    setTargetConditions((prev) => [...prev, data]);
    handleCloseCandleShadow();
  };

  const handleCloseCandleShadow = () => {
    setIsEdit(false);
    setIsNew(false);
    onClose();
  };

  useEffect(() => {
    if (is_edit === false) {
      setBallStates([1, ...Array(19).fill(0)]);
      setGridBallStates(
        Array(5)
          .fill()
          .map(() => Array(20).fill(0))
      );
      setSelectedBall(1);
      setSelectedGridBall([]);
      // setLongShort()
    }
  }, [is_edit]);

  useEffect(() => {
    if (selectedCandle && is_new === false) {
      setSelectedBall(selectedCandle?.betIndex);
      setSelectedGridBall(selectedCandle?.conditions);
      setLongShort(renderLongShort(selectedCandle?.betType))
    }
  }, [selectedCandle, inView, is_new]);

  useEffect(() => {
    if (is_new === true) {
      setSelectedBall(selectedCandle?.betIndex ? selectedCandle?.betIndex : 1);
      setSelectedGridBall([]);
      setBallStates([1, ...Array(19).fill(0)]);
      setGridBallStates(
        Array(5)
          .fill()
          .map(() => Array(20).fill(0))
      );
    }
  }, [is_new, selectedCandle]);
  // useEffect(()=> {
  //   setSelectedBall(selectedBallProps)
  // }, [selectedBallProps, inView])

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={handleCloseCandleShadow}
      sx={{ zIndex: "" }}
    >
      <Box
        ref={ref}
        sx={{
          width: downLg ? "100%" : 850,
          height: downLg ? "70vh" : "100vh",
          p: 2,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Box>
          <IconButton
            onClick={handleCloseCandleShadow}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
            display={"flex"}
            alignItems={"center"}
          >
            {t("I want")}
            <FormControl sx={{ mx: 1 }}>
              <Select
                size={"small"}
                value={longShort}
                onChange={(e) => setLongShort(e.target.value)}
                sx={{
                  "& .MuiSelect-select": {
                    color: renderColorType(longShort),
                  },
                }}
              >
                <MenuItem value="UP">Buy</MenuItem>
                <MenuItem value="DOWN">Sell</MenuItem>
                <MenuItem value="NONE">Skip</MenuItem>
                <MenuItem value="MAJORITY">Majority</MenuItem>
                <MenuItem value="MINORITY">Minority</MenuItem>
              </Select>
            </FormControl>
            {t("for the number")} {selectedBall - 80}
          </Typography>
          {/* <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: 300 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 30px)",
                gap: "10px",
                justifyItems: "center",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              {ballStates.map((state, index) => (
                <BallButton
                  key={index}
                  index={index}
                  number={
                    index % 5 === 0
                      ? index / 5 + 1
                      : Math.floor(index / 5) +
                        4 * index +
                        1 -
                        Math.floor(index / 5) * 5 * 4
                  }
                  state={state}
                  onClick={() => handleBallClick(index)}
                  handleBallStates={setBallStates}
                  handleBallSelected={setSelectedBall}
                  selectedCandle={selectedCandle}
                />
              ))}
            </Box>
          </Box> */}
          <Typography variant="body1" sx={{ mt: 4 }}>
            {t("If the following conditions are satisfied:")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 6 }}>
            {downLg && (
              <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                style={{ paddingBottom: "20px", overflowY: "unset" }}
                className="waa"
                initialSlide={5}
                navigation
                breakpoints={{
                  // when window width is >= 640px
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((table, tableIndex) => (
                  <SwiperSlide key={tableIndex}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" mb={1}>
                        {t("board")} {table}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 30px)",
                            gap: "10px",
                            justifyItems: "center",
                            alignItems: "center",
                          }}
                        >
                          {gridBallStates?.[tableIndex].map(
                            (state, ballIndex) => (
                              <GridBallButton
                                key={ballIndex}
                                state={state}
                                number={
                                  ballIndex % 5 === 0
                                    ? ballIndex / 5 + 1 + tableIndex * 20
                                    : Math.floor(ballIndex / 5) +
                                      4 * ballIndex +
                                      1 -
                                      Math.floor(ballIndex / 5) * 5 * 4 +
                                      tableIndex * 20
                                }
                                onClick={() =>
                                  handleGridBallClick(tableIndex, ballIndex)
                                }
                                setSelectedGridBall={setSelectedGridBall}
                                selectedGridBall={selectedGridBall}
                                handleGridBallStates={setGridBallStates}
                                selectedCandle={selectedCandle}
                                tableIndex={tableIndex}
                                index={ballIndex}
                                gridBallStates={gridBallStates}
                                is_edit={is_edit}
                              />
                            )
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {!downLg && (
              <>
                {[1, 2, 3, 4, 5].map((table, tableIndex) => (
                  <Box key={table} sx={{ mb: 2 }}>
                    <Typography variant="body2" mb={1}>
                      {t("board")} {table}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 30px)",
                        gap: "10px",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      {gridBallStates?.[tableIndex].map((state, ballIndex) => (
                        <GridBallButton
                          key={ballIndex}
                          state={state}
                          number={
                            ballIndex % 5 === 0
                              ? ballIndex / 5 + 1 + tableIndex * 20
                              : Math.floor(ballIndex / 5) +
                                4 * ballIndex +
                                1 -
                                Math.floor(ballIndex / 5) * 5 * 4 +
                                tableIndex * 20
                          }
                          onClick={() =>
                            handleGridBallClick(tableIndex, ballIndex)
                          }
                          setSelectedGridBall={setSelectedGridBall}
                          selectedGridBall={selectedGridBall}
                          handleGridBallStates={setGridBallStates}
                          selectedCandle={selectedCandle}
                          tableIndex={tableIndex}
                          index={ballIndex}
                          gridBallStates={gridBallStates}
                          is_edit={is_edit}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseCandleShadow}
              sx={{ padding: "10px" }}
            >
              {t("Close")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ padding: "10px" }}
              onClick={() => handleSave()}
            >
              {t("save")}
            </Button>
          </Box>
          <Box
            mt={2}
            gap={1}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {is_edit === true && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ padding: "10px" }}
                onClick={() => handleDelete()}
              >
                Xoá điều kiện
              </Button>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ padding: "10px" }}
              onClick={() => handleCopy()}
            >
              {t("Duplicate")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CandleShadow;
