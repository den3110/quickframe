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
  // ActionBotTypeStatus,
} from "type/ActionBotType";
import portfolioApi from "api/portfolios/portfolioApi";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "components/toast/toast";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Replay } from "@mui/icons-material";
// import useQuery from "hooks/useQuery";
import AuthContext from "contexts/AuthContext";
import NewPlanDrawer from "../drawer/NewPlanDrawer";
import ShareArchievement from "../dialog/ShareArchievement";
import AddIcon from "@mui/icons-material/Add";
import { SignalFeatureTypes } from "type/SignalFeatureTypes";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { useTranslation } from "react-i18next";
import StopIcon from '@mui/icons-material/Stop';

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
  const [submitting, setSubmitting]= useState(false)
  const [data, setData] = useState([]);
  const {t }= useTranslation()
  // const open = Boolean(anchorEl);
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
      setSubmitting(true)
      const response= await portfolioApi.userBotAction(id, payload);
      // setData()
      // setIsRunning(ActionBotTypeStatus[action]);
      if(response?.data?.ok=== true) {
        setIsPause(!isPause);
        showToast(ActionBotTypeMessageSucces[action], "success");
        setDataStat({
          ...dataStat ?? [],
          isRunning: true,
          lastData: { ...dataStat.lastData ?? [], isPause: false },
        });
      }
      else if(response?.data?.ok=== false ){
        showToast(t(response?.data?.err_code), "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setSubmitting(false)
    }
  };

  const handleStopBot = async (action) => {
    try {
      const payload = {
        action: ActionBotType[action],
        linkAccountId: selectedLinkAccount,
      };
      // const { data, error, loading, refetch }= useQuery()
      setSubmitting(true)
      const response= await portfolioApi.userBotAction(id, payload);
      // setData()
      // setIsRunning(ActionBotTypeStatus[action]);
      if(response?.data?.ok=== true) {
        setIsPause(!isPause);
        showToast(ActionBotTypeMessageSucces[action], "success");
        setDataStat({
          ...dataStat ?? [],
          isRunning: false,
          lastData: { ...dataStat.lastData ?? [] },
        });
      }
      else if(response?.data?.ok=== false ){
        showToast(t(response?.data?.err_code), "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setSubmitting(false)
    }
  };


  const resetPnlToday = async () => {
    try {
      // const result= await
      const payload = {
        action: ActionBotType.RESET_PNL,
      };
      setSubmitting(true)
      const response = await portfolioApi.userBotAction(id, payload);
      if (response?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces.RESET_PNL, "success");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "success");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setSubmitting(false)
    }
  };

  const handleRemovePlan = async () => {
    try {
      const payload = {
        ids: [id],
        action: ActionBotType.REMOVE,
      };
      setSubmitting(true)
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.REMOVE], "success");
        setDataStat(undefined)
        navigate("/portfolios", {state: {isFromDeleteBot: true, botId: dataStat?._id}})
        // setChangeData((prev) => !prev);
      }
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.REMOVE,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // // const listResult = responses?.map((item) => item.data.ok);
      // // setData();
      // showToast("Xoá các gói đã chọn thành công", "success");
      // setData(
      //   dataState?.filter(
      //     (item, key) => !selectedPlans.find((a) => a._id === item._id)
      //   )
      // );
      // setChange((prev) => !prev);
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      setSubmitting(false)
      // setLoading(false);
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
          {t("Back")}
        </Button>
        <Box>
          {isSignalStrategy === false && (
            <>
              {isRunning === true && (
                <Button
                  sx={{
                    "& .MuiButton-startIcon": {
                      margin: downLg ? 0 : "",
                    },
                  }}
                  disabled={submitting}
                  startIcon={<StopIcon />}
                  variant="contained"
                  color="warning"
                  size={"large"}
                  style={{ marginRight: "8px" }}
                  onClick={() => handleStopBot("STOP")}
                >
                  {downLg ? "" : t("stop")}
                </Button>
              )}
              {isRunning === false && (
                <Button
                  sx={{
                    "& .MuiButton-startIcon": {
                      margin: downLg ? 0 : "",
                    },
                  }}
                  disabled={submitting}
                  startIcon={<PlayArrowIcon />}
                  variant="contained"
                  color="success"
                  size={"large"}
                  style={{ marginRight: "8px" }}
                  onClick={() => handleChangeIsRunning("START")}
                >
                  {downLg ? "" : t("start")}
                </Button>
              )}
              {isRunning === true && !isPause && (
                <Button
                  sx={{
                    "& .MuiButton-startIcon": {
                      margin: downLg ? 0 : "",
                    },
                  }}
                  disabled={submitting}
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
                  disabled={submitting}
                  startIcon={<PlayArrowIcon />}
                  variant="contained"
                  color="primary"
                  size={"large"}
                  style={{ marginRight: "8px" }}
                  onClick={() => handleChangeIsRunning("RESUME")}
                >
                  {downLg ? "" : t("continue")}
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
                disabled={submitting}
                onClick={() => handleChangeIsRunning(ActionBotType.RESTART)}
              >
                {downLg ? "" : t("Restart Plan")}
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
              disabled={submitting}
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
            disabled={submitting}
            onClick={async (e) => {
              handleSubMenuClick(e);
              await resetPnlToday();
            }}
          >
            {t("Reset today P/L")}
          </MenuItem>
          <MenuItem disabled={submitting} onClick={async (e)=> {
            handleSubMenuClick(e)
            await handleRemovePlan()

          }}>{t("Delete Plan")}</MenuItem>
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
          ...dataStat ?? [],
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
