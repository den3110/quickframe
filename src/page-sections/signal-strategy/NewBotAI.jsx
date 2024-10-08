import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  useMediaQuery,
  CardContent,
  Grid,
  Badge,
  Typography,
  CardHeader,
  Stack,
  useTheme,
  FormGroup,
  Switch,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";
import { isDark } from "util/constants";
import CandleShadow from "./CandleShadow";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { showToast } from "components/toast/toast";
import DeleteIcon from "icons/DeleteIcon";
import SignalStrategyContext from "contexts/SignalStrategyContext";
import { JwtContext } from "contexts/jwtContext";
import { useTranslation } from "react-i18next";

const shapeStyles = { width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: "50%" };
const Bubble = ({
  number,
  bgcolor = "primary.main",
  textcolor = "warning.main",
}) => (
  <Box component="span" sx={{ bgcolor, ...shapeStyles, ...shapeCircleStyles }}>
    <Typography sx={{ mt: "25%", color: textcolor }}>{number}</Typography>
  </Box>
);

const NewBotAI = ({
  open,
  onClose,
  is_edit,
  selectedBot,
  setIsEdit,
  initState,
  isFromCopyPlan,
  isFromSignalStrategy
}) => {
  const { setData } = useContext(SignalStrategyContext);
  const { t } = useTranslation();
  const [goals, setGoals] = useState([
    { type: "win_streak", count: 1 },
    { type: "lose_streak", count: 1 },
  ]);
  const [isCopy, setIsCopy]= useState(false)
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { decodedData } = useContext(JwtContext);
  const theme = useTheme();
  const [idBotAI, setIdBotAI] = useState();
  const [name, setName] = useState("");
  const [openCandleShadow, setOpenCandleShadow] = useState(false);
  const [targetConditions, setTargetConditions] = useState([]);
  // const [initTargetConditions, setInitTargetConditions]= useState([])
  const [selectedCandle, setSelectedCandle] = useState();
  const [selectedBallProps, setSelectedBallProps] = useState();
  // const [conditions, setConditions] = useState([]);
  const [anchorEls, setAnchorEls] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const handleDeleteAllTargetCondition = () => {
    setTargetConditions([]);
  };
  const isDisableButton = name?.length <= 0 || targetConditions?.length <= 0;
  const handleOpenCandleShadow = (is_edit) => {
    if (is_edit === false) {
      setIsEdit(false);
    }
    setOpenCandleShadow(true);
  };
  const handleCloseCandleShadow = () => {
    setOpenCandleShadow(false);
  };

  // const handleMenuOpen = (event, index) => {
  //   const newAnchorEls = [...anchorEls];
  //   newAnchorEls[index] = event.currentTarget;
  //   setAnchorEls(newAnchorEls);
  // };

  // const handleMenuClose = (index) => {
  //   const newAnchorEls = [...anchorEls];
  //   newAnchorEls[index] = null;
  //   setAnchorEls(newAnchorEls);
  // };

  const handleGoalChange = (index, key, value) => {
    const newGoals = [...goals];
    newGoals[index][key] = Math.max(0, value); // Ensure value is not below 0
    setGoals(newGoals);
  };

  const handleIncrementGoal = (index) => {
    handleGoalChange(index, "count", goals[index].count + 1);
  };

  const handleDecrementGoal = (index) => {
    handleGoalChange(index, "count", Math.max(0, goals[index].count - 1));
  };

  // const handleEditCondition = (index) => {
  //   // Handle editing the selected condition
  //   setIsEdit(true);
  //   handleMenuClose(index);
  // };

  // const handleDeleteCondition = (index) => {
  //   const newConditions = [...targetConditions];
  //   newConditions.splice(index, 1);
  //   setTargetConditions(newConditions);
  //   handleMenuClose(index);
  // };

  const handleCreateBot = async (isDuplicate) => {
    try {
      setReadOnly(true)
      const data = {
        name,
        sources: {
          targetLoseStreak: goals.find((item) => item.type === "lose_streak")
            .count,
          targetWinStreak: goals.find((item) => item.type === "win_streak")
            .count,
          targetConditions,
        },
        is_default: isDefault,
        type: "BUBBLE_METHOD",
      };
      let response;
      if (isFromSignalStrategy) {
        response = await signalStrategyApi.userBudgetSignalUpdate(
          idBotAI,
          data
        );
      }
      else if ((initState === true && isFromCopyPlan === true) || isDuplicate=== true ) {
        response = await signalStrategyApi.userBudgetSignalCreate(data);
      } else if (initState === true) {
        response = await signalStrategyApi.userBudgetSignalUpdate(
          idBotAI,
          data
        );
      } else {
        response = await signalStrategyApi.userBudgetSignalCreate(data);
      }
      if (response?.data?.ok === true) {
        if(isFromSignalStrategy ) {
          showToast("Chỉnh sửa bot thành công", "success")
        }
        else if(isDuplicate=== true) {
          showToast("Tạo bản sao bot thành công", "success")
        }
        else if(initState === true && isFromCopyPlan === true) {
          showToast("Chỉnh sửa bot thành công", "success")
        }
        else {
          showToast(t("Create the bot successfully!"), "success")
        }
        // showToast(
        //   if(initState === true && isFromCopyPlan !== true) {
        //     return "Chỉnh sửa bot thành công"
        //   }
        //   initState === true && isFromCopyPlan !== true
        //     ? "Chỉnh sửa bot thành công"
        //     : t("Create the bot successfully!"),
        //   "success"
        // );
        if(isFromSignalStrategy) {
          setData(prev=> ([response?.data?.d, ...prev]));
        }
        else if(isDuplicate=== true) {
          setData(response?.data?.d);
          setName("");
          setTargetConditions([]);
          setGoals([
            { type: "win_streak", count: 1 },
            { type: "lose_streak", count: 1 },
          ]);
        }
        else if (initState === true && isFromCopyPlan !== true) {
          // setData(response?.data?.d)
        } else {
          setData(response?.data?.d);
          setName("");
          setTargetConditions([]);
          setGoals([
            { type: "win_streak", count: 1 },
            { type: "lose_streak", count: 1 },
          ]);
        }
        onClose();
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setReadOnly(false)
    }
  };

  // useEffect(() => {
  //   if (selectedBot) {
  //     setIdBotAI(selectedBot?._id);
  //     setName(selectedBot?.name);
  //     setGoals([
  //       { type: "win_streak", count: selectedBot?.sources?.targetWinStreak },
  //       { type: "lose_streak", count: selectedBot?.sources?.targetLoseStreak },
  //     ]);
  //     setTargetConditions(
  //       selectedBot?.sources?.targetConditions?.map((item, key) => ({
  //         ...item,
  //         index: key,
  //       }))
  //     );
  //     setInitTargetConditions( selectedBot?.sources?.targetConditions?.map((item, key) => ({
  //       ...item,
  //       index: key,
  //     }))
  //   )
  //   }
  //   // if (is_edit === false && selectedBot) {
  //   //   setName("");
  //   //   setGoals([
  //   //     { type: "win_streak", count: 0 },
  //   //     { type: "lose_streak", count: 0 },
  //   //   ]);
  //   //   setTargetConditions([]);
  //   // }
  // }, [selectedBot]);

  useEffect(() => {
    if (initState === true) {
      setIdBotAI(selectedBot?._id);
      setName(selectedBot?.name);
      setGoals([
        { type: "win_streak", count: selectedBot?.sources?.targetWinStreak },
        { type: "lose_streak", count: selectedBot?.sources?.targetLoseStreak },
      ]);
      setTargetConditions(
        selectedBot?.sources?.targetConditions?.map((item, key) => ({
          ...item ?? [],
          index: key,
        }))
      );
      setIsCopy(selectedBot?.is_copy)
      setIsDefault(selectedBot?.is_default);
    } else {
      setIdBotAI(undefined);
      setName("");
      setGoals([
        { type: "win_streak", count: 0 },
        { type: "lose_streak", count: 0 },
      ]);
      setTargetConditions([]);
      setIsDefault(false);
      setIsCopy(false)
      
    }
  }, [initState, selectedBot]);

  useEffect(() => {
    if (is_edit === true && selectedBot?.userId !== decodedData?.data?._id) {
      setReadOnly(true);
    } else if (
      is_edit === true &&
      selectedBot?.userId === decodedData?.data?._id
    ) {
      setReadOnly(false);
    } else if (is_edit !== true) {
      setReadOnly(false);
    }
  }, [is_edit, selectedBot, decodedData]);

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={{ zIndex: "" }}
    >
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          p: 2,
          position: "relative",
          height: downLg ? "70vh" : "100vh",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          overflow: "auto",
          // background: theme.palette.background.paper
        }}
      >
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={
              {
                //   position: downLg? "sticky": "",
                // top: downLg ? 0: "",
                // zIndex: downLg ? 2 : "",
                // background: downLg ? theme.palette.background.paper : ""
              }
            }
          >
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6">{t("FrmCandlePattern_title")}</Typography>
          </Box>
          <TextField
            inputProps={{ readOnly: readOnly }}
            fullWidth
            label={t("Bot Name")}
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isCopy !== true && (
            <>
              <Box>
                {goals.map((goal, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <FormControlLabel
                      onChange={() => {
                        const updateGoals = [...goals ?? []];
                        const index = updateGoals.findIndex(
                          (item) => item.type === goal.type
                        );

                        if (index !== -1) {
                          if (updateGoals[index].count <= 0) {
                            updateGoals[index] = { ...goal ?? [], count: 1 };
                          } else {
                            updateGoals[index] = { ...goal ?? [], count: 0 };
                          }

                          setGoals(updateGoals);
                        }
                      }}
                      control={
                        <Checkbox
                          disabled={readOnly}
                          checked={goal.count <= 0 ? false : true}
                        />
                      }
                      label={`${t("Skip the rest of board 5 when:")} ${
                        goal.type === "win_streak"
                          ? t("Win Streak")
                          : t("Lose Streak")
                      }`}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                      <IconButton
                        disabled={readOnly}
                        onClick={() => handleDecrementGoal(index)}
                        sx={{
                          backgroundColor: (theme) =>
                            isDark(theme) ? "rgb(50, 59, 73)" : "#f0f0f0",
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        inputProps={{ readOnly: readOnly }}
                        type="number"
                        value={goal.count}
                        onChange={(e) =>
                          handleGoalChange(
                            index,
                            "count",
                            Math.max(0, Number(e.target.value))
                          )
                        }
                        sx={{ width: 50, mx: 1 }}
                      />
                      <IconButton
                        disabled={readOnly}
                        onClick={() => handleIncrementGoal(index)}
                        sx={{
                          backgroundColor: (theme) =>
                            isDark(theme) ? "rgb(50, 59, 73)" : "#f0f0f0",
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* <Box sx={{ mb: 2 }}>
                <Button
                  onClick={() => {handleOpenCandleShadow(false);setIsNew(true)}}
                  variant="contained"
                  color="primary"
                >
                  + Thêm bóng nến
                </Button>
              </Box> */}
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
                          checked={isDefault}
                          onChange={(e) => setIsDefault(e.target.checked)}
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
              <Typography mt={2}>Chọn một bóng nến muốn thêm</Typography>
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={10} md={10}>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(81);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 81, key: 0 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 81)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 81
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={1} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(85);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 85, key: 1 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 85)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 85
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={5} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(89);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 89, key: 2 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 89)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 89
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={9} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(93);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 93, key: 3 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 93)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 93
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={13} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(97);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 97, key: 4 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 97)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 97
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={17} />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={2} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={6} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={10} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={14} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={18} />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={2} md={2}>
                        <IconButton
                          aria-label="cart"
                          disabled={readOnly}
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(83);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 83, key: 5 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 83)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 83
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={3} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(87);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 87, key: 6 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 87)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 87
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={7} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(91);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 91, key: 7 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 91)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 91
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={11} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(95);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 95, key: 8 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 95)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 95
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={15} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            // addBubbleOption(1);
                            setSelectedBallProps(99);
                            handleOpenCandleShadow();
                            setIsNew(true);
                            setIsEdit(false);
                            setSelectedCandle({ betIndex: 99, key: 9 });
                          }}
                        >
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                            badgeContent={
                              targetConditions?.filter((a) => a.betIndex === 99)
                                .length > 0
                                ? targetConditions?.filter(
                                    (a) => a.betIndex === 99
                                  )?.length
                                : "0"
                            }
                          >
                            <Bubble number={19} />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={4} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={8} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={12} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={16} />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <IconButton disabled aria-label="cart">
                          <Badge
                            color="warning"
                            sx={{
                              "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "orange",
                              },
                            }}
                            overlap="circular"
                          >
                            <Bubble bgcolor="#36454F" number={20} />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent sx={{ padding: "0" }}>
                <CardHeader
                  sx={{ padding: 0 }}
                  titleTypographyProps={{ variant: "body1" }}
                  title={t("conditions_added")}
                  action={
                    <Stack spacing={1} direction="row">
                      <Button
                        disabled={readOnly}
                        startIcon={<DeleteIcon icon={"entypo:trash"} />}
                        onClick={handleDeleteAllTargetCondition}
                        size="small"
                        variant="contained"
                        color="error"
                      >
                        Xoá tất cả
                      </Button>
                    </Stack>
                  }
                />
                <Grid container spacing={1}>
                  {console.log("target conditions", targetConditions)}
                  {targetConditions?.map((value, index) => {
                    const current = { color: "info.main", textcolor: "black" };

                    if (value.betType === "UP") {
                      current.color = "success.main";
                      current.textcolor = "black";
                    }
                    if (value.betType === "DOWN") {
                      current.color = "error.main";
                      current.textcolor = "white";
                    }

                    return (
                      <Grid item xs={3} md={1} key={index}>
                        <IconButton
                          disabled={readOnly}
                          aria-label="cart"
                          onClick={() => {
                            setSelectedCandle({ ...value ?? [], key: index });
                            handleOpenCandleShadow();
                            setIsEdit(true);
                            // setTargetConditions(initTargetConditions)
                          }}
                        >
                          <Badge
                            color="primary"
                            overlap="circular"
                            badgeContent={value.conditions.length}
                          >
                            <Bubble
                              number={value.betIndex - 80}
                              bgcolor={current.color}
                              textcolor={current.textcolor}
                            />
                          </Badge>
                        </IconButton>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
              {/* <List>
                {targetConditions?.length > 0 && targetConditions.map((condition, index) => (
                  <ListItem key={index} sx={{ marginBottom: 1 }}>
                    <ListItemText
                      primary={`Bóng ${condition.betIndex } | Điều kiện: ${
                        condition.conditions?.length
                      } | Lệnh : ${condition.betType === "UP" ? "🟢" : "🔴"}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        sx={{
                          backgroundColor: (theme) =>
                            isDark(theme) ? "rgb(50, 59, 73)" : "#f0f0f0",
                          mr: 1,
                        }}
                        onClick={() => {
                          setSelectedCandle({ ...condition, key: index });
                          handleOpenCandleShadow()
                          setIsEdit(true)
                          // setTargetConditions(initTargetConditions)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        sx={{
                          backgroundColor: (theme) =>
                            isDark(theme) ? "rgb(50, 59, 73)" : "#f0f0f0",
                        }}
                        onClick={(event) => handleMenuOpen(event, index)}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEls[index]}
                        open={Boolean(anchorEls[index])}
                        onClose={() => handleMenuClose(index)}
                      >
                        <MenuItem onClick={() => handleEditCondition(index)}>
                          <Edit sx={{ marginRight: 1 }} /> Sửa
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteCondition(index)}>
                          <CloseIcon sx={{ marginRight: 1 }} /> Xoá
                        </MenuItem>
                      </Menu>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List> */}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            gap: 1,
            position: downLg ? "sticky" : "",
            bottom: downLg ? 0 : "",
            zIndex: downLg ? 2 : "",
            background: downLg ? theme.palette.background.paper : "",
          }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ padding: "10px" }}>
            {t("Close")}
          </Button>
          <Button
            onClick={handleCreateBot}
            disabled={
              (isDisableButton !== true && readOnly !== true ? false : true)
            }
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "10px" }}
          >
            {initState === true ? t("Save Bot") : t("Create Bot")}
          </Button>
          {
            initState === true && 
          <Button
            onClick={()=> handleCreateBot(true)}
            disabled={
              isDisableButton !== true && readOnly !== true ? false : true
            }
            fullWidth
            variant="contained"
            color="warning"
            sx={{ padding: "10px" }}
          >
            {t("Tạo bản mới")}
          </Button>
          }
        </Box>
      </Box>
      {isCopy !== true && (
        <CandleShadow
          open={openCandleShadow}
          onClose={handleCloseCandleShadow}
          setTargetConditions={setTargetConditions}
          targetConditions={targetConditions}
          selectedCandle={selectedCandle}
          is_edit={is_edit}
          is_new={isNew}
          setIsNew={setIsNew}
          setIsEdit={setIsEdit}
          initState={initState}
          selectedBallProps={selectedBallProps}
        />
      )}
    </Drawer>
  );
};

export default NewBotAI;
