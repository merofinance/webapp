import styled from "styled-components";
import { makeStyles, Tooltip } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import info from "../assets/ui/info.svg";
import { useDevice } from "../app/hooks/use-device";

const Icon = styled.img`
  position: relative;
  cursor: pointer;

  margin-left: 0.9rem;
  height: 1.2rem;
  @media (max-width: 600px) {
    margin-top: 2.2px;
    margin-left: 0.6rem;
    height: 1rem;
  }
`;

const tooltipStyles = makeStyles(() => ({
  arrow: {
    color: "#433b6b",
  },
  tooltip: {
    backgroundColor: "#433b6b",
    fontSize: 13,
  },
}));

interface Props {
  content: string;
}

const BackdTooltip = ({ content }: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useDevice();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {!isMobile && (
        <Tooltip arrow title={content} classes={tooltipStyles()}>
          <Icon src={info} alt="help icon" onClick={handleTooltipOpen} />
        </Tooltip>
      )}
      {isMobile && (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              arrow
              title={content}
              classes={tooltipStyles()}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <Icon src={info} alt="help icon" onClick={handleTooltipOpen} />
            </Tooltip>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

export default BackdTooltip;
