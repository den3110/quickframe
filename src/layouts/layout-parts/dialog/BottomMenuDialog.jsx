import React from 'react';
import { Dialog, DialogContent, List, ListItem, ListItemText, IconButton, Slide, Divider, ListItemSecondaryAction } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const BottomMenuDialog = (props) => {
  const {t }= useTranslation()
  const { open, setOpen, onClose } = props;
  const navigate= useNavigate()
  const handleNavigate= (link)=> {
    navigate(link)
    onClose()
  }
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          position: 'absolute',
          bottom: 80,
          margin: 0,
          width: '94%',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        },
      }}
    >
      <DialogContent sx={{ padding: '10px' }}>
        <List>
          <ListItem onClick={()=> handleNavigate("/manage-follower")} button>
            <ListItemText
              primary={t("manage_followers")}
              secondary={t("Monitor your investing follower statistics")}
              primaryTypographyProps={{ style: { fontWeight: 'bold', fontFamily: "Manrope, sans-serif" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="forward" sx={{ p: 0.5 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem onClick={()=> handleNavigate("/manual-trade")} button>
            <ListItemText
              primary={t("manual_trade")}
              secondary={t("Place orders without needing signals.")}
              primaryTypographyProps={{ style: { fontWeight: 'bold', fontFamily: "Manrope, sans-serif" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="forward" sx={{ p: 0.5 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem onClick={()=> handleNavigate("/vip-member")} button>
            <ListItemText
              primary="Vip member"
              secondary={t("Manage your statistic about Exchange referrals")}
              primaryTypographyProps={{ style: { fontWeight: 'bold', fontFamily: "Manrope, sans-serif" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="forward" sx={{ p: 0.5 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          
          {/* <ListItem onClick={()=> handleNavigate("/dashboard/referral")} button>
            <ListItemText
              primary="Giới thiệu"
              secondary="Quản lý lượt giới thiệu trên QuickInvest"
              primaryTypographyProps={{ style: { fontWeight: 'bold', fontFamily: "Manrope, sans-serif" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="forward" sx={{ p: 0.5 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem onClick={()=> handleNavigate("/dashboard/account")} button>
            <ListItemText
              primary="Thành viên VIP"
              secondary="Quản lý số liệu thống kê người giới thiệu trên sàn giao dịch"
              primaryTypographyProps={{ style: { fontWeight: 'bold', fontFamily: "Manrope, sans-serif" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="forward" sx={{ p: 0.5 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem> */}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default BottomMenuDialog;
