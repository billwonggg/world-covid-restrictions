import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import { Countries } from "../data/Countries";
import ThemeSwitch from "./ThemeSwitch";

export default function HeaderMobile({
  country,
  setCountry,
  date,
  setDate,
  darkMode,
  setDarkMode,
}) {
  const [open, setOpen] = useState(false);
  // set country ISO code when clicked
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <AppBar position="static" height="200px" color="secondary">
      <Toolbar>
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MenuIcon />
        </IconButton>
        <h2 style={{ marginLeft: "20px" }}>COVID-19 Restrictions</h2>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <List>
            <ListItem style={{ justifyContent: "center" }} sx={{ mt: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Light</Typography>
                <ThemeSwitch checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
                <Typography>Dark</Typography>
              </Stack>
            </ListItem>
            <Divider sx={{ mt: 3 }} />
            <ListItem sx={{ mt: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  openTo="year"
                  views={["year", "month", "day"]}
                  label="Date"
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date()}
                  value={date}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    setDate(newValue.toLocaleDateString("en-CA"));
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </ListItem>
            <ListItem sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  variant="outlined"
                  label="Country"
                  value={country}
                  onChange={handleCountryChange}
                  MenuProps={{ PaperProps: { sx: { maxHeight: "40vh" } } }}
                >
                  {Countries.map((c) => (
                    <MenuItem key={c.ISO_A3} value={c.ISO_A3}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
