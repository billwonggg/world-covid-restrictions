import React from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import FormHelperText from "@mui/material/FormHelperText";
// import Select from "@mui/material/Select";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Countries } from "../data/Countries";

export default function SearchBar({ country, setCountry, date, setDate }) {
  // set country ISO code when clicked
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          columns={12}
        >
          {/* <Grid item xs={3}>
            <Typography variant="h4" gutterBottom component="div">
              FEB 2022
            </Typography>
          </Grid> */}

          <Grid item xs={5}>
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
          </Grid>

          <Grid item xs={5} m={3} justifyContent="center" alignItems="center">
            {/* <FormControl sx={{ m: 1, width: "100%" }}> */}
            {/* <InputLabel id="country-name-label">Country</InputLabel> */}
            <TextField
              variant="outlined"
              label="Country"
              fullWidth
              select
              value={country}
              onChange={handleCountryChange}
              // input={<OutlinedInput label="Name" />}
            >
              {Countries.map((c) => (
                <MenuItem key={c.ISO_A3} value={c.ISO_A3}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
