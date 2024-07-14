import {
  Box,
  Card,
  IconButton,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { ManualTradeContext } from "contexts/ManualTradeContext";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { isDark } from "utils/constants";

const colors = [
  (theme) => (isDark(theme) ? "#565d67" : "#d9d9d9"),
  "#0caf60",
  "#fd4f4f",
  "#ff0",
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
          } else if (resultType === "NORMAL") {
            state = 3;
          } else if (resultType === "NONE") {
            state = 0;
          }
          setBallBubble(state);
          return 0;
        }
        return 1;
      });
    }
  }, [index, number, tableIndex, dataSignal]);
  return (
    <StyledIconButton
      disableRipple
      sx={{
        width: 18,
        height: 18,
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

const BubbleHistory = () => {
  const theme = useTheme();
  const sliderRef = useRef(null);
    const { dataSignal: dataSignalProps, setDataSignal } = useContext(
      ManualTradeContext
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
    <Card variant="outlined" sx={{mb: 1}}>
      <Box sx={{padding: "16px 6px"}}>
        <Box position={"relative"} display={"flex"} gap={3}>
          {[1, 2, 3, 4, 5].map((table, tableIndex) => (
            <Box key={tableIndex} sx={{ mb: 2, padding: "10px" }}>
              <Typography
                variant="body2"
                mb={1.5}
                fontWeight={600}
                sx={{ fontSize: "0.7em" }}
              >
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
                    gridTemplateColumns: "repeat(5, 18px)",
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
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default BubbleHistory;
