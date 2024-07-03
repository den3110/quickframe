import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Box,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import { isDark } from "utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from '@mui/icons-material/Close';

const NewBudgetStrategy = ({ open, onClose }) => {
  const [strategyName, setStrategyName] = useState("");
  const [method, setMethod] = useState("All orders");
  const [amount, setAmount] = useState("");
  const [stopWhenInsufficientFunds, setStopWhenInsufficientFunds] =
    useState(true);
  const [autoReloadDemoFunds, setAutoReloadDemoFunds] = useState(false);
  const [method1, setMethod1] = useState();
  const [method2, setMethod2] = useState();
  const [method3, setMethod3] = useState();
  const [advanceOptionFibo, setAdvancedOptionFibo] = useState("asc_loss");
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  const handleIncrement2 = () => {
    setCount2(count2 + 1);
  };

  const handleDecrement2 = () => {
    setCount2(count2 > 0 ? count2 - 1 : 0);
  };
  
  const [expanded, setExpanded] = useState(true);
  const isErrorInputAmount =
    parseFloat(amount) < 1 || parseFloat(amount) > 1000000;
  const handleSave = () => {
    console.log({
      strategyName,
      method,
      amount,
      stopWhenInsufficientFunds,
      autoReloadDemoFunds,
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={850} height={"1000vh"} display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>
        <Box>
            <Box sx={{width: "100%", display: "flex", flexDirection: "row-reverse"}}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{cursor: "pointer"}} onClick={onClose}>
                    <CloseIcon />
                </Box>
            </Box>
          <Typography variant="h6">Thiết lập chiến lược của bạn</Typography>
          <List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItem>
                <TextField
                  label="Tên chiến lược"
                  fullWidth
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      background: (theme) =>
                        isDark(theme) ? "#1f2937" : "white",
                    }}
                  >
                    Phương pháp vốn
                  </InputLabel>
                  <Select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <MenuItem value="All orders">All orders</MenuItem>
                    <MenuItem value="Custom Autowin">Custom Autowin</MenuItem>
                    <MenuItem value="Fibo">Fibo</MenuItem>
                    <MenuItem value="Martingale">Martingale</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </Box>
            <>
              {method === "All orders" && (
                <>
                  <ListItem>
                    <TextField
                      error={isErrorInputAmount === true ? true : false}
                      helperText={
                        isErrorInputAmount === true
                          ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                          : ""
                      }
                      label="Thiết lập số tiền vào lệnh"
                      fullWidth
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <Typography fontSize={12}>
                      Hệ số vào lệnh là cố định và không thay đổi
                    </Typography>
                  </ListItem>
                </>
              )}
              {method === "Custom Autowin" && (
                <>
                  <ListItem>
                    <TextField
                      // error={isErrorInputAmount === true ? true : false}
                      // helperText={
                      //   isErrorInputAmount === true
                      //     ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                      //     : ""
                      // }
                      label="Cài đặt hàng 1"
                      defaultValue={"1-1-2-6-4-3"}
                      fullWidth
                      type="text"
                      value={method1}
                      onChange={(e) => setMethod1(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      // error={isErrorInputAmount === true ? true : false}
                      // helperText={
                      //   isErrorInputAmount === true
                      //     ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                      //     : ""
                      // }
                      label="Cài đặt hàng 2"
                      defaultValue={"1-2-4-8-17-35"}
                      fullWidth
                      type="text"
                      value={method2}
                      onChange={(e) => setMethod2(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      // error={isErrorInputAmount === true ? true : false}
                      // helperText={
                      //   isErrorInputAmount === true
                      //     ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                      //     : ""
                      // }
                      label="Cài đặt hàng 3"
                      defaultValue={"2-3-4-5-6-1"}
                      fullWidth
                      type="text"
                      value={method3}
                      onChange={(e) => setMethod3(e.target.value)}
                    />
                  </ListItem>
                </>
              )}
              {method === "Fibo" && (
                <>
                  <Box display={"flex"}>
                    <ListItem>
                      <TextField
                        // error={isErrorInputAmount === true ? true : false}
                        // helperText={
                        //   isErrorInputAmount === true
                        //     ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                        //     : ""
                        // }
                        label="Đặt giá trị lệnh"
                        defaultValue={"11-2-2-3-12-1-1"}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            {advanceOptionFibo=== "asc_loss" ? "Khi thua sẽ tiến" : "Khi thắng sẽ tiến"}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleDecrement}
                          sx={{ minWidth: "36px", padding: "6px" }}
                        >
                          <RemoveIcon />
                        </Button>
                        <Typography variant="body1" sx={{ margin: "0 16px" }}>
                          {count}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleIncrement}
                          sx={{ minWidth: "36px", padding: "6px" }}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </ListItem>
                  </Box>
                  <Box display={"flex"} mt={2}>
                    <ListItem>
                      <FormControl fullWidth>
                        <InputLabel
                          sx={{
                            background: (theme) =>
                              isDark(theme) ? "#1f2937" : "white",
                          }}
                        >
                          Tuỳ chọn nâng cao
                        </InputLabel>
                        <Select
                          value={advanceOptionFibo}
                          onChange={(e) =>
                            setAdvancedOptionFibo(e.target.value)
                          }
                        >
                          <MenuItem value="asc_loss">Tăng khi thua</MenuItem>
                          <MenuItem value="asc_win">Tăng khi thắng</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                          {advanceOptionFibo=== "asc_loss" ? "Khi thắng sẽ lùi" : "Khi thua sẽ lùi"}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleDecrement2}
                          sx={{ minWidth: "36px", padding: "6px" }}
                        >
                          <RemoveIcon />
                        </Button>
                        <Typography variant="body1" sx={{ margin: "0 16px" }}>
                          {count2}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleIncrement2}
                          sx={{ minWidth: "36px", padding: "6px" }}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </ListItem>
                  </Box>
                </>
              )}
              {method === "Martingale" && (
                <>
                  <Box display={"flex"}>
                    <ListItem>
                      <TextField
                        // error={isErrorInputAmount === true ? true : false}
                        // helperText={
                        //   isErrorInputAmount === true
                        //     ? "Giá trị lớn hơn 1,000,000 hoặc nhỏ hơn 1 không hợp lệ."
                        //     : ""
                        // }
                        label="Đặt giá trị lệnh"
                        defaultValue={"11-2-2-3-12-1-1"}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <FormControl fullWidth>
                        <InputLabel
                          sx={{
                            background: (theme) =>
                              isDark(theme) ? "#1f2937" : "white",
                          }}
                        >
                          Option
                        </InputLabel>
                        <Select
                          value={advanceOptionFibo}
                          onChange={(e) =>
                            setAdvancedOptionFibo(e.target.value)
                          }
                        >
                          <MenuItem value="asc_loss">Tăng khi thua</MenuItem>
                          <MenuItem value="asc_win">Tăng khi thắng</MenuItem>
                          <MenuItem value="asc_alw">Luôn tăng</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                  </Box>
                </>
              )}
            </>
            <ListItem>
              <Box fullWidth sx={{ width: "100%" }}>
                <Accordion
                  fullWidth
                  expanded={expanded}
                  onChange={() => setExpanded(!expanded)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Nâng cao (Tùy chọn)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItem>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={stopWhenInsufficientFunds}
                            onChange={(e) =>
                              setStopWhenInsufficientFunds(e.target.checked)
                            }
                          />
                        }
                        label="Dừng lại khi không đủ số dư"
                      />
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoReloadDemoFunds}
                            onChange={(e) =>
                              setAutoReloadDemoFunds(e.target.checked)
                            }
                          />
                        }
                        label="Tự động tải lại số dư demo"
                      />
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </ListItem>
          </List>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1} pl={2} pr={2}>
          <Button
            variant={"outlined"}
            onClick={onClose}
            sx={{ padding: "10px 16px" }}
          >
            Đóng
          </Button>
          <Button
            sx={{ padding: "10px 16px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Lưu chiến lược
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBudgetStrategy;
