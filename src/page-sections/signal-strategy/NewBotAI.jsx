import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Menu,
  useMediaQuery,
} from "@mui/material";
import { Add, Remove, Edit, MoreVert, Close } from "@mui/icons-material";
import { isDark } from "utils/constants";
import CandleShadow from "./CandleShadow";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { showToast } from "components/toast/toast";

const NewBotAI = ({ open, onClose, is_edit, selectedBot, setIsEdit, initState }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [idBotAI, setIdBotAI] = useState();
  const [name, setName] = useState("");
  const [openCandleShadow, setOpenCandleShadow] = useState(false);
  const [targetConditions, setTargetConditions] = useState([]);
  // const [initTargetConditions, setInitTargetConditions]= useState([])
  const [selectedCandle, setSelectedCandle] = useState();
  const [anchorEls, setAnchorEls] = useState([]);
  const [goals, setGoals] = useState([
    { type: "win_streak", count: 1 },
    { type: "lose_streak", count: 1 },
  ]);
  const [isNew, setIsNew]= useState(false)
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

  const handleMenuOpen = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

 

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

  const handleEditCondition = (index) => {
    // Handle editing the selected condition
    setIsEdit(true)
    handleMenuClose(index);
  };

  const handleDeleteCondition = (index) => {
    const newConditions = [...targetConditions];
    newConditions.splice(index, 1);
    setTargetConditions(newConditions);
    handleMenuClose(index);
  };

  const handleCreateBot = async () => {
    try {
      const data = {
        name,
        sources: {
          targetLoseStreak: goals.find((item) => item.type === "lose_streak")
            .count,
          targetWinStreak: goals.find((item) => item.type === "win_streak")
            .count,
          targetConditions,
        },
        type: "BUBBLE_METHOD",
      };
      let response;
      if (initState === true) {
        response = await signalStrategyApi.userBudgetSignalUpdate(
          idBotAI,
          data
        );
      } else {
        response = await signalStrategyApi.userBudgetSignalCreate(data);
      }
      if (response?.data?.ok === true) {
        showToast(
          initState === true ? "Chỉnh sửa bot thành công" : "Tạo bot thành công",
          "success"
        );
        if(initState=== true) {

        }
        else {
          setName("");
          setTargetConditions([]);
          setGoals([
            { type: "win_streak", count: 1 },
            { type: "lose_streak", count: 1 },
          ]);
        }
        onClose();
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m);
      }
    } catch (error) {
      showToast(error?.response?.data?.m);
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

  useEffect(()=> {
    if(initState=== true) {
      setIdBotAI(selectedBot?._id);
      setName(selectedBot?.name);
      setGoals([
        { type: "win_streak", count: selectedBot?.sources?.targetWinStreak },
        { type: "lose_streak", count: selectedBot?.sources?.targetLoseStreak },
      ]);
      setTargetConditions(
        selectedBot?.sources?.targetConditions?.map((item, key) => ({
          ...item,
          index: key,
        }))
      );
    }
    else {
      setIdBotAI(undefined);
      setName("")
      setGoals([
        { type: "win_streak", count: 0 },
        { type: "lose_streak", count: 0 },
      ]);
      setTargetConditions([])
    }
  }, [initState, selectedBot]) 

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} open={open} onClose={onClose}>
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
        }}
      >
        <Box>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <Close />
            </IconButton>
            <h2>Thiết lập mô hình nền của bạn</h2>
          </Box>
          <TextField
            fullWidth
            label="Tên bot"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Box>
            {goals.map((goal, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <FormControlLabel
                  control={<Checkbox checked={goal.count <= 0 ? false : true} />}
                  label={`Đạt mục tiêu bằng 5 sau khi `}
                />
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <Select
                    value={goal.type}
                    onChange={(e) =>
                      handleGoalChange(index, "type", e.target.value)
                    }
                    sx={{ width: 150 }}
                  >
                    <MenuItem value="win_streak">Chuỗi thắng</MenuItem>
                    <MenuItem value="lose_streak">Chuỗi thua</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                  <IconButton
                     onClick={() => handleDecrementGoal(index)}
                    sx={{
                      backgroundColor: (theme) =>
                        isDark(theme) ? "rgb(50, 59, 73)" : "#f0f0f0",
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    type="number"
                    value={goal.count}
                    onChange={(e) => handleGoalChange(index, "count", Math.max(0, Number(e.target.value)))}
                    sx={{ width: 50, mx: 1 }}
                  />
                  <IconButton
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
          <Box sx={{ mb: 2 }}>
            <Button
              onClick={() => {handleOpenCandleShadow(false);setIsNew(true)}}
              variant="contained"
              color="primary"
            >
              + Thêm bóng nến
            </Button>
          </Box>
          <List>
            {targetConditions?.length > 0 && targetConditions.map((condition, index) => (
              <ListItem key={index} sx={{ marginBottom: 1 }}>
                <ListItemText
                  primary={`Bóng ${condition.betIndex - 80} | Điều kiện: ${
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
                      handleOpenCandleShadow();
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
          </List>
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
            onClick={handleCreateBot}
            disabled={isDisableButton}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "10px" }}
          >
            {initState === true ? "Lưu Bot" : "Tạo bot"}
          </Button>
        </Box>
      </Box>
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
      />
      
    </Drawer>
  );
};

export default NewBotAI;
