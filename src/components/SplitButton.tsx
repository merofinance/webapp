import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core";
import Selector, { SelectorOptionType } from "./Selector";

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
});

interface ButtonType {
  value: string;
  label: string;
  action: () => void;
}

interface Props {
  buttons: ButtonType[];
}

const SplitButton = ({ buttons }: Props): JSX.Element => {
  const options: SelectorOptionType[] = buttons.map((button: ButtonType) => {
    return { value: button.value, label: button.label };
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selected, setSelected] = useState(options[0]);

  const handleClick = () => {
    console.info(`You clicked ${selected}`);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick} className={classes.left}>
            {selected.label}
          </Button>
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={() => setOpen(true)}
            className={classes.right}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Selector
          open={open}
          anchorRef={anchorRef}
          options={options}
          selected={selected.value}
          close={() => setOpen(false)}
          select={(v: string) =>
            setSelected(options.filter((o: SelectorOptionType) => o.value === v)[0])
          }
        />
      </Grid>
    </Grid>
  );
};

export default SplitButton;
