import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { showToast } from "components/toast/toast";

const NewBotAIStringMethod = ({ open, onClose, is_edit, setIsEdit, selectedBot }) => {
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  const [idBotAI, setIdBotAI]= useState()
  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState("STRING_METHOD");
  const [chainSignal, setChainSignal] = useState([]);
  const [allResults, setAllResults] = useState(false);
  const isDisableButton = name?.length <= 0 || chainSignal?.length <= 0;
  const handleChangeChainSignal = (value) => {
    setChainSignal(value);
  };

  const handleChangeAllResult = (e) => {
    setAllResults(e.target.checked);
  };

  const handleClose= ()=> {
    setIsEdit(false)
    onClose()
  }

  const handleSubmit = async () => {
    try {
      const data = {
        name,
        sources: {
          allResults,
          conditions: chainSignal,
        },
        type: strategy,
      };
      let response
      if(is_edit=== true) {
        response = await signalStrategyApi.userBudgetSignalUpdate(idBotAI, data);
      }
      else {
          response = await signalStrategyApi.userBudgetSignalCreate(data);
      }
      if (response?.data?.ok === true) {
        showToast(is_edit=== true? "Lưu phương pháp thành công" : "Tạo phương pháp thành công", "success");
        setName("")
        setChainSignal([])
        setAllResults(false)
        handleClose()
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  useEffect(()=> {
    if(is_edit=== true) {
        setIdBotAI(selectedBot?._id)
        setName(selectedBot?.name)
        setChainSignal(selectedBot?.sources?.conditions)
        setAllResults(selectedBot?.sources?.allResults)
    }
    else {
      setName("")
      setChainSignal([])
      setAllResults(false)
    }
  }, [is_edit, selectedBot])

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} open={open} onClose={handleClose}>
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          height: downLg ? "70vh" : "100vh",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          overflow: "auto"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Thiết lập bot nâng cao của bạn</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="subtitle1">1. Tên bot*</Typography>
          <TextField
            placeholder="Nhập tên bot"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography variant="subtitle1">2. Chiến lược*</Typography>
          <Select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            fullWidth
          >
            <MenuItem value="STRING_METHOD">String method</MenuItem>
          </Select>

          <Typography variant="subtitle1">3. Đặt chuỗi mẫu tín hiệu</Typography>
          <MuiChipsInput
            value={chainSignal}
            onChange={handleChangeChainSignal}
            placeholder="Nhấn enter để thêm"
          />
          <Typography variant="subtitle1">
            4. Sử dụng cả nến chờ và kết quả
          </Typography>
          <FormControlLabel
            control={
              <Checkbox checked={allResults} onChange={handleChangeAllResult} />
            }
            label="All results"
          />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginTop: 2 }}
          >
            * s = SELL, b = BUY <br />
            * Chiến lược String method có bao gồm thêm ký tự 'x' đại diện cho
            kết quả bất kì (s hoặc b) và ký tự 'x' này phải được đặt trước dấu
            -. Chuỗi kết quả và tín hiệu mong muốn được phân tách bằng -<br />
            * Nhiều chuỗi có thể kết hợp và các chuỗi dài hơn được ưu tiên. Một
            chuỗi hợp lệ phải có ký tự 's' hoặc 'b' và ký tự 'x' không nằm ở đầu
            chuỗi.
            <br />
            * Ngoài ra, chuỗi tín hiệu có thể được rút ngắn nếu chuỗi bị trùng
            lặp hoặc quá dài như sau:
            <br />
            s-bbbbb → s-5b, sxx-b → s2x-b
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            gap: 1,
          }}
        >
          <Button variant="outlined" onClick={handleClose} sx={{ padding: "10px" }}>
            Đóng
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px" }}
            disabled={isDisableButton}
            onClick={handleSubmit}
          >
            {is_edit=== true ? "Lưu bot" : "Tạo bot"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBotAIStringMethod;
