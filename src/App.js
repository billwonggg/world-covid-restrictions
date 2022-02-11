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
  const [country, setCountry] = useState("");
  const [restriction, setRestriction] = useState(Restrictions[1].value);
  // for tabs at the bottom
  const [countryData, setCountryData] = useState(null);
  // for the map
  const [allCountryData, setAllCountryData] = useState("");

  // individual country data when searched or clicked
  useEffect(async () => {
    if (!country) {
      return;
    }
    const body = {
      operation: "read",
      tableName: "dynotableuniq",
      payload: {
        uuid: country,
        month: 23,
        list_of_attributes: [
          "C2_Flag",
          "C3_Flag",
          "C4_Flag",
          "C7_Flag",
          "#it",
          "H6_Flag",
        ],
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const r = await fetch(
        "https://75av8duz8i.execute-api.ap-southeast-2.amazonaws.com/Stage2/getcountry",
        options
      );
      const data = await r.json();
      if (!r.ok) {
        throw new Error(data.error);
      }
      setCountryData(JSON.parse(data.body));
    } catch (err) {
      console.err(err);
    }
  }, [country]);

  // all country data when restriction is selected
  useEffect(async () => {
    if (!restriction) {
      return;
    }
    const body = {
      operation: "read",
      tableName: "dynotableuniq",
      payload: {
        "#u": "",
        month: 23,
        list_of_attributes: [
          "C2_Flag",
          "C3_Flag",
          "C4_Flag",
          "C7_Flag",
          "#it",
          "H6_Flag",
        ],
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const r = await fetch(
        "https://75av8duz8i.execute-api.ap-southeast-2.amazonaws.com/AllCountriesStage/getallcountries",
        options
      );
      const data = await r.json();
      if (!r.ok) {
        throw new Error(data.error);
      }
      console.log(data, "c8");
      setAllCountryData(data.body);
    } catch (err) {
      console.err(err);
    }
  }, [restriction]);

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
        <div id="searchbar" style={{ width: "100%" }}>
          <SearchBar setCountry={setCountry} setRestriction={setRestriction} />
        </div>
        <div>
          <Map
            country={country}
            setCountry={setCountry}
            allCountryData={allCountryData}
            restriction={
              restriction === "#it"
                ? "C8_International travel controls"
                : restriction
            }
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <LegendCard
            restriction={
              restriction === "#it"
                ? "C8_International travel controls"
                : restriction
            }
          />
        </div>
        <div>
          <Tabs countryData={countryData} />
        </div>
      </Box>
    </div>
  );
}

export default App;
