import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CachedIcon from "@mui/icons-material/Cached";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import { isDark } from "util/constants";

const PopupControll = ({ onClickStop, onClickStart, onClickDelete }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
          onClick={onClickStop}
          startIcon={<PauseIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          Tạm ngưng
        </Button>
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
          Tiếp tục
        </Button>
        <Button
          startIcon={<CachedIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          Khởi động lại
        </Button>
        <Button
          startIcon={<ReplayIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          Cài lại
        </Button>
        <Button
          onClick={onClickDelete}
          startIcon={<DeleteIcon />}
          sx={{
            fontSize: downLg ? 10 : "",
            flexDirection: downLg ? "column" : "row",
            "& .MuiButton-startIcon": {
              margin: downLg ? 0 : "",
            },
          }}
        >
          Xoá
        </Button>
      </Box>
      {downLg && <Divider />}
    </Box>
  );
};

export default PopupControll;
