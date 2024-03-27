import React from "react";

const Description = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <p>
        The above map shows the stringency index for each country, which is the
        strictness of "lockdown style" policies that primarily restrict people's
        behaviour. It is measured as a value between 0 and 100, where a higher
        score indicates a stricter response (i.e. 100 = strictest response).
      </p>

      <p>
        Click or select a country to see its sub-indicators across 7 different
        categories. Click on the same country again to deselect it.
      </p>
      <h3>Data Sources</h3>
      <p>
        The data above is from the{" "}
        <a
          href="https://github.com/OxCGRT/covid-policy-tracker"
          target="_blank"
          rel="noreferrer"
        >
          Oxford COVID-19 Government Response Tracker (OxCGRT)
        </a>
        , Blavatnik School of Government, University of Oxford.
      </p>
    </div>
  );
};

export default Description;
