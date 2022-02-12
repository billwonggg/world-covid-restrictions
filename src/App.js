import "./App.css";
import React, { useEffect, useState } from "react";
import { Restrictions } from "./data/Restrictions";
import Map from "./components/Map";
import Header from "./components/Header";
import LegendCard from "./components/LegendCard";
import Box from "@mui/material/Box";
import Tabs from "./components/Tabs";
// import Grid from "@mui/material/Grid";

function App() {
  // three letter ISO alpha 3 country code (current country selected)
  const [country, setCountry] = useState("");
  // dropdown tabs
  const [restriction, setRestriction] = useState(Restrictions[0].value);
  // for individual data for each country
  const [countryData, setCountryData] = useState(null);
  // overall stringency data for the world
  const [allCountryData, setAllCountryData] = useState(null);
  // current date selected
  const [date, setDate] = useState(() => {
    const day = new Date();
    // we search up data a week ago
    day.setDate(day.getDate() - 5);
    return day.toLocaleDateString("en-CA");
  });

  // individual country data when searched or clicked
  useEffect(async () => {
    if (date === "") {
      return;
    }
    console.log(date, "date app");
    try {
      const r = await fetch(
        `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/${country}/2022-01-08`
      );
      const data = await r.json();
      if (!r.ok) {
        throw new Error(data.error);
      }
      console.log(data.policyActions);
      setCountryData(data.policyActions);
    } catch (err) {
      console.err(err);
    }
  }, [country]);

  // all country data (stringency index)
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
          <Header
            country={country}
            setCountry={setCountry}
            restriction={restriction}
            setRestriction={setRestriction}
            date={date}
            setDate={setDate}
          />
        </div>
        <div>
          <Map
            country={country}
            setCountry={setCountry}
            countryData={countryData}
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
