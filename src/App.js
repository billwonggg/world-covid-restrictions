import { CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import InfoTabs from "./components/InfoTabs";
import Map from "./components/Map";
import { Restrictions } from "./data/Restrictions";
import { themeDark, themeLight } from "./theme";

const App = () => {
  // app theme (light/dark)
  const [darkMode, setDarkMode] = useState(false);
  // user screen width
  const [width, setWidth] = useState(window.innerWidth);
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
    // we search up data 4 days ago
    day.setDate(day.getDate() - 8);
    return day.toLocaleDateString("en-CA");
  });

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
      console.log(err);
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
      console.log(err);
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

  const arr = date.split("-");
  const d = `${arr[2]}/${arr[1]}/${arr[0]}`;

  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      <CssBaseline />
      <div className="App">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            mb: "10px",
          }}
        >
          {width <= 900 ? (
            <HeaderMobile
              country={country}
              setCountry={setCountry}
              date={date}
              setDate={setDate}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          ) : (
            <Header
              country={country}
              setCountry={setCountry}
              date={date}
              setDate={setDate}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}

          <h2 style={{ textAlign: "center", marginTop: "40px" }}>World Stringency Index on {d}</h2>
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
    </ThemeProvider>
  );
};

export default App;
