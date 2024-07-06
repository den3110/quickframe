import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const colors = ["#565d67", "#0caf60", "#fd4f4f"];

const BallButton = ({ number, state, onClick, handleBallSelected }) => {
  return (
    <IconButton
      disabled={number % 2 === 0}
      onClick={() => {
        onClick();
        handleBallSelected(number);
      }}
      sx={{
        width: 30,
        height: 30,
        backgroundColor: colors[state],
        color: number % 2 === 0 ? "#323b49" : "white",
        border: state === 0 ? "#565d67" : "#565d67",
        "&.Mui-disabled": {
          backgroundColor: colors[state],
          color: "#323b49",
          border: state === 0 ? "#565d67" : "#565d67",
        },
      }}
    >
      <Typography fontSize={10}>{number}</Typography>
    </IconButton>
  );
};

const GridBallButton = ({
  state,
  onClick,
  number,
  setSelectedGridBall,
  selectedGridBall,
}) => {
  return (
    <Box
      onClick={() => {
        onClick();
        if ((state ) === 2) {
          setSelectedGridBall(
            selectedGridBall.filter((item) => item.index !== number)
          );
        } 
        
        else {
          setSelectedGridBall((prev) => {
            const existingIndex = prev.findIndex(
              (item) => item.index === number
            );
            if (existingIndex !== -1) {
              // exist
              const updatedSelectedGridBall = [...prev];
              updatedSelectedGridBall[existingIndex] = {
                index: number,
                resultType: state=== 1 ? "SELL" : "BUY",
              };
              return updatedSelectedGridBall;
            } else {
              return [...prev, { index: number, resultType: state=== 1 ? "SELL" : "BUY" }];
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
      <Typography fontSize={10}>{}</Typography>
    </Box>
  );
};

const CandleShadow = ({ open, onClose, setTargetConditions }) => {
  const [selectedBall, setSelectedBall] = useState(1);
  const [selectedGridBall, setSelectedGridBall] = useState([]);
  const [ballStates, setBallStates] = useState([1, ...Array(19).fill(0)]);
  const [longShort, setLongShort] = useState("Long");
  const [gridBallStates, setGridBallStates] = useState(
    Array(5)
      .fill()
      .map(() => Array(20).fill(0))
  );

  const handleBallClick = (index) => {
    const newStates = Array(20).fill(0);
    newStates[index] = 1;

    setBallStates(newStates);
  };

  const handleGridBallClick = (gridIndex, ballIndex) => {
    const newGridStates = [...gridBallStates];
    newGridStates[gridIndex][ballIndex] =
      (newGridStates[gridIndex][ballIndex] + 1) % 3;
    setGridBallStates(newGridStates);
  };

  const handleSave= ()=> {
    const data= {
        betIndex: selectedBall,
        conditions: selectedGridBall
    }
    setTargetConditions(prev=> [...prev, data])
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 850,
          p: 2,
          position: "relative",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          <IconButton
            onClick={onClose}
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
            (Bảng 5) Tôi muốn
            <FormControl sx={{ mx: 1 }}>
              <Select
                size={"small"}
                value={longShort}
                onChange={(e) => setLongShort(e.target.value)}
              >
                <MenuItem value="Long">Long</MenuItem>
                <MenuItem value="Short">Short</MenuItem>
              </Select>
            </FormControl>
            cho bóng số
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: 300 }}>
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
                  handleBallSelected={setSelectedBall}
                />
              ))}
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 4 }}>
            Nếu các điều kiện sau được thỏa mãn:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 6 }}>
            {[1, 2, 3, 4, 5].map((table, tableIndex) => (
              <Box key={table} sx={{ mb: 2 }}>
                <Typography variant="body2" mb={1}>
                  Bảng {table}
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
                  {gridBallStates[tableIndex].map((state, ballIndex) => (
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
                      onClick={() => handleGridBallClick(tableIndex, ballIndex)}
                      setSelectedGridBall={setSelectedGridBall}
                      selectedGridBall={selectedGridBall}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            gap: 1,
          }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ padding: "10px" }}>
            Đóng
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "10px" }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CandleShadow;
