import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";

import {
  Travel,
  FaceCovering,
  Gathering,
  Workplace,
} from "../data/Restrictions";

export default function LegendCard({ restriction }) {
  console.log("restriction value", restriction);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    switch (restriction) {
      case "C8":
        setRules(Travel);
        break;
      case "C2":
        setRules(Workplace);
        break;
      case "C4":
        setRules(Gathering);
        break;
      case "H6":
        setRules(FaceCovering);
        break;
    }
  }, [restriction]);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      style={{ width: "100%" }}
    >
      {rules.map((rule, i) => {
        return (
          <Grid key={i} item xs={4}>
            <ListItemIcon>
              {rule.col && <StarIcon style={{ fill: rule.col }} />}
            </ListItemIcon>
            {rule.desc}
          </Grid>
        );
      })}
    </Grid>
  );
}
