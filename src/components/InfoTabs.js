import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Restrictions } from "../data/Restrictions";

// Returns the description depending on the restriction and level
// prettier-ignore
const getText = (r, val) => {
  if (val == null) {
    switch(r) {
      case "C1": return <div>No information about school closures are available.</div>
      case "C2": return <div>No information about workplace closure is available.</div>
      case "C4": return <div>No information about restrictions on gatherings are available.</div>
      case "C8": return <div>No information about international travel controls are available.</div>
      case "H2": return <div>No information about testing policy is available.</div>
      case "H6": return <div>No information about facial coverings are available.</div>
      case "H7": return <div>No information about vaccination policy is available.</div>
    }
  }
  if (r === "C1") {
    switch (val) {
      case(0): return <div>There are no restrictions on school closures.</div>
      case(1): return <div>Schools are recommended to close. Some schools are preparing to transition to online learning.</div>
      case(2): return <div>Some schools are only open for exams, but not for classes. Other schools only being open for some groups.</div>
      case(3): return <div>All schools remain closed due to policies in place. In-person teaching is suspended and all instruction is online.</div>
    }
  } else if (r === "C2") {
    switch (val) {
      case(0): return <div>There are no workplace closures.</div>
      case(1): return <div>If workplaces can reopen under sanitation and social distancing requirements. E.g. up to 30% of capacity, and only outdoor seats.</div>
      case(2): return <div>For phased reopening of businesses, if there are new workplaces being added to the list of places allowed to open every week. But some places still remain closed.</div>
      case(3): return <div>Only essential workplaces can be open.</div>
    }
  } else if (r === "C4") {
    switch (val) {
      case(0): return <div>There are no restrictions on gatherings.</div>
      case(1): return <div>Gatherings of over 1000 people are restricted.</div>
      case(2): return <div>Gatherings of 101 to 1000 people are restricted.</div>
      case(3): return <div>Gatherings of 11 to 100 people are restricted.</div>
      case(4): return <div>Gatherings of 10 or less people are restricted.</div>
    }
  } else if (r === "C8") {
    switch (val) {
      case(0): return <div>There are no restrictions on international travel.</div>
      case(1): return <div>Passengers are screened upon arrival.</div>
      case(2): return <div>International arrivals may be need to quarantine depending on their country of departure.</div>
      case(3): return <div>International arrivals may be banned from entering depending on their country of departure.</div>
      case(4): return <div>Borders are closed entirely for all arrivals.</div>
    }
  } else if (r === "H2") {
    switch (val) {
      case(0): return <div>There is no testing policy in place.</div>
      case(1): return <div>PCR tests only available to those who have symptoms and meet specific criteria.</div>
      case(2): return <div>Announcement of a broader plan that includes funding and mobilizing resources to support local testing.</div>
      case(3): return <div>Widespread testing capacity reported for whoever wants it and good evidence that there is capacity on the ground to meet this.</div>
    }
  } else if (r === "H6") {
    switch (val) {
      case(0): return <div>There is no policy about facial coverings.</div>
      case(1): return <div>Facial coverings are recommended.</div>
      case(2): return <div>Facial coverings are required in some public spaces.</div>
      case(3): return <div>Facial coverings are required in all public spaces.</div>
      case(4): return <div>Facial coverings are required at all times outside of residence.</div>
    }
  } else if (r === "H7") {
    switch (val) {
      case(0): return <div>There is no vaccination policy in place.</div>
      case(1): return <div>Phase 1 rollout of vaccine, only available to critical people/workers.</div>
      case(2): return <div>Phase 2 rollout of vaccine.</div>
      case(3): return <div>Phase 3 rollout of vaccine.</div>
      case(4): return <div>The vaccine is available to almost everyone 18+.</div>
      case(5): return <div>The vaccine is available to everyone 16+ or 18+ (the lowest age permitted by the vaccine brand currently), and there is evidence that this is taking place on the ground.</div>
    }
  }
}

export default function InfoTabs({ countryData, restriction, setRestriction }) {
  const handleChange = (e, newValue) => {
    setRestriction(newValue);
  };
  // console.log(countryData);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={restriction}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="scrollable auto tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Restrictions.map((r, i) => {
              return <Tab key={i} label={r.name} value={r.value} />;
            })}
          </TabList>
        </Box>

        {Restrictions.map((r, i) => {
          let val = null;
          if (countryData) {
            for (let i = 0; i < countryData.length; i++) {
              if (countryData[i].policy_type_code === r.value) {
                val = countryData[i].policyvalue_actual;
                break;
              }
            }
          }

          return (
            <TabPanel key={i} value={r.value}>
              {getText(r.value, val)}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}
