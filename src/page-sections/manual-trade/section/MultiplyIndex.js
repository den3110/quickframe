// MultiplyIndex.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Header from "./Header";

const MultiplyIndex = () => {
  const [multiplier, setMultiplier] = useState("1x");
  const [customMultiplier, setCustomMultiplier] = useState("");

  const handleMultiplier = (event, newMultiplier) => {
    if (newMultiplier !== null) {
      setMultiplier(newMultiplier);
    }
  };

  const handleCustomMultiplierChange = (event) => {
    setCustomMultiplier(event.target.value);
    setMultiplier(event.target.value);
  };

  return (
    <Box p={2} border="1px solid #ccc" borderRadius={4}>
      <Header />
      <Box mb={1}>
        <TextField
          label="Số tiền vào lệnh"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="$1"
        />
      </Box>
      <Box mb={1}>
        <ToggleButtonGroup
          value={multiplier}
          exclusive
          onChange={handleMultiplier}
          fullWidth
          margin="normal"
        >
          <ToggleButton
            value="1x"
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            1x
          </ToggleButton>
          <ToggleButton
            value="2x"
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            2x
          </ToggleButton>
          <ToggleButton
            value="4x"
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            4x
          </ToggleButton>
          <ToggleButton
            value="8x"
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            8x
          </ToggleButton>
          <ToggleButton
            value="Khác"
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Khác
          </ToggleButton>
        </ToggleButtonGroup>
        {multiplier === "Khác" && (
          <TextField
            label="Custom Multiplier"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customMultiplier}
            onChange={handleCustomMultiplierChange}
          />
        )}
      </Box>
      <Box mb={1}>
        <TextField
          label="Thời gian chờ"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="24s"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2} gap={1.5}>
        <Button fullWidth variant="contained" color="error" size="large">
          Short
        </Button>
        <Button fullWidth variant="contained" color="success" size="large">
          Long
        </Button>
      </Box>
    </Box>
  );
};

export default MultiplyIndex;
