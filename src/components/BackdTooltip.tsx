import { ReactChild, ReactNode, useState } from "react";
import styled from "styled-components";
import { makeStyles, Tooltip } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import standardInfo from "../assets/ui/info.svg";
import highlightedInfo from "../assets/ui/highlighted-info.svg";
import { useDevice } from "../app/hooks/use-device";

export interface TooltipItemType {
  label: string;
  value: string;
}

const Icon = styled.img`
  position: relative;
  cursor: pointer;

  margin-left: 0.9rem;
  margin-top: 0.2rem;
  height: 1.2rem;
  @media (max-width: 600px) {
    margin-top: 2.2px;
    margin-left: 0.6rem;
    height: 1rem;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Value = styled.div`
  font-size: 1.3rem;
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
  children: ReactNode;
  items?: TooltipItemType[];
  info?: boolean;
}

const BackdTooltip = ({ children, items, info }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
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
        <Tooltip
          arrow
          title={
            <>
              {children}
              {items && (
                <Items>
                  {items.map((item: TooltipItemType) => (
                    <Item key={item.label}>
                      <Value>{item.label}</Value>
                      <Value>{item.value}</Value>
                    </Item>
                  ))}
                </Items>
              )}
            </>
          }
          classes={tooltipStyles()}
        >
          <Icon
            src={info ? highlightedInfo : standardInfo}
            alt="help icon"
            onClick={handleTooltipOpen}
          />
        </Tooltip>
      )}
      {isMobile && (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              arrow
              title={children as ReactChild}
              classes={tooltipStyles()}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <Icon
                src={info ? highlightedInfo : standardInfo}
                alt="help icon"
                onClick={handleTooltipOpen}
              />
            </Tooltip>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

export default BackdTooltip;
