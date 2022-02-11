import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

//REPLACE ALL HARD VALUES WITH API CALL WITH PROPS

/*
TAB 1 CONTENT
-	Date of policy (DD-MM-YYY)
-	Cases per capita

-	Restrictions on internal travels (C7)
        0: Public transport is open but with social distancing and mask wearing requirements.
        1: The use of public transport is discouraged.
        2: The general public is prohibited from using public transport
-	International travel controls (C8)
        0: There are no restrictions on international travel.
        1: Passengers are screened upon arrival.
        2: International arrivals may be need to quarantine depending on their country of departure. 
        3: International arrivals may be banned from entering depending on their country of departure 
        4: Borders are closed entirely for all arrivals.


*/
function dateOfPolicy() {
  return <div>Effective as of: Feb 2022</div>;
}

function tab1InternalTravelRestrictions(severity) {
  if (severity == null) {
    return (
      <div>
        No information about internal travel restrictions.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        Public transport is open but with social distancing and mask wearing
        requirements.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        The use of public transport is discouraged.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        The general public is prohibited from using public transport.<br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about internal travel restrictions.<br></br>
      </div>
    );
  }
}

function tab1InternationalTravelRestrictions(severity) {
  if (severity == null) {
    return (
      <div>
        No information about international travel restrictions.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        There are no restrictions on international travel.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        Passengers are screened upon arrival.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        International arrivals may be need to quarantine depending on their
        country of departure.<br></br>
      </div>
    );
  }
  if (severityLevel == 3) {
    return (
      <div>
        International arrivals may be banned from entering depending on their
        country of departure.<br></br>
      </div>
    );
  }
  if (severityLevel == 4) {
    return (
      <div>
        Borders are closed entirely for all arrivals.<br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about international travel restrictions.<br></br>
      </div>
    );
  }
}

/*
TAB 2 CONTENT
-	Date of policy (DD-MM-YYY)
-	Facial coverings
        0: There is no policy about facial coverings.
        1: Facial coverings are recommended. 
        2: Facial coverings are required in some public spaces.
        3: Facial coverings are required in all public spaces
        4: Facial coverings are required at all times outside of residence.
*/

function tab2FacialCoverings(severity) {
  if (severity == null) {
    return (
      <div>
        No information about facial coverings is available.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        There is no policy about facial coverings.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        Facial coverings are recommended.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        Facial coverings are required in some public spaces.<br></br>
      </div>
    );
  }
  if (severityLevel == 3) {
    return (
      <div>
        Facial coverings are required in all public spaces.<br></br>
      </div>
    );
  }
  if (severityLevel == 4) {
    return (
      <div>
        Facial coverings are required at all times outside of residence.
        <br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about facial coverings is available.<br></br>
      </div>
    );
  }
}

/*
TAB 3 CONTENT
-	Date of policy (DD-MM-YYY)
-	Workplace Closing (C2)
        0:  There are no workplace closures.
        1: It is recommended that workplaces close.
        2: Some workplaces are required to close.
        3: Only essential workplaces can be open. 
-	Cancel Public Events
        0: There are no public events cancelled.
        1: Some public events are cancelled.
        2: All gatherings are cancelled. Some regions may allow gatherings for religious reasons or a one-off large event.
-	Gathering Restrictions
        0: There are no gathering restrictions.
        1: Gatherings of over 1000 people are restricted.
        2: Gatherings of 101 to 1000 people are restricted.
        3. Gatherings of 11 to 100 people are restricted.
        4. Gatherings of 10 or less people are restricted
*/
function tab3WorkPlaceClosure(severity) {
  if (severity == null) {
    return (
      <div>
        No information about workplace closures is available.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        There are no workplace closures.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        It is recommended that workplaces close.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        Some workplaces are required to close.<br></br>
      </div>
    );
  }
  if (severityLevel == 3) {
    return (
      <div>
        Only essential workplaces can be open.<br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about workplace closures is available.<br></br>
      </div>
    );
  }
}
function tab3CancelPublicEvents(severity) {
  if (severity == null) {
    return (
      <div>
        No information about public events is available.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        There are no public events cancelled.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        Some public events are cancelled.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        All gatherings are cancelled. Some regions may allow gatherings for
        religious reasons or a one-off large event.<br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about public event cancellation is available.<br></br>
      </div>
    );
  }
}

