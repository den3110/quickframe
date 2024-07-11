import { Box, Button } from '@mui/material'
import React from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CachedIcon from '@mui/icons-material/Cached';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

const PopupControll = () => {
  return (
    <Box sx={{position: "absolute", left: "50%", top: "50px", transform: "translateX(-50%)", width: "auto", zIndex: 9, background: "white", boxShadow: "8.08219px 12.1233px 40.411px rgb(97 106 119 / 53%)", borderRadius: "8px"}}>
      <Box sx={{display: "flex", gap: 1, alignItems: "center", padding: 1}}>
        <Button startIcon={<PauseIcon />}>Tạm ngưng</Button>
        <Button startIcon={<PlayArrowIcon />}>Tiếp tục</Button>
        <Button startIcon={<CachedIcon />}>Khởi động lại</Button>
        <Button startIcon={<ReplayIcon />}>Cài lại</Button>
        <Button startIcon={<DeleteIcon />}>Xoá</Button>
      </Box>
    </Box>
  )
}

export default PopupControll
