import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    mode: "light",
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
