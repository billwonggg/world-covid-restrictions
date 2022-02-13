import React from "react";

const Description = () => {
  return (
    <>
      <h2>World Stringency Index</h2>

      <div style={{ textAlign: "left" }}>
        <p>
          The above index records the strictness of "lockdown style" policies
          that primarily restrict people's behaviour. It is calculated using all
          ordinal containment and closure policy indicators.
        </p>
        <p>
          The data above is from the{" "}
          <a
            href="https://github.com/OxCGRT/covid-policy-tracker"
            target="_blank"
          >
            Oxford COVID-19 Government Response Tracker (OxCGRT)
          </a>
          , Blavatnik School of Government, University of Oxford.
        </p>
        <p>
          Click or select a country to see its sub-indicators across 7 different
          categories. Click on the same country again to deselect it.
        </p>
      </div>
    </>
  );
};

export default Description;
