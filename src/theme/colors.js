import { alpha } from "@mui/material/styles";
import config from '../config/config.json';
import hexToRgb from "util/hexToRgba";
import rgbToRgba from "util/rgbTorgba";
import lightenColor from "util/lightenColor";

const grey = {
  25: "#F9FAFB",
  50: "#F6F7F8",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827"
};
export const primary = {
  25: "#F7F5FE",
  50: "#F4F1FE",
  100: "#E4DCFD",
  200: "#C8BAFC",
  300: "#A996F8",
  400: "#907AF1",
  500: "#6950E8",
  600: config.theme.primaryColorHover,
  700: rgbToRgba(hexToRgb(config.theme.primaryColor), 0.5),
  800: "#33129C",
  900: "#240C6E",
  main: config.theme.primaryColor,
  secondary: lightenColor(config.theme.primaryColor, 75, 60 ),
};
export const success = {
  25: "#F1FEF5",
  50: "#E3FDEB",
  100: "#CDFBDB",
  101: rgbToRgba(hexToRgb(config.theme.primaryColor), 0.25),
  102: rgbToRgba(hexToRgb(config.theme.primaryColor), 0.35),
  200: "#9DF7C2",
  300: "#6AE9AA",
  400: "#43D49A",
  500: "#11b886",
  600: "#0C9E80",
  700: "#088477",
  800: "#056A6A",
  900: "#035058",
  main: "#11b886",
  bg: rgbToRgba(hexToRgb("#11b886"), 0.35),
  buy: rgbToRgba(hexToRgb(config.theme.primaryColor), 0.8)
};
export const warning = {
  25: "#FFFCF5",
  50: "#FFF8E",
  100: "#FFF8E6",
  200: "#FFEBB3",
  300: "#FEDE80",
  400: "#FED14D",
  500: "#FEBF06",
  600: "#DB7E24",
  700: "#B75F19",
  800: "#93440F",
  900: "#7A3109",
  main: "#FEBF06"
};
export const error = {
  25: "#FEF6F8",
  50: "#FEF1F4",
  100: "#FDE8ED",
  200: "#FBD5DE",
  300: "#F7A6BA",
  400: "#F37795",
  500: "#EF4770",
  600: "#EB194C",
  700: "#C0113C",
  800: "#910D2D",
  900: "#63091F",
  main: "#EF4770"
};
export const secondary = {
  ...grey,
  main: "#F1F5F9"
};
export const info = {
  light: "#F4F4FF",
  main: "#8C8DFF",
  dark: "#0C53B7"
};

// FOR LIGHT THEME ACTION COLORS
export const textLight = {
  primary: grey[900],
  secondary: grey[500],
  disabled: grey[200],
  main: "black"
};

// FOR DARK THEME TEXT COLORS
export const textDark = {
  primary: "#ffffff",
  secondary: grey[400],
  disabled: grey[200],
  main: "white"
};

// FOR LIGHT THEME ACTION COLORS
export const actionLight = {
  focusOpacity: 0.12,
  hoverOpacity: 0.04,
  disabledOpacity: 0.38,
  selectedOpacity: 0.08,
  activatedOpacity: 0.12,
  disabled: grey[200],
  selected: grey[50],
  focus: alpha(grey[900], 0.12),
  hover: alpha(grey[900], 0.04),
  active: alpha(grey[900], 0.54),
  disabledBackground: alpha(grey[900], 0.12)
};

// FOR DARK THEME ACTION COLORS
export const actionDark = {
  focusOpacity: 0.12,
  hoverOpacity: 0.04,
  disabledOpacity: 0.38,
  selectedOpacity: 0.16,
  activatedOpacity: 0.24,
  selected: grey[700],
  // disabled: grey[200],
  focus: alpha(grey[100], 0.12),
  hover: alpha(grey[100], 0.04),
  active: alpha(grey[100], 0.54),
  disabledBackground: alpha(grey[100], 0.12)
};

// COMMON COLOR PALETTE
const palette = {
  grey,
  info,
  error,
  primary,
  success,
  warning,
  secondary
};

// #6950E8
// LIGHT THEME COLOR PALETTE
export const lightPalette = {
  ...palette,
  mode: "light",
  text: textLight,
  divider: grey[200],
  action: actionLight,
  border: "#eeeff2",
  background: {
    default: "#fdfdff",
    paper: "#ffffff",
    cell: "#f9f9fa",
    fcell: "",
    t1: "#eeeff2"
  }
};

// DARK THEME COLOR PALETTE
export const darkPalette = {
  ...palette,
  mode: "dark",
  text: textDark,
  divider: grey[700],
  action: actionDark,
  border: "#323b49",
  background: {
    default: grey[900],
    paper: grey[800],
    cell: "#111827",
    fcell: "#323b49",
    t1: "#323b49"
  }
};