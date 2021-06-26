import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import { makeStyles, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  selectEmpty: {
    color: "var(--main)",
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: 400,
    textTransform: "capitalize",
    padding: 0,
  },
  menuStyle: {
    borderRadius: 4,
    backgroundColor: "#433B6B",
  },
  menuItem: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: 400,
    textTransform: "capitalize",
    "&:focus": {
      backgroundColor: "rgba(255,255,255,0)",
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
  },
  icon: {
    fill: "var(--main)",
    transform: "scale(1.5) translateX(-3px)",
    marginTop: 4,
  },
}));

type Props = {
  value: string;
  options: string[];
  setValue: (v: string) => void;
};

const Dropdown = (props: Props) => {
  const classes = useStyles();

  return (
    <Select
      value={props.value}
      onChange={(e: any) => props.setValue(e.target.value)}
      displayEmpty
      className={classes.selectEmpty}
      inputProps={{ classes: { icon: classes.icon } }}
      MenuProps={{ classes: { paper: classes.menuStyle } }}
    >
      <MenuItem value="" disabled className={classes.menuItem}>
        Choose
      </MenuItem>
      {props.options.map((option: string) => (
        <MenuItem value={option} className={classes.menuItem}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
