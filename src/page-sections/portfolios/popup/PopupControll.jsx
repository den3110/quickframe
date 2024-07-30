import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CachedIcon from "@mui/icons-material/Cached";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import { isDark } from "util/constants";
import { useTranslation } from "react-i18next";
import StopIcon from '@mui/icons-material/Stop';

const PopupControll = ({ onClickStop, onClickStart, onClickDelete, onClickRestart, onClickReset, onClickPause }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const {t }= useTranslation()

  return (
    <Box
      sx={{
        position: downLg ? "fixed" : "absolute",
        left: "50%",
        top: !downLg && "50px",
        bottom: downLg && "56px",
        transform: "translateX(-50%)",
        width: downLg ? "100%" : "auto",
        zIndex: 9,
        background: theme=> isDark(theme) ? theme.palette.background.cell : "white",
        boxShadow:
          !downLg && "8.08219px 12.1233px 40.411px rgb(97 106 119 / 53%)",
        borderRadius: !downLg && "8px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: downLg ? "center" : "", padding: 1 }}>
        <Button
          onClick={onClickPause}
          startIcon={<PauseIcon />}
          color="warning"
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("COOL_DOWN")}
        </Button>
        {/*  */}
        <Button
          onClick={onClickStop}
          startIcon={<StopIcon />}
          color="secondary"
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("Stop")}
        </Button>
        {/*  */}
        <Button
          onClick={onClickStart}
          startIcon={<PlayArrowIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("continue")}
        </Button>
        <Button
          onClick={onClickRestart}
          startIcon={<CachedIcon />}
          color="success"
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("Restart Plan")}
        </Button>
        <Button
          onClick={onClickReset}
          startIcon={<ReplayIcon />}
          color={"info"}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("Reset")}
        </Button>
        <Button
          onClick={onClickDelete}
          startIcon={<DeleteIcon />}
          color="error"
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          {t("delete")}
        </Button>
      </Box>
      {downLg && <Divider />}
    </Box>
  );
};

export default PopupControll;
