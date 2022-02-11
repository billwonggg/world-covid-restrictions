import "./App.css";
import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { Restrictions } from "./data/Restrictions";
import LegendCard from "./components/LegendCard";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "./components/Tabs";

function App() {
  // three letter ISO alpha 3 country code
  const [country, setCountry] = useState("");
  // dropdown tabs
  const [restriction, setRestriction] = useState(Restrictions[1].value);
  // for individual data for each country
  const [countryData, setCountryData] = useState(null);
  // overall stringency data for the world
  const [allCountryData, setAllCountryData] = useState(null);
  const [date, setDate] = useState("2022-01-31");

  // individual country data when searched or clicked
  useEffect(async () => {
    if (!country) {
      return;
    }
    try {
      const r = await fetch(
        `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/${country}/2022-01-08`
      );
      const data = await r.json();
      if (!r.ok) {
        throw new Error(data.error);
      }
      console.log(data);
      setCountryData(data);
    } catch (err) {
      console.err(err);
    }
  }, [country]);

  // all country data
  useEffect(async () => {
    if (!date) {
      return;
    }
    try {
      const r = await fetch(
        `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${date}/${date}`
      );
      if (!r.ok) {
        throw new Error(r.error);
      }
      const res = await r.json();
      console.log(res.data[date], "c8");
      setAllCountryData(res.data[date]);
    } catch (err) {
      console.err(err);
    }
  }, [date]);

  return (
    <div className="App">
      <Box
        sx={{
          m: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div id="searchbar" style={{ width: "80vw" }}>
          <SearchBar setCountry={setCountry} setRestriction={setRestriction} />
        </div>
        <div>
          <Map
            country={country}
            setCountry={setCountry}
            allCountryData={allCountryData}
            restriction={restriction}
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <LegendCard restriction={restriction} />
        </div>
        <div>
          <Tabs countryData={countryData} />
        </div>
      </Box>
    </div>
  );
}

export default App;