function tab3GatheringRestrictions(severity) {
  if (severity == null) {
    return (
      <div>
        No information about gathering restrictions is available.<br></br>
      </div>
    );
  }
  const severityLevel = parseInt(severity);
  if (severityLevel == 0) {
    return (
      <div>
        There are no gathering restrictions.<br></br>
      </div>
    );
  }
  if (severityLevel == 1) {
    return (
      <div>
        Gatherings of over 1000 people are restricted.<br></br>
      </div>
    );
  }
  if (severityLevel == 2) {
    return (
      <div>
        Gatherings of 101 to 1000 people are restricted.<br></br>
      </div>
    );
  }
  if (severityLevel == 3) {
    return (
      <div>
        Gatherings of 11 to 100 people are restricted.<br></br>
      </div>
    );
  }
  if (severityLevel == 4) {
    return (
      <div>
        Gatherings of 11 to 100 people are restricted.<br></br>
      </div>
    );
  } else {
    return (
      <div>
        No information about gathering restrictions is available.<br></br>
      </div>
    );
  }
}

/*
        0: There are no gathering restrictions.
        1: Gatherings of over 1000 people are restricted.
        2: Gatherings of 101 to 1000 people are restricted.
        3. Gatherings of 11 to 100 people are restricted.
        4. Gatherings of 10 or less people are restricted
*/

export default function LabTabs({ countryData }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   console.log(countryData.Item.C7_Flag.S.split(/[,\[\]]/));
  //   const c7 = countryData.Item.C7_Flag
  //     ? countryData.Item.C7_Flag.S.split(/[,\[\]]/).slice(1, c7.length - 1)
  //     : [];
  //   const c2 = countryData.Item.C2_Flag
  //     ? countryData.Item.C2_Flag.S.split(/[,\[\]]/).slice(1, c2.length - 1)
  //     : [];
  //   const c3 = countryData.Item.C3_Flag
  //     ? countryData.Item.C3_Flag.S.split(/[,\[\]]/).slice(1, c3.length - 1)
  //     : [];
  //   const c4 = countryData.Item.C4_Flag
  //     ? countryData.Item.C4_Flag.S.split(/[,\[\]]/).slice(1, c4.length - 1)
  //     : [];
  //   const c8 = countryData.Item.C8_Flag
  //     ? countryData.Item.C8_Flag.S.split(/[,\[\]]/).slice(1, c8.length - 1)
  //     : [];
  //   const h6 = countryData.Item.H6_Flag
  //     ? countryData.Item.H6_Flag.S.split(/[,\[\]]/).slice(1, h6.length - 1)
  //     : [];
  //   console.log(c7);
  return (
    <Box sx={{ m: 2, width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Travel Controls" value="1" />
            <Tab label="Health Policies" value="2" />
            <Tab label="Gatherings" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          {dateOfPolicy()}
          {
            tab1InternalTravelRestrictions(1)
            // countryData.C7_Flag.S[countryData.C7_Flag.S.length - 1]
          }
          {tab1InternationalTravelRestrictions(2)}
        </TabPanel>

        <TabPanel value="2">
          {dateOfPolicy()}
          {tab2FacialCoverings(1)}
        </TabPanel>
        <TabPanel value="3">
          {dateOfPolicy()}
          {tab3WorkPlaceClosure(1)}
          {tab3CancelPublicEvents(3)}
          {tab3GatheringRestrictions(2)}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

/*
TAB 1 CONTENT
-	Date of policy (DD-MM-YYY)
-	Cases per capita

-	Restrictions on internal travels (C7)
        0: Public transport is open but with social distancing and mask wearing requirements.
        1: The use of public transport is discouraged.
        2: The general public is prohibited from using public transport
-	International travel controls (C8)
        0: There are no restrictions on international travel.
        1: Passengers are screened upon arrival.
        2: International arrivals may be need to quarantine depending on their country of departure. 
        3: International arrivals may be banned from entering depending on their country of departure 
        4: Borders are closed entirely for all arrivals.


*/
/*
TAB 2 CONTENT
-	Date of policy (DD-MM-YYY)
-	Facial coverings
        0: There is no policy about facial coverings.
        1: Facial coverings are recommended. 
        2: Facial coverings are required in some public spaces.
        3: Facial coverings are required in all public spaces
        4: Facial coverings are required at all times outside of residence.
*/
/*
TAB 3 CONTENT
-	Date of policy (DD-MM-YYY)
-	Workplace Closing (C2)
        0:  There are no workplace closures.
        1: It is recommended that workplaces close.
        2: Some workplaces are required to close.
        3: Only essential workplaces can be open. 
-	Cancel Public Events (C3)
        0: There are no public events cancelled.
        1: Some public events are cancelled.
        2: All gatherings are cancelled. Some regions may allow gatherings for religious reasons or a one-off large event.
-	Gathering Restrictions (C4)
        0: There are no gathering restrictions.
        1: Gatherings of over 1000 people are restricted.
        2: Gatherings of 101 to 1000 people are restricted.
        3. Gatherings of 11 to 100 people are restricted.
        4. Gatherings of 10 or less people are restricted
*/
