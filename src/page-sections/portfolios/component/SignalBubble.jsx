import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { isDark } from "utils/constants";
import { PortfolioDetailContext } from "../page-view/detail";
import { ref } from "yup";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const colors = [
  (theme) => (isDark(theme) ? "#565d67" : "#d9d9d9"),
  "#0caf60",
  "#fd4f4f",
  "#ff0"
];

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:disabled": {
    backgroundColor: theme.palette.mode === "dark" ? "#2e3645" : "#f7f7f7",
  },
}));

const GridBallButton = ({
  state,
  number,
  index,
  handleGridBallStates,
  tableIndex,
  gridBallStates,
  dataSignal,
  resultIndex,
}) => {
  const [ballBubble, setBallBubble] = useState();
  useEffect(() => {
    if (dataSignal) {
      dataSignal?.map((item, key) => {
        if (number === item.item) {
          const newGridBallStates = gridBallStates;
          const resultType = item.result;
          let state;
          if (resultType === "UP") {
            state = 1;
          } else if (resultType === "DOWN") {
            state = 2;
          }
          else if (resultType === "NORMAL") {
            state = 3;
          }
          else if (resultType === "NONE") {
            state = 0;
          }
          setBallBubble(state);
          return 0;
        }
        return 1;
      });
    }
  }, [index, number, tableIndex, dataSignal]);

  //   useEffect(() => {
  //     if (resultIndex.item === number) {
  //       let state;
  //       const newGridBallStates = gridBallStates;
  //       console.log(resultIndex.item)
  //       if (resultIndex.result === "UP") {
  //         state = 1;
  //       } else if (resultIndex.result === "DOWN") {
  //         state = 2;
  //       } else if (resultIndex.result === "NONE") {
  //         state = 0;
  //       }
  //       console.log(state)
  //       setBallBubble(state)
  //       newGridBallStates[tableIndex][index] = state;
  //       handleGridBallStates(newGridBallStates);
  //     }
  //   }, [resultIndex, index, number, tableIndex]);
  return (
    <StyledIconButton
      disableRipple
      //   disabled={
      //     number <= disableBubble(selectedCandle?.betIndex) ? false : true
      //   }
      sx={{
        width: 16,
        height: 16,
        backgroundColor: colors[ballBubble],
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography fontSize={10}>{/* {number} */}</Typography>
    </StyledIconButton>
  );
};

const SignalBubble = () => {
  const sliderRef = useRef(null);
  const { dataSignal: dataSignalProps, setDataSignal } = useContext(
    PortfolioDetailContext
  );
  const [gridBallStates, setGridBallStates] = useState(
    Array(5)
      .fill()
      .map(() => Array(20).fill(0))
  );

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.slideNext();
  }, []);

  return (
    <Box position={"relative"}>
      <Swiper
        // ref={sliderRef}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ paddingBottom: "20px", overflowY: "unset" }}
        className="waa"
        // navigation
        initialSlide={2}
        onBeforeInit={(swiper) => {
            sliderRef.current = swiper;
        }}
        breakpoints={{
          // when window width is >= 640px
          300: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {[1, 2, 3, 4, 5].map((table, tableIndex) => (
          <SwiperSlide key={tableIndex}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" mb={1} sx={{ fontSize : "0.7em"}}>
                Bảng {table}
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
                    gridTemplateColumns: "repeat(5, 16px)",
                    gap: "5px",
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
                      resultIndex={dataSignalProps[0]}
                      handleGridBallStates={setGridBallStates}
                      tableIndex={tableIndex}
                      index={ballIndex}
                      dataSignal={dataSignalProps}
                      gridBallStates={gridBallStates}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        position={"absolute"}
        sx={{ bottom: 0, right: 0 }}
        display={"flex"}
        gap={1}
        zIndex={99}
      >
        <Box>
          <IconButton color="primary" onClick={handlePrev   }>
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box>
          <IconButton color="primary">
            <ArrowForwardIos  onClick={handleNext}/>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SignalBubble;
