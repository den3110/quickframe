import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { isDark } from "utils/constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from '@mui/icons-material/Close';
import { BudgetStrategyType, BudgetStrategyTypeTitle } from "type/BudgetStrategyType";
import { IncreaseValueType, IncreaseValueTypeTitle } from "type/IncreaseValueType";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";

const NewBudgetStrategy = ({ open, onClose, is_edit, selectedStrategy, setData }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [idBudegetStrategy, setIdBudgetStrategy]= useState()
  const [strategyName, setStrategyName] = useState("");
  // const [method, setMethod] = useState("All orders");
  const [increaseValueType, setIncreaseValueType]= useState(IncreaseValueType.AFTER_LOSS)
  const [type, setType]= useState(BudgetStrategyType.ALL_ORDERS)
  const [amount, setAmount] = useState("");
  const [method1, setMethod1] = useState("1-1-2-6-4-3");
  const [method2, setMethod2] = useState("1-2-4-8-17-35");
  const [method3, setMethod3] = useState("2-3-4-5-6-1");
  const [method4, setMethod4] = useState("2-3-4-5-6-1");
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

  const validateInput = (value) => {
    const pattern = /^(\d+)(-\d+)*$/; 
    if (value.match(pattern)) {
      return false; 
    }
    return true; 
  };
  
  const isErrorInputAmount =
    parseFloat(amount) < 1 || parseFloat(amount) > 1000000;
  const isErrormethod1= validateInput(method1)
  const isErrormethod2= validateInput(method2)
  const isErrormethod3= validateInput(method3)
  const isErrormethod4= validateInput(method4)
  const handleSave = async () => {
    let data
    let methodData
    let response
    switch(type) {
      case BudgetStrategyType.ALL_ORDERS:
        methodData= [amount]
        data= {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break;
      case BudgetStrategyType.CUSTOM_AUTOWIN:
        methodData= [method1, method2, method3]
        data= {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break
      case BudgetStrategyType.FIBO_X_STEP:
        methodData= [method1, count, count2]
        data= {
          name: strategyName,
          method_data: methodData,
          // increaseValueType,
          type
        }
        break
      case BudgetStrategyType.MARTINGALE:
        methodData= [method1]
        data= {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break
      case BudgetStrategyType.VICTOR_2:
        methodData= [method1, method2]
        data= {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break
      case BudgetStrategyType.VICTOR_3:
        methodData= [method1, method2, method3]
        data= {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break
      case BudgetStrategyType.VICTOR_4:
        methodData= [method1, method2, method3, method4]
        data= {   
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type
        }
        break
      default:
        break;
    }
    try {
      if(is_edit=== true) {
        response= await budgetStrategyApi.userBudgetStrategyUpdate(idBudegetStrategy, data)
      }
      else {
        response= await budgetStrategyApi.userBudgetStrategyCreate(data)
      }
      if(response?.data?.ok=== true) {
        if(is_edit!== true) {
          setData(response?.data?.d)
        }
        showToast("Tạo chiến lược vốn thành công", "success")
        setStrategyName("")
        setAmount("")
        setIncreaseValueType(IncreaseValueType.AFTER_LOSS)
        setType(BudgetStrategyType.ALL_ORDERS)
        setMethod1("1-1-2-6-4-3")
        setMethod2("1-2-4-8-17-35")
        setMethod3("2-3-4-5-6-1")
        setMethod4("2-3-4-5-6-1")
        setCount(0)
        setCount2(0)
        onClose()
      }
      else if(response?.data?.ok=== false) {
        showToast(response?.data?.m, "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m)
    }
  };

  const disableButton= ()=> {
    let disable
    switch(type) {
      case BudgetStrategyType.ALL_ORDERS:
        disable= strategyName?.length <= 0 || amount?.length <= 0 || parseInt(amount) > 10000000
        break;
      case BudgetStrategyType.CUSTOM_AUTOWIN:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || method2?.length <= 0 || method3?.length <= 0 || isErrormethod1=== true || isErrormethod2=== true || isErrormethod3=== true
        
        break
      case BudgetStrategyType.FIBO_X_STEP:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || isErrormethod1=== true
        break
      case BudgetStrategyType.MARTINGALE:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || isErrormethod1=== true 
        
        break
      case BudgetStrategyType.VICTOR_2:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || method2?.length <= 0  || isErrormethod1=== true || isErrormethod2=== true
        
        break
      case BudgetStrategyType.VICTOR_3:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || method2?.length <= 0 || method3?.length <= 0 || isErrormethod1=== true || isErrormethod2=== true || isErrormethod3=== true
    
        break
      case BudgetStrategyType.VICTOR_4:
        disable= strategyName?.length <= 0 || method1?.length <= 0 || method2?.length <= 0 || method3?.length <= 0 || method4?.length <= 0 || isErrormethod1=== true || isErrormethod2=== true || isErrormethod3=== true || isErrormethod4  === true
        break
      default:
        disable= false  
        break;
      }
    return disable;
  }

  useEffect(()=> {
    if(is_edit=== true) {
      setIdBudgetStrategy(selectedStrategy?._id)
      setStrategyName(selectedStrategy?.name)
      setType(selectedStrategy?.type)
      setAmount(selectedStrategy?.method_data?.[0])
      setMethod1(selectedStrategy?.method_data?.[0])
      setMethod2(selectedStrategy?.method_data?.[1])
      setMethod3(selectedStrategy?.method_data?.[2])
      setMethod4(selectedStrategy?.method_data?.[3])
      setCount(selectedStrategy?.method_data?.[1])
      setCount2(selectedStrategy?.method_data?.[2])
      setIncreaseValueType(selectedStrategy?.increaseValueType)
    }
  }, [is_edit, selectedStrategy])
  
  const handleClose= ()=> {
    onClose()
    setStrategyName("")
        setAmount("")
        setMethod1("")
        setMethod2("")
        setMethod3("")
        setMethod4("")
        setCount(0)
        setCount2(0)
        setIncreaseValueType(IncreaseValueType.AFTER_LOSS)
        setType(BudgetStrategyType.ALL_ORDERS)
  }

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} open={open} onClose={handleClose}>
      <Box className="mawkwr" p={2} width={downLg ? "100%" : 850} height={downLg ? "70vh" : "100vh"} display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>
        <Box>
            <Box sx={{width: "100%", display: "flex", flexDirection: "row-reverse"}}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{cursor: "pointer"}} onClick={handleClose}>
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    size={"small"}
                  >
                    {Object.entries(BudgetStrategyType)?.map(([item, key])=> (
                      <MenuItem key={key} value={item}>{BudgetStrategyTypeTitle[item]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            </Box>
            <>
              {type === BudgetStrategyType.ALL_ORDERS && (
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
              {type === BudgetStrategyType.CUSTOM_AUTOWIN && (
                <>
                  <ListItem>
                    <TextField
                      error={isErrormethod1 === true ? true : false}
                      helperText={
                        isErrormethod1 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod2 === true ? true : false}
                      helperText={
                        isErrormethod2 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod3 === true ? true : false}
                      helperText={
                        isErrormethod3 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
              {type === BudgetStrategyType.FIBO_X_STEP && (
                <>
                  <Box display={"flex"} flexDirection={downLg ? "column" : "row"}>
                    <ListItem>
                      <TextField
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                            : ""
                        }
                        label="Đặt giá trị lệnh"
                        defaultValue={"1-2-3-5-8-13-21-34-55-89-144"}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem> 
                    <ListItem>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            {increaseValueType=== IncreaseValueType.AFTER_LOSS ? "Khi thua sẽ tiến" : "Khi thắng sẽ tiến"}
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
                  <Box display={"flex"} mt={2} flexDirection={downLg ? "column" : "row"}>
                    <ListItem sx={{order: downLg ? 2 : 1}}>
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
                          value={increaseValueType}
                          onChange={(e) =>
                            setIncreaseValueType(e.target.value)
                          }
                          size="small"
                        >
                          {Object.entries(IncreaseValueType).map(([item, key])=> (
                            <MenuItem key={key} value={item}>{IncreaseValueTypeTitle[item]}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                          {increaseValueType=== IncreaseValueType.AFTER_LOSS ? "Khi thắng sẽ lùi" : "Khi thua sẽ lùi"}
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
              {type === BudgetStrategyType.MARTINGALE && (
                <>
                  <Box display={"flex"}>
                    <ListItem>
                      <TextField
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                            : ""
                        }
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
                          value={increaseValueType}
                          onChange={(e) =>
                            setIncreaseValueType(e.target.value)
                          }
                          size="small"
                        >
                          {Object.entries(IncreaseValueType)?.map(([item, key])=> (
                            <MenuItem key={key} value={item}>{IncreaseValueTypeTitle[item]}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItem>
                  </Box>
                </>
              )}
              {type === BudgetStrategyType.VICTOR_2 && (
                <>
                  <ListItem>
                    <TextField
                      error={isErrormethod1 === true ? true : false}
                      helperText={
                        isErrormethod1 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod2 === true ? true : false}
                      helperText={
                        isErrormethod2 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
                      label="Cài đặt hàng 2"
                      defaultValue={"1-2-4-8-17-35"}
                      fullWidth
                      type="text"
                      value={method2}
                      onChange={(e) => setMethod2(e.target.value)}
                    />
                  </ListItem>
                </>
              )}
              {type === BudgetStrategyType.VICTOR_3 && (
                <>
                  <ListItem>
                    <TextField
                     error={isErrormethod1 === true ? true : false}
                      helperText={
                        isErrormethod1 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod2 === true ? true : false}
                      helperText={
                        isErrormethod2 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod3 === true ? true : false}
                      helperText={
                        isErrormethod3 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
                      label="Cài đặt hàng 3"
                      defaultValue={"1-2-4-8-17-35"}
                      fullWidth
                      type="text"
                      value={method3}
                      onChange={(e) => setMethod3(e.target.value)}
                    />
                  </ListItem>
                </>
              )}
              {type === BudgetStrategyType.VICTOR_4 && (
                <>
                  <ListItem>
                    <TextField
                     error={isErrormethod1 === true ? true : false}
                      helperText={
                        isErrormethod1 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                      error={isErrormethod2 === true ? true : false}
                      helperText={
                        isErrormethod2 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
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
                     error={isErrormethod3 === true ? true : false}
                      helperText={
                        isErrormethod3 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
                      label="Cài đặt hàng 3"
                      defaultValue={"1-2-4-8-17-35"}
                      fullWidth
                      type="text"
                      value={method3}
                      onChange={(e) => setMethod3(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      error={isErrormethod4 === true ? true : false}
                      helperText={
                        isErrormethod4 === true
                          ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                          : ""
                      }
                      label="Cài đặt hàng 4"
                      defaultValue={"1-2-4-8-17-35"}
                      fullWidth
                      type="text"
                      value={method4}
                      onChange={(e) => setMethod4(e.target.value)}
                    />
                  </ListItem>
                </>
              )}
            </> 
            {/* <ListItem>
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
                </Accordion>
              </Box>
            </ListItem> */}
          </List>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1} pl={2} pr={2}>
          <Button
            variant={"outlined"}
            onClick={handleClose}
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
            disabled={disableButton()}
          >
            Lưu chiến lược
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBudgetStrategy;
