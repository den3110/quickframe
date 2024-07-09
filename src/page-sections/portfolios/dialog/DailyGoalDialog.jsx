import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DailyGoalDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Thiết lập mục tiêu hằng ngày (DEMO)
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={1} display="flex" justifyContent="center">
          <Box bgcolor="#E0F2F1" px={2} py={1} borderRadius={1}>
            <Typography color="textSecondary" variant="subtitle2">
              Lợi nhuận tích lũy: $0.95
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography gutterBottom>
          Khi tổng lợi nhuận đạt ngưỡng như đã cài đặt dưới đây thì toàn bộ gói
          sẽ được ngưng.
        </Typography>
        <Box mt={3} display="flex" justifyContent="space-between" gap={1  }>
          <Box>
            <Typography variant="subtitle1" color="textPrimary">
              Tổng Lợi đạt
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value="$0"
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" color="textPrimary">
              Tổng Lỗ chạm
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value="$0"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" justifyContent="center">
          <Button variant="contained" color="success" onClick={handleClose}>
            Lưu cài đặt
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DailyGoalDialog;
