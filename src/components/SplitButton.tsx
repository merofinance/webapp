import React from "react";
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

const options = ["Claim & Stake", "Claim"];

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

interface ButtonType {
  label: string;
  action: () => void;
}

interface Props {
  buttons: ButtonType[];
}

export default function SplitButton({ buttons }: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event: any, index: number, action: () => void) => {
    setSelectedIndex(index);
    setOpen(false);
    action();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick} className={classes.left}>
            {options[selectedIndex]}
          </Button>
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            className={classes.right}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
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
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {buttons.map((button: ButtonType, index) => (
                      <MenuItem
                        key={button.label}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index, button.action)}
                        className={classes.menuItem}
                      >
                        {button.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
