import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";

import { useTranslation } from "react-i18next";

interface DropdownOption {
  label: string;
  action: () => void;
}

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 1,
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

interface Props {
  label?: string;
  options: DropdownOption[];
}

const Dropdown = ({ label, options }: Props): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Select
        value=""
        displayEmpty
        className={classes.select}
        MenuProps={{ classes: { paper: classes.dropdownStyle } }}
        classes={{ icon: classes.icon }}
        disableUnderline
      >
        <MenuItem value="" className={classes.menuItem}>
          {label || t("components.dropdownChoose")}
        </MenuItem>
        {options.map((option: DropdownOption) => (
          <MenuItem
            key={option.label}
            value={option.label}
            onClick={() => option.action()}
            className={classes.menuItem}
          >
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
