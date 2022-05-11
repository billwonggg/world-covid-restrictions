import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Countries } from "../data/Countries";
import ThemeSwitch from "./ThemeSwitch";

export default function SearchBar({
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
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container justifyContent="space-evenly" m={2}>
        <Grid item m={2} xs={4} md={3}>
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

        <Grid
          item
          m={2}
          xs={6}
          md={4}
          justifyContent="center"
          alignItems="center"
        >
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
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Light</Typography>
            <ThemeSwitch onClick={() => setDarkMode(!darkMode)} />
            <Typography>Dark</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
