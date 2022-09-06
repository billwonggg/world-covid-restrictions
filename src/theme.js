import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: indigo[200],
    },
    secondary: {
      main: "#dedac0",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2f3746",
    },
    secondary: {
      main: "#463e2f",
    },
  },
});
