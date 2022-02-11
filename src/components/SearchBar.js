import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Countries } from "../data/Countries";
import { Restrictions } from "../data/Restrictions";

export default function SearchBar({ setCountry, setRestriction }) {
  const [countryName, setCountryName] = React.useState("");
  const [restrictionName, setRestrictionName] = React.useState(
    Restrictions[0].value
  );
  const [displayError, setDisplayError] = React.useState(false);

  // display error message when no country in search
  React.useEffect(() => {
    if (countryName) setDisplayError(false);
  }, [countryName]);

  // set country name
  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountryName(value);
    console.log(value);
    console.log(countryName);
  };

  // set restriction change
  const handleRestrictionChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setRestrictionName(value);

    // API call here

    // set the result json packet
    setRestriction(value);
  };

  // conduct search
  const handleSearch = (event) => {
    // if search is called without selecting a country
    if (!countryName) {
      setDisplayError(true);
      return;
    }
    console.log("search button was pressed with value", countryName);
    // api call to the backend to get country information

    setCountry(countryName);
  };

  return (
    <div>
      <Box sx={{ m: 3, width: "100%" }}>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          columns={16}
        >
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom component="div">
              FEB 2022
              {/* {Restrictions.filter((r) => {return r.value === restrictionName})[0].name} */}
            </Typography>
          </Grid>

          {/* Travel restrictions dropdown menu */}
          <Grid item xs={5} justifyContent="center" alignItems="center">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="restriction-name-label">
                Travel Restriction
              </InputLabel>
              <Select
                labelId="restriction-name-label"
                id="restriction-name"
                value={restrictionName}
                default={restrictionName}
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
          <Grid item xs={4} justifyContent="center" alignItems="center">
            <FormControl sx={{ m: 1, width: "100%" }} error={displayError}>
              <InputLabel id="country-name-label">Country</InputLabel>
              <Select
                labelId="country-name-label"
                id="country-name"
                value={countryName}
                onChange={handleCountryChange}
                input={<OutlinedInput label="Name" />}
              >
                {Countries.map((country) => (
                  <MenuItem key={country.ISO_A3} value={country.ISO_A3}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {displayError && (
                <FormHelperText>Please select a country</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={2} sx={{ height: "100%" }}>
            <Button variant="outlined" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
