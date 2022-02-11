import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/countries.json";
import TextBox from "./TextBox";
import { Countries } from "../data/Countries";
import LegendCard from "./LegendCard";

const Map = ({ country, setCountry, allCountryData, restriction }) => {
  // States
  // const [country, setCountry] = useState("");
  const [hover, setHover] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    if (country != "") {
      const name = Countries.filter((c) => {
        return c.ISO_A3 === country;
      })[0].name;
      console.log(name);
      setCountryName(name);
    }
  }, [country]);

  // returns the relevant color code depending on the restriction level
  const getColour = (indicator, value, threeLetter) => {
    // if there is a country selected and it's not the current country, set it to grey
    if (country !== "" && country !== threeLetter) {
      return "#888888";
    }

    // no data
    if (value == null) {
      return "#c4c5c6";
    }

    if (indicator === "C2") {
      // value 0 to 3
      switch (value) {
        case 0:
          return "#21b955";
        case 1:
          return "#00d4ff";
        case 2:
          return "#ff8000";
        case 3:
          return "#cc0000";
      }
    } else if (indicator === "C4" || indicator === "C8" || indicator === "H6") {
      // value 0 to 4
      switch (value) {
        case 0:
          return "#21b955";
        case 1:
          return "#00d4ff";
        case 2:
          return "#ffb800";
        case 3:
          return "#ff8000";
        case 4:
          return "#cc0000";
      }
    }
  };

  return (
    <>
      <MapContainer
        style={{ height: "60vh", width: "80vw" }}
        zoom={2}
        center={[51.505, -0.09]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.features.map((feature, i) => {
          let result = null;
          if (allCountryData) {
            const resultObject = allCountryData.Items.filter((item) => {
              // console.log(item, "item");
              return item.uuid.S === feature.properties.ISO_A3;
            })[0];
            if (resultObject) {
              result =
                resultObject[
                  restriction === "#it"
                    ? "C8_International travel controls"
                    : restriction
                ].S;
              if (result === "nan") {
                result = null;
              } else {
                result = parseInt(result);
              }
            }
          }

          return (
            <GeoJSON
              key={i}
              style={{
                fillColor: getColour("C4", result, feature.properties.ISO_A3),
                weight: 1,
                fillOpacity: 0.65,
                color: "grey",
              }}
              data={feature}
              eventHandlers={{
                click: (e) => {
                  if (country === feature.properties.ISO_A3) {
                    setCountryName("");
                    setCountry("");
                  } else {
                    setCountryName(feature.properties.ADMIN);
                    setCountry(feature.properties.ISO_A3);
                  }
                  // setSelected(feature.properties.ISO_A3);
                  console.log(feature.properties.ISO_A3);
                },
                mouseover: () => {
                  setHover(feature.properties.ADMIN);
                },
              }}
            />
          );
        })}
      </MapContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextBox name={countryName} />
      </div>
    </>
  );
};

export default Map;
