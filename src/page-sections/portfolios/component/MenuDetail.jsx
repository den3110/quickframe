import React, { useState } from 'react';
import { Button, Popover, MenuItem, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ActionBotType } from 'type/ActionBotType';
import portfolioApi from 'api/portfolios/portfolioApi';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from 'components/toast/toast';

const MenuComponent = () => {
    const {id }= useParams()
    const navigate= useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

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

  const handleChangeIsRunning = async (e) => {
    try {
      const payload = {
        action: e.target.checked === true ? ActionBotType.START : ActionBotType.STOP,
      };
      await portfolioApi.userBotAction(id, payload);
        console.log(e.target.checked)
        // setData()
        showToast( !e.target.checked === true ? "Chạy gói thành công" : "Ngưng gói thành công", "success")
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  const handleBack= ()=> {
    navigate(-1)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" size={"large"} onClick={handleBack}>Quay lại</Button>
        <Box>
          <Button variant="contained" color="primary" size={"large"} style={{ marginRight: '8px' }}>
            Tiếp tục
          </Button>
          <Button variant="contained" color="secondary" size={"large"} style={{ marginRight: '8px' }}>
            Khởi động lại
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
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
