import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/countries.json";
import { Countries } from "../data/Countries";
import Legend from "./Legend";

const Map = ({
  country,
  setCountry,
  countryName,
  setCountryName,
  countryData,
  allCountryData,
  restriction,
}) => {
  // States
  const [map, setMap] = useState(null);
  // const [hover, setHover] = useState(null);

  // latitude and longitude for the popup to show
  const [latlng, setLatLng] = useState(null);
  useEffect(() => {
    // get the latlng for the popup and full name of country
    let latitude = null,
      longitude = null,
      name = null;
    for (let i = 0; i < Countries.length; i++) {
      if (country === Countries[i].ISO_A3) {
        latitude = Countries[i].center_lat;
        longitude = Countries[i].center_lng;
        name = Countries[i].name;
        break;
      }
    }
    if (name) {
      setCountryName(name);
    }
    if (latitude == null) {
      // no valid coordinates
      setLatLng(null);
      return;
    }
    setLatLng({ lat: latitude, lng: longitude });
    setCountryName(name);
  }, [country]);

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
      default:
        return 0;
    }
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

  // console.log(allCountryData);
  // console.log(countryData, "cd");
  return (
    <>
      <MapContainer
        style={{ height: "55vh", width: "90vw", maxWidth: "2000px" }}
        zoom={2}
        center={[51.505, -0.09]}
        whenCreated={setMap}
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
                    setCountryName("");
                    setCountry("");
                  } else {
                    setCountryName(NAME);
                    setCountry(ISO);
                  }
                },
                mouseover: (e) => {},
                mouseout: (e) => {},
              }}
            ></GeoJSON>
          );
        })}
        {latlng && (
          <Popup position={latlng}>
            <strong>{countryName}</strong>
          </Popup>
        )}
        <Legend map={map} />
      </MapContainer>
    </>
  );
};

export default Map;
