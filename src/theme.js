import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#dedac0",
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
