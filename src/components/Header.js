import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format, parseISO } from "date-fns/fp";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Countries } from "../data/Countries";
import { Restrictions } from "../data/Restrictions";

export default function SearchBar({
  country,
  setCountry,
  restriction,
  setRestriction,
  date,
  setDate,
}) {
  // set country name
  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setCountry(value);
  };

  // set restriction change
  const handleRestrictionChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    // set the result json packet
    setRestriction(value);
  };

  const handleDateChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    // set the result json packet
    setDate(value);
  };
  return (
    <div>
      <Box sx={{ m: 3, width: "100%" }}>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          columns={18}
        >
          {/* <Grid item xs={3}>
            <Typography variant="h4" gutterBottom component="div">
              FEB 2022
            </Typography>
          </Grid> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month", "day"]}
              label="Date"
              minDate={new Date("2020-01-01")}
              maxDate={new Date() - 2}
              value={date}
              onChange={(newValue) => {
                setDate(newValue.toLocaleDateString("en-CA"));
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
          <Grid item xs={3}></Grid>

          <Grid item xs={4} justifyContent="center" alignItems="center">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="country-name-label">Country</InputLabel>
              <Select
                labelId="country-name-label"
                id="country-name"
                value={country}
                onChange={handleCountryChange}
                input={<OutlinedInput label="Name" />}
              >
                {Countries.map((country) => (
                  <MenuItem key={country.ISO_A3} value={country.ISO_A3}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Travel restrictions dropdown menu */}
          {country && (
            <Grid item xs={5} justifyContent="center" alignItems="center">
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="restriction-name-label">Restriction</InputLabel>
                <Select
                  labelId="restriction-name-label"
                  id="restriction-name"
                  value={restriction}
                  // default={restrictionName}
                  onChange={handleRestrictionChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {Restrictions.map((restriction) => (
                    <MenuItem key={restriction.value} value={restriction.value}>
                      {restriction.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
