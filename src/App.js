import "./App.css";
import React, { useEffect, useState } from "react";
import { Restrictions } from "./data/Restrictions";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Map from "./components/Map";
import InfoTabs from "./components/InfoTabs";
import Description from "./components/Description";
import Footer from "./components/Footer";

function App() {
  // three letter ISO alpha 3 country code (current country selected)
  const [country, setCountry] = useState("");
  // full name of selected country
  const [countryName, setCountryName] = useState("");
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

  const individualAPI = async () => {
    if (country === "" || !date) {
      return;
    }
    try {
      const r = await fetch(
        `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/${country}/${date}`
      );
      const data = await r.json();
      if (!r.ok) {
        throw new Error(data.error);
      }
      setCountryData(data.policyActions);
    } catch (err) {
      console.err(err);
    }
  };

  const allAPI = async () => {
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
      setAllCountryData(res.data[date]);
    } catch (err) {
      console.err(err);
    }
  };

  // individual country data when searched or clicked
  useEffect(() => {
    individualAPI();
  }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  // all country data (stringency index)
  useEffect(() => {
    individualAPI();
    allAPI();
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div id="bar">
          <Header
            country={country}
            setCountry={setCountry}
            date={date}
            setDate={setDate}
          />
        </div>

        <div>
          <Map
            country={country}
            setCountry={setCountry}
            countryName={countryName}
            setCountryName={setCountryName}
            countryData={countryData}
            allCountryData={allCountryData}
            restriction={restriction}
          />
        </div>
        {/* show description only when no country is selected */}
        {country === "" && (
          <div id="description">
            <Description />
          </div>
        )}
        {/* show tabs only when a country is selected */}
        {country && (
          <div id="tabs">
            <InfoTabs
              countryName={countryName}
              date={date}
              countryData={countryData}
              restriction={restriction}
              setRestriction={setRestriction}
            />
          </div>
        )}
      </Box>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
