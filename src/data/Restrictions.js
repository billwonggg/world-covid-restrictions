export const Restrictions = [
  {
    name: "International Travel Controls",
    value: "C8",
  },
  { name: "Gathering Restrictions", value: "C4" },
  { name: "Workplace Closing", value: "C2" },
  { name: "Facial Coverings", value: "H6" },
];

const noRules = [
  {
    col: "#888888",
    desc: "No Data",
  },
  {
    col: "#21b955",
    desc: "No Restrictions",
  },
];

export const Travel = noRules.concat([
  {
    col: "#00d4ff",
    desc: "Screening Arrivals",
  },
  {
    col: "#ffb800",
    desc: "Quarantine arrivals from some or all regions",
  },
  {
    col: "#ff8000",
    desc: "Ban arrivals from some regions",
  },
  {
    col: "#cc0000",
    desc: "Ban on all regions or total border closure",
  },
]);

export const Gathering = noRules.concat([
  {
    col: "#00d4ff",
    desc: "Restrictions on 1000+ people",
  },
  {
    col: "#ffb800",
    desc: "Restrictions on 101-1000 people",
  },
  {
    col: "#ff8000",
    desc: "Restrictions on 11-100 people",
  },
  {
    col: "#cc0000",
    desc: "Restrictions on 10 people or less",
  },
]);

export const FaceCovering = [
  {
    col: "#888888",
    desc: "No Data",
  },
  {
    col: "#21b955",
    desc: "No Policy",
  },
  {
    col: "#00d4ff",
    desc: "Recommended",
  },
  {
    col: "#ffb800",
    desc: "Required in some shared/public spaces",
  },
  {
    col: "#ff8000",
    desc: "Required in all shared/public spaces",
  },
  {
    col: "#cc0000",
    desc: "Required outside the home at all times",
  },
];

export const Workplace = noRules.concat([
  {
    col: "#00d4ff",
    desc: "Recommend closing ",
  },
  {
    col: "#ff8000",
    desc: "Require closing for some sectors",
  },
  {
    col: "#cc0000",
    desc: "Require closing for all-but-essential workplaces",
  },
  {
    col: "",
    desc: "",
  },
]);
