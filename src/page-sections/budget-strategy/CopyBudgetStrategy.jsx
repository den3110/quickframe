import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  styled,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const BoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const CopyBudgteStrategy = ({ open, onClose }) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <BoxFlex sx={{ padding: "16px 24px" }}>
        <Typography variant="h6" fontWeight={600}>
          Copy Budget Strategy
        </Typography>
        <BoxFlex onClick={onClose} sx={{ cursor: "pointer" }}>
          <CloseIcon />
        </BoxFlex>
      </BoxFlex>
      <Divider />
      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ color: "#6950E8" }}>
          Easy way to set up your superb strategy!
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your shared Budget Strategy Code to start your ideal investment
          plan
        </Typography>
        <Box mt={4}>
          <TextField
            size={"medium"}
            autoFocus
            margin="dense"
            label="Copy strategy code"
            type="text"
            fullWidth
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter Code"
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() =>
                    navigator.clipboard.readText().then((text) => setCode(text))
                  }
                >
                  PASTE
                </Button>
              ),
            }}
          />
          <Typography variant="caption" display="block" gutterBottom mt={1} mb={2}>
            Note: You will be able to review strategy to confirm after copying
            code.
          </Typography>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={() => alert("Code copied: " + code)}
          color="primary"
          variant="contained"
        >
          Copy Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyBudgteStrategy;
