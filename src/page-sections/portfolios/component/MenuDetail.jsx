import React, { useContext, useEffect, useRef, useState } from "react";
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
import useQuery from "hooks/useQuery";
import AuthContext from "contexts/AuthContext";
import NewPlanDrawer from "../drawer/NewPlanDrawer";
import ShareArchievement from "../dialog/ShareArchievement";
import AddIcon from "@mui/icons-material/Add";
import { SignalFeatureTypes } from "type/SignalFeatureTypes";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { useTranslation } from "react-i18next";

const MenuComponent = ({ dataStat, setDataStat, isSignalStrategy = false }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const canvasRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isRunning, setIsRunning] = useState();
  const [isPause, setIsPause] = useState();
  const { selectedLinkAccount } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isShareArchievement, setIsShareArchievement] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {t }= useTranslation()
  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

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

  const handleNewPlan = () => {
    setIsEdit(true);
    setOpenDrawer(true);
  };

  const handleChangeIsRunning = async (action) => {
    try {
      const payload = {
        action: ActionBotType[action],
        linkAccountId: selectedLinkAccount,
      };
      // const { data, error, loading, refetch }= useQuery()
      await portfolioApi.userBotAction(id, payload);
      // setData()
      // setIsRunning(ActionBotTypeStatus[action]);
      setIsPause(!isPause);
      showToast(ActionBotTypeMessageSucces[action], "success");
      setDataStat({
        ...dataStat,
        lastData: { ...dataStat.lastData, isPause: !isPause },
      });
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  const resetPnlToday = async () => {
    try {
      // const result= await
      const payload = {
        action: ActionBotType.RESET_PNL,
      };
      const response = await portfolioApi.userBotAction(id, payload);
      if (response?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces.RESET_PNL, "success");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "success");
      }
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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await signalStrategyApi.userBudgetTelegramSignal();
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" size={"large"} onClick={handleBack}>
          Quay lại
        </Button>
        <Box>
          {isSignalStrategy === false && (
            <>
              {isRunning === false && (
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
              {isRunning === true && !isPause && (
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
                  {downLg ? "" : t("COOL_DOWN")}
                </Button>
              )}
              {isRunning === true && isPause && (
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
                onClick={() => handleChangeIsRunning(ActionBotType.RESTART)}
              >
                {downLg ? "" : "Khởi động lại"}
              </Button>
              <IconButton size={"large"} onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </>
          )}
          {isSignalStrategy === true && (
            <Button
              sx={{
                "& .MuiButton-startIcon": {
                  margin: downLg ? 0 : "",
                },
              }}
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              size={"large"}
              style={{ marginRight: "8px" }}
              onClick={() => handleNewPlan()}
            >
              {downLg ? "" : t("Create Plan")}
            </Button>
          )}
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
          <MenuItem
            onClick={(e) => {
              handleSubMenuClick(e);
              handleClose();
              setOpenEdit(true);
              setIsEdit(true);
              // isEditSingle=
            }}
          >
            {t("Edit Plan")}
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleSubMenuClick(e);
              handleClose();
              setIsShareArchievement(true);
            }}
          >
            {t("Share Media")}
          </MenuItem>
          <MenuItem
            onClick={async (e) => {
              handleSubMenuClick(e);
              await resetPnlToday();
            }}
          >
            {t("Reset today P/L")}
          </MenuItem>
          <MenuItem onClick={handleSubMenuClick}>{t("Delete Plan")}</MenuItem>
        </Box>
      </Popover>
      <NewPlanDrawer
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
        }}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedPlan={dataStat}
        isEditSingle={true}
        setData={setDataStat}
      />
      <NewPlanDrawer
        open={openDrawer}
        handleClose={() => {
          setOpenDrawer(false);
        }}
        isEdit={isEdit}
        allowSelectedTab={true}
        selectedPlan={{
          ...dataStat,
          autoType: 3,
          signal_feature:
            data?.map((item) => item?._id)?.length > 1
              ? SignalFeatureTypes.AUTO_CHANGE_METHODS
              : SignalFeatureTypes.SINGLE_METHOD,
          budget_amount: 100,
          name: "",
          bet_second: 25,
          margin_dense: 100,
        }}
        setIsEdit={setIsEdit}
        selectedSignal={data?.map((item) => item?._id)}
      />
      <ShareArchievement
        ref={canvasRef}
        open={isShareArchievement}
        handleClose={() => {
          setIsShareArchievement(false);
        }}
        selectedPlan={dataStat}
      />
    </Box>
  );
};

export default MenuComponent;
