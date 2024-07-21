import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Popover,
  MenuItem,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ActionBotType,
  ActionBotTypeMessageSucces,
  ActionBotTypeStatus,
} from "type/ActionBotType";
import portfolioApi from "api/portfolios/portfolioApi";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "components/toast/toast";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Replay } from "@mui/icons-material";
// import useQuery from "hooks/useQuery";
import AuthContext from "contexts/AuthContext";

const MenuComponent = ({ dataStat, setDataStat }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isRunning, setIsRunning] = useState();
  const [isPause, setIsPause]= useState()
  const {selectedLinkAccount }= useContext(AuthContext)

  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSubMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const handleChangeIsRunning = async (action) => {
    try {
      const payload = {
        action: ActionBotType[action],
        linkAccountId: selectedLinkAccount
      };
      // const { data, error, loading, refetch }= useQuery()
      await portfolioApi.userBotAction(id, payload);
      // setData()
      // setIsRunning(ActionBotTypeStatus[action]);
      setIsPause(!isPause)
      showToast(ActionBotTypeMessageSucces[action], "success");
      setDataStat({...dataStat, lastData: {...dataStat.lastData, isPause: !isPause}})
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsRunning(dataStat?.isRunning);
    setIsPause(dataStat?.lastData?.isPause);
  }, [dataStat]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" size={"large"} onClick={handleBack}>
          Quay lại
        </Button>
        <Box>
        {(isRunning === false) && (
            <Button
              sx={{
                "& .MuiButton-startIcon": {
                  margin: downLg ? 0 : "",
                },
              }}
              startIcon={<PlayArrowIcon />}
              variant="contained"
              color="success"
              size={"large"}
              style={{ marginRight: "8px" }}
              onClick={() => handleChangeIsRunning("START")}
            >
              {downLg ? "" : "Khởi chạy"}
            </Button>
          )}
          {(isRunning === true && !isPause) && (
            <Button
              sx={{
                "& .MuiButton-startIcon": {
                  margin: downLg ? 0 : "",
                },
              }}
              startIcon={<PauseIcon />}
              variant="contained"
              color="success"
              size={"large"}
              style={{ marginRight: "8px" }}
              onClick={() => handleChangeIsRunning("PAUSE")}
            >
              {downLg ? "" : "Tạm ngưng"}
            </Button>
          )}
          {(isRunning === true && isPause) && (
            <Button
              sx={{
                "& .MuiButton-startIcon": {
                  margin: downLg ? 0 : "",
                },
              }}
              startIcon={<PlayArrowIcon />}
              variant="contained"
              color="primary"
              size={"large"}
              style={{ marginRight: "8px" }}
              onClick={() => handleChangeIsRunning("RESUME")}
            >
              {downLg ? "" : "Tiếp tục"}
            </Button>
          )}
          <Button
            sx={{
              "& .MuiButton-startIcon": {
                margin: downLg ? 0 : "",
              },
            }}
            startIcon={<Replay />}
            variant="contained"
            color="secondary"
            size={"large"}
            style={{ marginRight: "8px" }}
            onClick={() => handleChangeIsRunning("RESTART")}
          >
            {downLg ? "" : "Khởi động lại"}
          </Button>
          <IconButton size={"large"} onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Popover
        disableScrollLock
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box>
          <MenuItem onClick={handleSubMenuClick}>Chỉnh sửa gói đầu tư</MenuItem>
          <MenuItem onClick={handleSubMenuClick}>Tạo bản sao gói</MenuItem>
          <MenuItem onClick={handleSubMenuClick}>Khoe thành tích</MenuItem>
          <MenuItem onClick={handleSubMenuClick}>Chia sẻ gói</MenuItem>
          <MenuItem onClick={handleSubMenuClick}>Đặt lại PnL hôm nay</MenuItem>
          <MenuItem onClick={handleSubMenuClick}>Xóa gói đầu tư</MenuItem>
        </Box>
      </Popover>
    </Box>
  );
};

export default MenuComponent;
