import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/countries.json";
import center from "../data/center";
import TextBox from "./TextBox";
import { Countries } from "../data/Countries";
import LegendCard from "./LegendCard";

const Map = ({
  country,
  setCountry,
  countryData,
  allCountryData,
  restriction,
}) => {
  // States
  const [hover, setHover] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    if (country != "") {
      const name = Countries.filter((c) => {
        return c.ISO_A3 === country;
      })[0].name;
      console.log(name);
      setSelectedCountry(name);
    }
  }, [country]);

  useEffect(() => {
    if (hover == null) {
      return;
    }
    hover.target.options.style.color = "black";
    hover.target.options.style.weight = 2;
  }, [hover]);

  // returns the relevant color code depending on the restriction level
  const idxToPerc = (indicator, value) => {
    switch (indicator) {
      // values between 0 and 2
      case "C3":
      case "C5":
        return 100 * (value / 2.0);
      // values between 0 and 3
      case "C1":
      case "C2":
      case "C6":
      case "H2":
        return 100 * (value / 3.0);
      // values between 0 and 4
      case "C4":
      case "C8":
      case "H6":
        return 100 * (value / 4.0);
      // values between 0 and 5
      case "H7":
        return 100 * (value / 5.0);
    }
    return 0;
  };

  const percToColor = (perc, threeLetter) => {
    // if there is a country selected and it's not the current country, set it to grey
    if (country !== "" && country !== threeLetter) {
      return "#888888";
    }
    // no data
    if (perc == null) {
      return "#c4c5c6";
    }
    // gradient from green (0) to red (100)
    perc = 100 - perc;
    let r = 0;
    let g = 0;
    let b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  };
  // console.log(countryData, "cd");

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
          const ISO = feature.properties.ISO_A3;
          const NAME = feature.properties.ADMIN;
          let val = null;
          if (country !== "" && countryData != null) {
            // there is a selected country
            for (let i = 0; i < countryData.length; i++) {
              if (countryData[i].policy_type_code === restriction) {
                console.log(countryData[i].policyvalue_actual, "filter");
                val = idxToPerc(
                  countryData[i].policy_type_code,
                  countryData[i].policyvalue_actual
                );
              }
            }
          } else if (allCountryData && allCountryData[ISO]) {
            val = allCountryData[ISO].stringency;
          }
          const color = percToColor(val, ISO);
          return (
            <GeoJSON
              key={i}
              style={{
                fillColor: color,
                weight: 1,
                fillOpacity: 0.65,
                color: "grey",
              }}
              data={feature}
              eventHandlers={{
                click: () => {
                  if (country === ISO) {
                    setSelectedCountry("");
                    setCountry("");
                  } else {
                    setSelectedCountry(NAME);
                    setCountry(ISO);
                  }
                  console.log(ISO);
                },
                mouseover: (e) => {
                  // console.log(e);
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup>
                <h1>{NAME}</h1>
              </Popup>
            </GeoJSON>
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
        <TextBox name={selectedCountry} />
      </div>
    </>
  );
};

export default Map;
