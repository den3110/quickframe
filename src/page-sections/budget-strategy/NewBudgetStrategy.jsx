import React, { useCallback, useContext, useEffect, useState } from "react";
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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { isDark } from "util/constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import {
  BudgetStrategyType,
  BudgetStrategyTypeTitle,
} from "type/BudgetStrategyType";
import {
  IncreaseValueType,
  IncreaseValueTypeTitle,
} from "type/IncreaseValueType";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";
import { JwtContext } from "contexts/jwtContext";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const NewBudgetStrategy = ({
  open,
  onClose,
  is_edit,
  selectedStrategy,
  setData,
  data: dataProps,
  isFromCopyPlan,
  isFromBudgetStrategy,
  setChange,
  isFromPortfolios,
  setIsEdit
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { decodedData } = useContext(JwtContext);
  const [idBudegetStrategy, setIdBudgetStrategy] = useState();
  const [strategyName, setStrategyName] = useState("");
  // const [method, setMethod] = useState("All orders");
  const [increaseValueType, setIncreaseValueType] = useState(
    IncreaseValueType.AFTER_LOSS
  );
  const [type, setType] = useState(BudgetStrategyType.ALL_ORDERS);
  const {t }= useTranslation()
  const [amount, setAmount] = useState("1");
  const [method1, setMethod1] = useState("1-1-2-6-4-3");
  const [method2, setMethod2] = useState("1-2-4-8-17-35");
  const [method3, setMethod3] = useState("2-3-4-5-6-1");
  const [method4, setMethod4] = useState("2-3-4-5-6-1");
  const [readOnly, setReadOnly] = useState(false);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [seeMore, setSeeMore] = useState(false);
  const [disableButton, setDisableButton] = useState();
  const [isDefaultStrategy, setIsDefaultStrategy] = useState(false);

  const handleIncrement = () => {
    setCount(parseInt(count) + 1);
  };

  const handleDecrement = () => {
    setCount(parseInt(count) > 0 ? parseInt(count) - 1 : 0);
  };

  const handleIncrement2 = () => {
    setCount2(parseInt(count2) + 1);
  };

  const handleDecrement2 = () => {
    setCount2(parseInt(count2) > 0 ? parseInt(count2) - 1 : 0);
  };

  const validateInput = (value = "") => {
    const pattern = /^(\d+(\.\d+)?)(-(\d+(\.\d+)?))*$/;
    if (value?.length > 0 && value?.match(pattern)) {
      return false;
    }
    return true;
  };

  const isErrorInputAmount =
    parseFloat(amount) < 1 || parseFloat(amount) > 1000000;
  const isErrormethod1 = validateInput(method1 || "");
  const isErrormethod2 = validateInput(method2 || "");
  const isErrormethod3 = validateInput(method3 || "");
  const isErrormethod4 = validateInput(method4 || "");
  const handleSave = async (isDuplicate) => {
    let data;
    let methodData;
    let response;
    switch (type) {
      case BudgetStrategyType.ALL_ORDERS:
        methodData = [amount];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.CUSTOM_AUTOWIN:
        methodData = [method1, method2, method3];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.FIBO_X_STEP:
        methodData = [method1, count, count2];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.MARTINGALE:
        methodData = [method1];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.VICTOR_2:
        methodData = [method1, method2];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.VICTOR_3:
        methodData = [method1, method2, method3];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      case BudgetStrategyType.VICTOR_4:
        methodData = [method1, method2, method3, method4];
        data = {
          name: strategyName,
          method_data: methodData,
          increaseValueType,
          type,
          is_default: isDefaultStrategy,
        };
        break;
      default:
        break;
    }
    try {
      setDisableButton(true)
      if(isFromBudgetStrategy) {
        response = await budgetStrategyApi.userBudgetStrategyUpdate(
          idBudegetStrategy,
          data
        );
      }
      else if(isFromPortfolios) {
        response = await budgetStrategyApi.userBudgetStrategyUpdate(
          idBudegetStrategy,
          data
        );
      }
      else if (is_edit === true && isFromCopyPlan!== true && isDuplicate!== true) {
        response = await budgetStrategyApi.userBudgetStrategyUpdate(
          idBudegetStrategy,
          data
        );
      } else {
        response = await budgetStrategyApi.userBudgetStrategyCreate(data);
      }
      if (response?.data?.ok === true) {
        if(isFromBudgetStrategy) {
          // showToast
          showToast(t("Update Strategy successfully!"), "success");
          const dataTemp = dataProps;
          setData(prev=> ([response?.data?.d, ...prev]));
          onClose()
        }
        else if(isFromPortfolios) {
          showToast(t("Update Strategy successfully!"), "success");
          const dataTemp = dataProps;
          const index = dataTemp?.findIndex(
            (item) => item?._id === selectedStrategy?._id
          );
          // console.log(dataProps)
          // console.log("index", index)
          dataTemp[index] = { ...selectedStrategy, ...data };
          setData(dataTemp);
          // setChange(prev=> !prev)
          setIsEdit(false)
          onClose();
        }
        else if (is_edit !== true || (is_edit=== true && isFromCopyPlan=== true) || isDuplicate=== true) {
          setData(response?.data?.d);
          showToast(t("Create Strategy successfully!"), "success");
          setStrategyName("");
          setAmount("1");
          setIncreaseValueType(IncreaseValueType.AFTER_LOSS);
          setType(BudgetStrategyType.ALL_ORDERS);
          setMethod1("1-1-2-6-4-3");
          setMethod2("1-2-4-8-17-35");
          setMethod3("2-3-4-5-6-1");
          setMethod4("2-3-4-5-6-1");
          setCount(0);
          setCount2(0);
          onClose();
        } else if (is_edit === true && isFromCopyPlan!== true) {
          showToast(t("Update Strategy successfully!"), "success");
          const dataTemp = dataProps;
          const index = dataTemp?.findIndex(
            (item) => item?._id === selectedStrategy?._id
          );
          // console.log("index", index)
          dataTemp[index] = { ...selectedStrategy, ...data };
          setData(dataTemp);
          // setChange(prev=> !prev)
          onClose();
        }
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      console.log(error)
      showToast(error?.response?.data?.m);
    }
    finally {
      setDisableButton(false)
    }
  };

  const handleDisable = useCallback(() => {
    let disable;
    switch (type) {
      case BudgetStrategyType.ALL_ORDERS:
        disable =
          strategyName?.length <= 0 ||
          amount?.length <= 0 ||
          parseInt(amount) > 10000000;
        break;
      case BudgetStrategyType.CUSTOM_AUTOWIN:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          method2?.length <= 0 ||
          method3?.length <= 0 ||
          isErrormethod1 === true ||
          isErrormethod2 === true ||
          isErrormethod3 === true;

        break;
      case BudgetStrategyType.FIBO_X_STEP:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          isErrormethod1 === true;
        break;
      case BudgetStrategyType.MARTINGALE:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          isErrormethod1 === true;

        break;
      case BudgetStrategyType.VICTOR_2:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          method2?.length <= 0 ||
          isErrormethod1 === true ||
          isErrormethod2 === true;

        break;
      case BudgetStrategyType.VICTOR_3:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          method2?.length <= 0 ||
          method3?.length <= 0 ||
          isErrormethod1 === true ||
          isErrormethod2 === true ||
          isErrormethod3 === true;

        break;
      case BudgetStrategyType.VICTOR_4:
        disable =
          strategyName?.length <= 0 ||
          method1?.length <= 0 ||
          method2?.length <= 0 ||
          method3?.length <= 0 ||
          method4?.length <= 0 ||
          isErrormethod1 === true ||
          isErrormethod2 === true ||
          isErrormethod3 === true ||
          isErrormethod4 === true;
        break;
      default:
        disable = false;
        break;
    }
    setDisableButton(disable);
  }, [
    amount,
    isErrormethod1,
    isErrormethod2,
    isErrormethod3,
    isErrormethod4,
    method1?.length,
    method2?.length,
    method3?.length,
    method4?.length,
    strategyName?.length,
    type,
  ]);

  useEffect(() => {
    (() => {
      if (
        is_edit === true &&
        decodedData?.data?._id !== selectedStrategy?.userId
      ) {
        setDisableButton(true);
        setReadOnly(true);
        return;
      } else if (
        is_edit === true &&
        decodedData?.data?._id === selectedStrategy?.userId
      ) {
        setDisableButton(false);
        setReadOnly(false);
        return;
      } else {
        setDisableButton(false);
        setReadOnly(false);
      }
      handleDisable();
    })();
  }, [is_edit, decodedData, selectedStrategy, handleDisable]);

  useEffect(() => {
    if (is_edit === true) {
      setIdBudgetStrategy(selectedStrategy?._id);
      setStrategyName(selectedStrategy?.name);
      setType(selectedStrategy?.type);
      setAmount(selectedStrategy?.method_data?.[0]);
      setMethod1(selectedStrategy?.method_data?.[0]);
      setMethod2(selectedStrategy?.method_data?.[1]);
      setMethod3(selectedStrategy?.method_data?.[2]);
      setMethod4(selectedStrategy?.method_data?.[3]);
      setCount(selectedStrategy?.method_data?.[1]);
      setCount2(selectedStrategy?.method_data?.[2]);
      setIsDefaultStrategy(selectedStrategy?.is_default);
      setIncreaseValueType(selectedStrategy?.increaseValueType);
    }
  }, [is_edit, selectedStrategy]);

  useEffect(() => {
    if (isFromPortfolios === true) {
      setIdBudgetStrategy(selectedStrategy?._id);
      setStrategyName(selectedStrategy?.name);
      setType(selectedStrategy?.type);
      setAmount(selectedStrategy?.method_data?.[0]);
      setMethod1(selectedStrategy?.method_data?.[0]);
      setMethod2(selectedStrategy?.method_data?.[1]);
      setMethod3(selectedStrategy?.method_data?.[2]);
      setMethod4(selectedStrategy?.method_data?.[3]);
      setCount(selectedStrategy?.method_data?.[1]);
      setCount2(selectedStrategy?.method_data?.[2]);
      setIsDefaultStrategy(selectedStrategy?.is_default);
      setIncreaseValueType(selectedStrategy?.increaseValueType);
    }
  }, [isFromPortfolios, inView, selectedStrategy]);

  const handleClose = () => {
    onClose();
    setStrategyName("");
    setAmount("1");
    setMethod1("1-1-2-6-4-3");
    setMethod2("1-2-4-8-17-35");
    setMethod3("2-3-4-5-6-1");
    setMethod4("2-3-4-5-6-1");
    setCount(0);
    setCount2(0);
    setIsDefaultStrategy(false);
    setIncreaseValueType(IncreaseValueType.AFTER_LOSS);
    setType(BudgetStrategyType.ALL_ORDERS);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
    setSeeMore(false);
    if (is_edit === true && type !== e.target.value) {
      switch (e.target.value) {
        case BudgetStrategyType.ALL_ORDERS:
          setAmount(1);
          break;
        case BudgetStrategyType.CUSTOM_AUTOWIN:
          setMethod1("1-1-2-6-4-3");
          setMethod2("1-2-4-8-17-35");
          setMethod3("2-3-4-5-6-1");
          break;
        case BudgetStrategyType.FIBO_X_STEP:
          setMethod1("1-2-3-5-8-13-21-34-55-89-144");
          setCount(0);
          setCount2(0);
          setIncreaseValueType(IncreaseValueType.AFTER_LOSS);
          break;
        case BudgetStrategyType.MARTINGALE:
          setMethod1("1-2-4-8-17-35");
          setIncreaseValueType(IncreaseValueType.AFTER_LOSS);
          break;
        case BudgetStrategyType.VICTOR_2:
          setMethod1("1-1-2-2-3-4-5-7-10-13-18-24-32-44-59-80-108-146-197-271");
          setMethod2(
            "1-2-4-4-6-8-10-14-20-26-36-48-64-88-118-160-216-292-394-542"
          );
          break;
        case BudgetStrategyType.VICTOR_3:
          setMethod1("1-1-1-1-1-1-1.5-2-2-2-2.5-3-3.5-4-4.5-5.4-6-7-8-9.5-11");
          setMethod2(
            "1-2-2-2-2-2-3-3.9-3.9-3.9-4.875-5.85-6.825-7.8-8.775-10.53-11.7-13.65-15.6-18.525-21.45"
          );
          setMethod3(
            "1-4-4-4-4-4-6-7.605-7.605-7.605-9.50625-11.4075-13.30875-15.21-17.11125-20.5335-22.815-26.6175-30.42-36.12375-41.8275"
          );
          break;
        case BudgetStrategyType.VICTOR_4:
          setMethod1(
            "1-1-1-1-1-1-1-1-1-1-1-1-1-1-1.23-1.25-1.28-1.3-1.47-1.6-1.74-1.88-2.04-2.22"
          );
          setMethod2(
            "1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-2.28-2.32-2.36-2.41-2.73-2.96-3.21-3.48-3.78"
          );
          setMethod3(
            "3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-4.22-4.29-4.37-4.45-5.04-5.47-5.94-6.44-6.99-7.59"
          );
          setMethod4(
            "7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.81-7.94-8.08-8.24-9.33-10.12-10.99-11.92-12.93-14.03"
          );
          break;
        default:
          break;
      }
    }
    if (is_edit !== true) {
      switch (e.target.value) {
        case BudgetStrategyType.ALL_ORDERS:
          setAmount(1);
          break;
        case BudgetStrategyType.CUSTOM_AUTOWIN:
          setMethod1("1-1-2-6-4-3");
          setMethod2("1-2-4-8-17-35");
          setMethod3("2-3-4-5-6-1");
          break;
        case BudgetStrategyType.FIBO_X_STEP:
          setMethod1("1-2-3-5-8-13-21-34-55-89-144");
          setCount(0);
          setCount2(0);
          break;
        case BudgetStrategyType.MARTINGALE:
          // console.log(2222);
          setMethod1("1-2-4-8-17-35");
          setIncreaseValueType(IncreaseValueType.AFTER_LOSS);
          break;
        case BudgetStrategyType.VICTOR_2:
          setMethod1("1-1-2-2-3-4-5-7-10-13-18-24-32-44-59-80-108-146-197-271");
          setMethod2(
            "1-2-4-4-6-8-10-14-20-26-36-48-64-88-118-160-216-292-394-542"
          );
          break;
        case BudgetStrategyType.VICTOR_3:
          setMethod1("1-1-1-1-1-1-1.5-2-2-2-2.5-3-3.5-4-4.5-5.4-6-7-8-9.5-11");
          setMethod2(
            "1-2-2-2-2-2-3-3.9-3.9-3.9-4.875-5.85-6.825-7.8-8.775-10.53-11.7-13.65-15.6-18.525-21.45"
          );
          setMethod3(
            "1-4-4-4-4-4-6-7.605-7.605-7.605-9.50625-11.4075-13.30875-15.21-17.11125-20.5335-22.815-26.6175-30.42-36.12375-41.8275"
          );
          break;
        case BudgetStrategyType.VICTOR_4:
          setMethod1(
            "1-1-1-1-1-1-1-1-1-1-1-1-1-1-1.23-1.25-1.28-1.3-1.47-1.6-1.74-1.88-2.04-2.22"
          );
          setMethod2(
            "1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-2.28-2.32-2.36-2.41-2.73-2.96-3.21-3.48-3.78"
          );
          setMethod3(
            "3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-4.22-4.29-4.37-4.45-5.04-5.47-5.94-6.44-6.99-7.59"
          );
          setMethod4(
            "7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.81-7.94-8.08-8.24-9.33-10.12-10.99-11.92-12.93-14.03"
          );
          break;
        default:
          break;
      }
    }
  };

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={handleClose}
      sx={{ zIndex: "" }}
    >
      <Box
        ref={ref}
        className="mawkwr"
        p={2}
        width={downLg ? "100%" : 850}
        height={downLg ? "70vh" : "100vh"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Typography variant="h6">{t("Set up your strategy")}</Typography>
          <List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItem sx={{ width: "100%" }}>
                <TextField
                  inputProps={{ readOnly: readOnly }}
                  label={t("Strategy name")}
                  fullWidth
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                />
              </ListItem>
              {
                selectedStrategy?.is_copy !== true &&
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        background: (theme) =>
                          isDark(theme) ? "#1f2937" : "white",
                      }}
                    >
                      {t("Budget method")}
                    </InputLabel>
                    <Select
                      disabled={readOnly}
                      value={type}
                      onChange={(e) => handleSetType(e)}
                      size={"small"}
                    >
                      {Object.entries(BudgetStrategyType)?.map(([item, key]) => (
                        <MenuItem key={key} value={item}>
                          {BudgetStrategyTypeTitle[item]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
              }
            </Box>
            {selectedStrategy?.is_copy !== true &&
              <>
                {type === BudgetStrategyType.ALL_ORDERS && (
                  <>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrorInputAmount === true ? true : false}
                        helperText={
                          isErrorInputAmount === true
                            ? t("The input value cannot be greater than 1000000 or less than 1")
                            : ""
                        }
                        label={t("Setup your trade amount")}
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
                        {t("The bet multiplier for each order is fixed and does not change")}
                      </Typography>
                    </ListItem>
                  </>
                )}
                {type === BudgetStrategyType.CUSTOM_AUTOWIN && (
                  <>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 1`}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod2 === true ? true : false}
                        helperText={
                          isErrormethod2 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 2`}
                        defaultValue={"1-2-4-8-17-35"}
                        fullWidth
                        type="text"
                        value={method2}
                        onChange={(e) => setMethod2(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod3 === true ? true : false}
                        helperText={
                          isErrormethod3 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 3`}
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
                    <Box
                      display={"flex"}
                      flexDirection={downLg ? "column" : "row"}
                    >
                      <ListItem>
                        <TextField
                          inputProps={{ readOnly: readOnly }}
                          error={isErrormethod1 === true ? true : false}
                          helperText={
                            isErrormethod1 === true
                              ? t("Value is invalid!")
                              : ""
                          }
                          label={t("Set order value")}
                          fullWidth
                          type="text"
                          value={method1}
                          onChange={(e) => setMethod1(e.target.value)}
                        />
                      </ListItem>
                      <ListItem>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" sx={{ marginRight: 2 }}>
                            {increaseValueType === IncreaseValueType.AFTER_LOSS
                              ? t("Khi thua sẽ tiến ")
                              : t("Khi thắng sẽ tiến ")}
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
                    <Box
                      display={"flex"}
                      mt={2}
                      flexDirection={downLg ? "column" : "row"}
                    >
                      <ListItem sx={{ order: downLg ? 2 : 1 }}>
                        <FormControl fullWidth>
                          <InputLabel
                            sx={{
                              background: (theme) =>
                                isDark(theme) ? "#1f2937" : "white",
                            }}
                          >
                            {t("Tuỳ chọn nâng cao")}
                          </InputLabel>
                          <Select
                            value={increaseValueType}
                            onChange={(e) => setIncreaseValueType(e.target.value)}
                            size="small"
                            disabled={readOnly}
                          >
                            {Object.entries(IncreaseValueType)
                              .slice(0, 2)
                              .map(([item, key]) => (
                                <MenuItem key={key} value={item}>
                                  {t(IncreaseValueTypeTitle[item])}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </ListItem>
                      <ListItem sx={{ order: downLg ? 1 : 2 }}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" sx={{ marginRight: 2 }}>
                            {increaseValueType === IncreaseValueType.AFTER_LOSS
                              ? t("Khi thắng sẽ lùi ")
                              : t("Khi thua sẽ lùi ")}
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
                {/* {console.log("method 1", method1)} */}
                {type === BudgetStrategyType.MARTINGALE && (
                  <>
                    <Box  display={"flex"}
                      flexDirection={downLg ? "column" : "row"}>
                      <ListItem>
                        <TextField
                          inputProps={{ readOnly: readOnly }}
                          error={isErrormethod1 === true ? true : false}
                          helperText={
                            isErrormethod1 === true
                              ? "Vui lòng chỉ nhập giá trị số, ký tự đặc biệt hoặc chữ cái sẽ không hợp lệ."
                              : ""
                          }
                          label={t("Set order value")}
                          fullWidth
                          type="text"
                          value={method1}
                          onChange={(e) => setMethod1(e.target.value)}
                        />
                      </ListItem>
                      <ListItem sx={{ width: "100%", overflow: "hidden" }}>
                        <FormControl fullWidth>
                          <InputLabel
                            sx={{
                              background: (theme) =>
                                isDark(theme) ? "#1f2937" : "white",
                            }}
                          >
                            {t("option")}
                          </InputLabel>
                          <Select
                            disabled={readOnly}
                            value={increaseValueType}
                            onChange={(e) => setIncreaseValueType(e.target.value)}
                            size="small"
                          >
                            {Object.entries(IncreaseValueType)?.map(
                              ([item, key]) => (
                                <MenuItem key={key} value={item}>
                                  {t(IncreaseValueTypeTitle[item])}
                                </MenuItem>
                              )
                            )}
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
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 1`}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod2 === true ? true : false}
                        helperText={
                          isErrormethod2 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 2`}
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
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 1`}
                        defaultValue={"1-1-2-6-4-3"}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod2 === true ? true : false}
                        helperText={
                          isErrormethod2 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 2`}
                        defaultValue={"1-2-4-8-17-35"}
                        fullWidth
                        type="text"
                        value={method2}
                        onChange={(e) => setMethod2(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod3 === true ? true : false}
                        helperText={
                          isErrormethod3 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 3`}
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
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod1 === true ? true : false}
                        helperText={
                          isErrormethod1 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 1`}
                        defaultValue={"1-1-2-6-4-3"}
                        fullWidth
                        type="text"
                        value={method1}
                        onChange={(e) => setMethod1(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod2 === true ? true : false}
                        helperText={
                          isErrormethod2 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 2`}
                        defaultValue={"1-2-4-8-17-35"}
                        fullWidth
                        type="text"
                        value={method2}
                        onChange={(e) => setMethod2(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod3 === true ? true : false}
                        helperText={
                          isErrormethod3 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 3`}
                        defaultValue={"1-2-4-8-17-35"}
                        fullWidth
                        type="text"
                        value={method3}
                        onChange={(e) => setMethod3(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        error={isErrormethod4 === true ? true : false}
                        helperText={
                          isErrormethod4 === true
                            ? t("Value is invalid!")
                            : ""
                        }
                        label={`${t("Set row")} 4`}
                        defaultValue={"1-2-4-8-17-35"}
                        fullWidth
                        type="text"
                        value={method4}
                        onChange={(e) => setMethod4(e.target.value)}
                      />
                    </ListItem>
                  </>
                )}
                <ListItem>
                  {decodedData?.data?.levelStaff >= 3 && (
                    <Box sx={{}}>
                      <Typography fontSize={14} variant="subtitle1">
                        {t("Usage Strategy")}
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled={readOnly}
                              checked={isDefaultStrategy}
                              onChange={(e) =>
                                setIsDefaultStrategy(e.target.checked)
                              }
                              name="gilad"
                            />
                          }
                          label=<Typography fontSize={14} variant="subtitle1">
                            {t("Default Strategy")}
                          </Typography>
                        />
                      </FormGroup>
                    </Box>
                  )}
                </ListItem>
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
                {type !== BudgetStrategyType.ALL_ORDERS &&
                  type !== BudgetStrategyType.FIBO_X_STEP && (
                    <ListItem>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Typography fontSize={14}>
                          {t("Giải thích ngắn gọn về ")} {t("Strategy")} {BudgetStrategyTypeTitle[type]}
                        </Typography>
                        <Typography
                          color="primary"
                          fontWeight={600}
                          sx={{ cursor: "pointer" }}
                          fontSize={14}
                          onClick={() => {
                            setSeeMore((prev) => !prev);
                          }}
                        >
                          {seeMore === true ? t("Hide") : t("Learn more")}
                        </Typography>
                      </Box>
                    </ListItem>
                  )}
                {seeMore === true && (
                  <>
                    <ListItem>
                      {type === BudgetStrategyType.CUSTOM_AUTOWIN && (
                        <Box>
                          <Box>
                            <Typography fontSize={14}>{t("There will be 3 sequences")}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("autowin_des_1")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("autowin_des_2")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {type === BudgetStrategyType.MARTINGALE && (
                        <Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("explain_martingale_increase_after_loss")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("Value chain (entry amount):")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("- String format: x-y-z-…")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("- Unlimited number of orders")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("- Default value: 1-2-4-8-17-35")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {type === BudgetStrategyType.VICTOR_2 && (
                        <Box>
                          <Box>
                            <Typography fontSize={14}>{t("There will be 2 sequences")}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("If you lose on sequence 1")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("If you win in sequence 2")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {type === BudgetStrategyType.VICTOR_3 && (
                        <Box>
                          <Box>
                            <Typography fontSize={14}>{t("There will be 3 sequences")}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("victor3_des_1")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("victor3_des_2")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("victor3_des_3")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("victor3_des_4")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {type === BudgetStrategyType.VICTOR_4 && (
                        <Box>
                          <Box>
                            <Typography fontSize={14}>{t("There will be 4 sequences")}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                              {t("victor4_des_1")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                            {t("victor4_des_2")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                            {t("victor4_des_3")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={14}>
                            {t("victor4_des_4")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </ListItem>
                  </>
                )}
              </>
            }
          </List>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1} pl={2} pr={2}>
          <Button
            variant={"outlined"}
            onClick={handleClose}
            sx={{ padding: "10px 16px" }}
          >
            {t("close")}
          </Button>
          <Button
            sx={{ padding: "10px 16px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={disableButton}
          >
            {t("Save Strategy")}
          </Button>
          {is_edit=== true && 
            <Button
              sx={{ padding: "10px 16px" }}
              fullWidth
              variant="contained"
              color="warning"
              onClick={()=> handleSave(true)}
              disabled={disableButton}
            >
              {t("Tạo bản mới")}
            </Button>
          }
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBudgetStrategy;
