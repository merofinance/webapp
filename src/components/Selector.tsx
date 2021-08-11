import React, { RefObject } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core";

export interface SelectorOptionType {
  value: string;
  label: string;
}

const useStyles = makeStyles({
  left: {
    whiteSpace: "nowrap",
    background: "var(--gradient)",
    minWidth: "6rem",
    padding: "0 1rem",
  },
  right: {
    background: "#36B0E6",
    width: "2.6rem",
    minWidth: "0",
  },
  paper: {
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
});

interface Props {
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  options: SelectorOptionType[];
  selected: string;
  close: () => void;
  select: (v: string) => void;
}

const Selector = ({ open, anchorRef, options, selected, close, select }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 100 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={close}>
              <MenuList id="split-button-menu">
                {options.map((option: SelectorOptionType) => (
                  <MenuItem
                    key={option.label}
                    selected={option.value === selected}
                    onClick={() => {
                      select(option.value);
                      close();
                    }}
                    className={classes.menuItem}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default Selector;
