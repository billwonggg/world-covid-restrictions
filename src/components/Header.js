import {
  AppBar,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { Countries } from "../data/Countries";
import ThemeSwitch from "./ThemeSwitch";

export default function Header({ country, setCountry, date, setDate, darkMode, setDarkMode }) {
  // set country ISO code when clicked
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <AppBar position="static" height="200px" color="secondary">
      <Toolbar disableGutters>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item md={4} justifyContent="center" alignItems="center">
            <h2 style={{ marginLeft: "25px" }}>COVID-19 Restrictions Map</h2>
          </Grid>
          <Grid item md={2}>
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
          </Grid>

          <Grid item md={3} justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                value={country}
                onChange={handleCountryChange}
                sx={{ maxWidth: "300px" }}
                MenuProps={{ PaperProps: { sx: { maxHeight: "35vh" } } }}
              >
                {Countries.map((c) => (
                  <MenuItem key={c.ISO_A3} value={c.ISO_A3}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Light</Typography>
              <ThemeSwitch checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
              <Typography>Dark</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
