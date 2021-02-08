import breakpoints from "./breakpoints";
import typo from "./typography";

const base = {
  ...typo,
  ...breakpoints,
};

const colors = {
  primary: process.env.REACT_APP_PRIMARY_COLOR || "#68CA6D" || "#0095eb",
  board: process.env.REACT_APP_BOARD_COLOR || "#0095eb",
  chart: process.env.REACT_APP_CHART_COLOR || "#68CA6D",
  danger: "#FF4747",
  success: "#68CA6D",
};

export const light = {
  ...base,
  colors: {
    ...colors,
    text: "#141414",
    invertText: "#fff",
    bg: "#E0E0E0",
    bgContrast: "white",

    //computed
    actionBg: "#383B42",
    secondary: "#EBEBEB",
  },
};

export const dark = {
  ...base,
  colors: {
    ...colors,
    text: "#fff",
    invertText: "#000",
    bg: "#242526",
    bgContrast: "#2F3137",

    //computed
    actionBg: "#335C67",
    secondary: "#7B818E",
  },
};
