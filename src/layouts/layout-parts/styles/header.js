import { AppBar, Toolbar, styled } from "@mui/material";
export const DashboardHeaderRoot = styled(AppBar)(({
  theme
}) => ({
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backgroundImage: "none",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
  color: theme.palette.text.primary
}));
export const StyledToolBar = styled(Toolbar)({
  "@media (min-width: 1200px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  },
  "@media (min-width: 0px)": {
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: "auto"
  }
});

// export const ToggleIcon = styled(Box)<{ width?: number }>(({ theme, width }) => ({
//   height: 3,
//   margin: "5px",
//   marginLeft: 0,
//   width: width || 25,
//   borderRadius: "10px",
//   transition: "width 0.3s",
//   backgroundColor: theme.palette.primary.main,
// }));