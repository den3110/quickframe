import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import formatCurrency from 'util/formatCurrency';
import { useTranslation } from 'react-i18next';

export default function OpenDetailTimeline(props) {
  const { open, setOpen, selectedData } = props;
  // console.log(props)
  const theme = useTheme();
  const {t }= useTranslation()

  const handleClose = () => {
    setOpen(false);
  };

  const {
    volume,
    winStreak,
    loseStreak,
    profit,
    signal_name,
    victorStreak
  } = selectedData?.runningData || {};
  const { bet_second } = selectedData || {};

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 10, padding: theme.spacing(2) },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {t("Details")}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("volume")}:
                </Typography>
                <Typography fontWeight={600} variant="body1" color={volume > 0 ? "success.main": "error"}>{formatCurrency(volume)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("Win streak")}:
                </Typography>
                <Typography fontWeight={600} variant="body1" color={"success.main"}>{winStreak}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("Lose streak")}:
                </Typography>
                <Typography fontWeight={600} variant="body1" color={"error"}>{loseStreak}</Typography>
              </Box>
            </Grid>
            {/*  */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("Victor streak")}:
                </Typography>
                <Typography fontWeight={600} variant="body1" color={"success.main"}>{victorStreak}</Typography>
              </Box>
            </Grid>
            {/*  */}
            {/* <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("profit")}:
                </Typography>
                <Typography fontWeight={600} variant="body1" color={profit > 0 ? "success.main": "error"}>{formatCurrency(profit)}</Typography>
              </Box>
            </Grid> */}
            {/* <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {t("Order entry time")}:
                </Typography>
                <Typography variant="body1">{bet_second} {t("second")}</Typography>
              </Box>
            </Grid> */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography sx={{whiteSpace: "nowrap"}} variant="body1" fontWeight="bold">
                  {t("Tên phương pháp")}:
                </Typography>
                <Typography variant="body1">{signal_name}</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
