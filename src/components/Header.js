import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import { Stack } from "@mui/material";
import { Countries } from "../data/Countries";
import ThemeSwitch from "./ThemeSwitch";

export default function Header({
  country,
  setCountry,
  date,
  setDate,
  darkMode,
  setDarkMode,
}) {
  // set country ISO code when clicked
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <AppBar position="static" height="200px">
        <Toolbar>
          <Grid container justifyContent="space-evenly" alignItems="center">
            <Grid item md={3} justifyContent="center" alignItems="center">
              <h2>COVID Policy Map</h2>
            </Grid>
            <Grid item m={1} md={3}>
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
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item m={1} md={3} justifyContent="center" alignItems="center">
              <TextField
                sx={{ maxWidth: "400px" }}
                variant="outlined"
                label="Country"
                fullWidth
                select
                value={country}
                onChange={handleCountryChange}
              >
                {Countries.map((c) => (
                  <MenuItem key={c.ISO_A3} value={c.ISO_A3}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              m={1}
              md={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Light</Typography>
                <ThemeSwitch
                  checked={darkMode}
                  onClick={() => setDarkMode(!darkMode)}
                />
                <Typography>Dark</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
