import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

const Legend = ({ map }) => {
  const getColor = (perc) => {
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

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        const grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        let labels = [];
        let from;
        let to;
        for (let i = 0; i < grades.length - 1; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
            '<i style="background: ' +
              getColor(from + 1) +
              '"></i> ' +
              from +
              "&ndash;" +
              to
          );
        }
        labels.push('<i style="background: #c4c5c6"></i> No Data');
        div.innerHTML = labels.join("<br>");
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
};

export default Legend;
