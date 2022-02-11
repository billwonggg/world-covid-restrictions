import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/countries.json";
import TextBox from "./TextBox";
import { Countries } from "../data/Countries";
import LegendCard from "./LegendCard";

const Map = ({ country, setCountry, restriction, allCountryData }) => {
  // States
  const [hover, setHover] = useState("");
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

  // returns the relevant color code depending on the restriction level
  const getColour = (indicator, value, threeLetter) => {
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
    return "red";
  };

  const perc2color = (perc, threeLetter) => {
    // if there is a country selected and it's not the current country, set it to grey
    if (country !== "" && country !== threeLetter) {
      return "#888888";
    }
    // no data
    if (perc == null) {
      return "#c4c5c6";
    }
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
          let val = null;
          if (allCountryData && allCountryData[ISO]) {
            val = allCountryData[ISO].stringency;
          }

          return (
            <GeoJSON
              key={i}
              style={{
                fillColor: perc2color(val, feature.properties.ISO_A3),
                weight: 1,
                fillOpacity: 0.65,
                color: "grey",
              }}
              data={feature}
              eventHandlers={{
                click: (e) => {
                  if (country === feature.properties.ISO_A3) {
                    setSelectedCountry("");
                    setCountry("");
                  } else {
                    setSelectedCountry(feature.properties.ADMIN);
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
        <TextBox name={selectedCountry} />
      </div>
    </>
  );
};

export default Map;
