import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Restrictions } from "../data/Restrictions";

// returns a line of text with the indicator score
const getIndicator = (r, val) => {
  if (val == null) {
    return;
  }
  switch (r) {
    // values between 0 and 2
    case "C3":
    case "C5":
      return `${val} / 2`;
    // values between 0 and 3
    case "C1":
    case "C2":
    case "C6":
    case "H2":
      return `${val} / 3`;
    // values between 0 and 4
    case "C4":
    case "C8":
    case "H6":
      return `${val} / 4`;
    // values between 0 and 5
    case "H7":
      return `${val} / 5`;
    default:
      return;
  }
};
// Returns the description depending on the restriction and level
// prettier-ignore
const getText = (r, val) => {
  if (val == null) {
    switch(r) {
      case "C1": return <div>No information about school closure is available.</div>
      case "C2": return <div>No information about workplace closure is available.</div>
      case "C4": return <div>No information about restrictions on gatherings are available.</div>
      case "C8": return <div>No information about international travel controls are available.</div>
      case "H2": return <div>No information about testing policy is available.</div>
      case "H6": return <div>No information about facial coverings are available.</div>
      case "H7": return <div>No information about vaccination policy is available.</div>
      default:
        return;
    }
  }
  if (r === "C1") {
    switch (val) {
      case(0): return <div>There are no restrictions on school closures.</div>
      case(1): return <div>Recommend closing or all schools open with alterations resulting in significant differences compared to non-Covid-19 operations.</div>
      case(2): return <div>Some schools are only open for exams, but not for classes. Other schools are only being open for some groups.</div>
      case(3): return <div>All schools remain closed due to policies in place. In-person teaching is suspended and all instruction is online.</div>
      default:
        return;
    }
  } else if (r === "C2") {
    switch (val) {
      case(0): return <div>There are no restrictions on workplace closures.</div>
      case(1): return <div>Workplaces can reopen under sanitation and social distancing requirements. E.g. up to 30% of capacity, and only outdoor seats.</div>
      case(2): return <div>Require closing (or work from home) for some sectors or categories of workers.</div>
      case(3): return <div>Require closing (or work from home) for all-but-essential workplaces. (e.g. grocery stores, doctors) </div>
      default:
        return;
    }
  } else if (r === "C4") {
    switch (val) {
      case(0): return <div>There are no restrictions on gatherings.</div>
      case(1): return <div>Gatherings of over 1000 people are restricted.</div>
      case(2): return <div>Gatherings of 101 to 1000 people are restricted.</div>
      case(3): return <div>Gatherings of 11 to 100 people are restricted.</div>
      case(4): return <div>Gatherings of 10 or less people are restricted.</div>
      default:
        return;
    }
  } else if (r === "C8") {
    switch (val) {
      case(0): return <div>There are no restrictions on international travel.</div>
      case(1): return <div>All passengers are screened upon arrival.</div>
      case(2): return <div>International arrivals may be need to quarantine depending on their country of departure.</div>
      case(3): return <div>International arrivals may be banned from entering depending on their country of departure.</div>
      case(4): return <div>Borders are closed entirely for all arrivals.</div>
      default:
        return;
    }
  } else if (r === "H2") {
    switch (val) {
      case(0): return <div>There is no testing policy in place.</div>
      case(1): return <div>PCR tests only available to those who have symptoms and meet specific criteria.</div>
      case(2): return <div>Announcement of a broader plan that includes funding and mobilizing resources to support local testing. Testing of anyone showing Covid-19 symptoms.</div>
      case(3): return <div>Widespread testing capacity reported for whoever wants it and good evidence that there is capacity on the ground to meet this.</div>
      default:
        return;
    }
  } else if (r === "H6") {
    switch (val) {
      case(0): return <div>There is no policy about facial coverings in place.</div>
      case(1): return <div>Facial coverings are recommended.</div>
      case(2): return <div>Required in some specified shared/public spaces outside the home with other people present, or some situations when social distancing not possible.</div>
      case(3): return <div>Required in all shared/public spaces outside the home with other people present or all situations when social distancing not possible.</div>
      case(4): return <div>Required outside the home at all times regardless of location or presence of other people.</div>
      default:
        return;
    }
  } else if (r === "H7") {
    switch (val) {
      case(0): return <div>There is no vaccination policy in place.</div>
      case(1): return <div>Availability for ONE of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups.</div>
      case(2): return <div>Availability for TWO of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups.</div>
      case(3): return <div>Availability for ALL of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups.</div>
      case(4): return <div>The vaccine is available to almost everyone 18+.</div>
      case(5): return <div>The vaccine is available to everyone 16+ or 18+ (the lowest age permitted by the vaccine brand currently), and there is evidence that this is taking place on the ground.</div>
      default:
        return;
    }
  }
}

const InfoTabs = ({ countryName, date, countryData, restriction, setRestriction }) => {
  const handleChange = (e, newValue) => {
    setRestriction(newValue);
  };

  const arr = date.split("-");
  const d = `${arr[2]}/${arr[1]}/${arr[0]}`;
  return (
    <>
      <div>
        <h2>
          Restrictions for {countryName} on {d}
        </h2>
      </div>

      {countryData && countryData[0].policy_type_code === "NONE" ? (
        <div>No data from Oxford Covid Policy Tracker for {countryName}.</div>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              onChange={handleChange}
              aria-label="scrollable auto tabs example"
              variant="scrollable"
              scrollButtons
              value={restriction}
            >
              {Restrictions.map((r, i) => (
                <Tab key={i} label={r.name} value={r.value} />
              ))}
            </Tabs>
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

            return val != null && r.value === restriction ? (
              <Box key={i} value={r.value} m={3}>
                Sub-index score: <strong>{getIndicator(r.value, val)}</strong>
                . (Higher values indicates stricter policy) <br />
                <br />
                {getText(r.value, val)}
              </Box>
            ) : null;
          })}
        </Box>
      )}
    </>
  );
};

export default InfoTabs;
