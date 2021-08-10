import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { ChangeEvent, ReactNode } from "react";

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    color: "red",
  },
  select: {
    color: "var(--main)",
    marginTop: 2,
    fontWeight: 400,
    letterSpacing: 0.15,
    textTransform: "capitalize",
    marginRight: 10,

    fontSize: 16,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:600px)"]: {
      fontSize: 12,
    },
  },
  icon: {
    transform: "scale(1.5) translate(-4px, 2px)",
  },
  dropdownStyle: {
    backgroundColor: "#433b6b",
  },
  menuItem: {
    color: "var(--main)",
    fontWeight: 400,
    letterSpacing: 0.15,
    textTransform: "capitalize",
    transition: "all 0.3s",

    fontSize: 16,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:600px)"]: {
      fontSize: 12,
      minHeight: 0,
    },

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
}));

type Props = {
  formik: any;
  name: string;
  options: string[];
};

const Dropdown = ({ formik, name, options }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={formik.values[name]}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        displayEmpty
        className={classes.select}
        MenuProps={{ classes: { paper: classes.dropdownStyle } }}
        classes={{ icon: classes.icon }}
        disableUnderline
      >
        <MenuItem value="" className={classes.menuItem}>
          choose
        </MenuItem>
        {options.map((option: string) => (
          <MenuItem key={option} value={option} className={classes.menuItem}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
