import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, Divider } from "@mui/material";
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
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem style={{ justifyContent: "center" }} sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Light</Typography>
              <ThemeSwitch onClick={() => setDarkMode(!darkMode)} />
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
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
                // sx={{ width: "300px" }}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem sx={{ mt: 3 }}>
            <TextField
              sx={{ maxWidth: "250px" }}
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
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
