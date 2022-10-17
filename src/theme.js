import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#dbd5a9",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#463e2f",
    },
    background: {
      default: "#2f3746",
    },
  },
});
