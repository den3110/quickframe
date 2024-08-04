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

const PopupControll = ({ onClickStop, onClickStart, onClickDelete, onClickRestart, onClickReset, onClickPause, submitting }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const downXss = useMediaQuery((theme) => theme.breakpoints.down("xss"));
  const isDownXss= (downXss=== true && downLg === true) ? true : false
  console.log(isDownXss)
  const {t }= useTranslation()

  // const renderMenu= ()=> {
  //     if(downLg === true && downXss=== true) {

  //     }
  //     else if(downLg === false && downXss=== false ) {

  //     }
  //     else {

  //     }
  // }

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
      <Box sx={{ display: "flex", gap: isDownXss ? .5 : 1, alignItems: "center", justifyContent: downLg ? "center" : "", padding: isDownXss ? .5 : 1 }}>
        <Button
          disabled={submitting}
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
          {!isDownXss && <>
            {t("COOL_DOWN")}
          </>}
        </Button>
        {/*  */}
        <Button
          disabled={submitting}
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
          {!isDownXss &&<>
          {t("Stop")}

          </>}
        </Button>
        {/*  */}
        <Button
          disabled={submitting}
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
          {!isDownXss && <>
            {t("continue")}
          </>}
        </Button>
        <Button
          disabled={submitting}
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
          {!isDownXss && <>
            {t("Restart Plan")}
          </>}
        </Button>
        <Button
          disabled={submitting}
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
          {
            !isDownXss && <>
              {t("Reset")}
            </>
          }
        </Button>
        <Button
          disabled={submitting}
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
          {!isDownXss && <>
            {t("delete")}
          </>}
        </Button>
      </Box>
      {downLg && <Divider />}
    </Box>
  );
};

export default PopupControll;
