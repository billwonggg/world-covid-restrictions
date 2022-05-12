import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c0c4de",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2f3746",
    },
  },
});
