import React from "react";
import styled from "styled-components";
import Accordion from "../../components/Accordion";
import Asset from "../../components/Asset";
import GradientText from "../../styles/GradientText";
import accordionChevron from "../../assets/ui/accordion-chevron.svg";

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 0 1.6rem;
  height: 6.6rem;
  display: flex;
  align-items: center;
`;

const HeaderButton = styled.button`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const AssetContainer = styled.div`
  flex: 1;
`;

const ClaimableContainer = styled.div`
  flex: 1;
`;

const Claimable = styled(GradientText)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const Value = styled.div`
  flex: 1;
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
`;

const ValueContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const ValueToken = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const ValueUsd = styled.div`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-left: 0.8rem;
`;

const EndContainer = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }
`;

interface ArrowProps {
  open: boolean;
}

const Arrow = styled.img`
  width: 1.2rem;
  margin-right: 1.6rem;
  margin-left: 3.2rem;
  transition: transform 0.3s;
  transform: ${(props: ArrowProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  user-drag: none;
  user-select: none;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.9rem 0;
`;

interface Props {
  open: boolean;
  toggle: () => void;
  rows: string[];
}

const StakeAccordion = ({ open, toggle, rows }: Props) => {
  return (
    <Accordion
      header={
        <Header>
          <HeaderButton onClick={toggle} />
          <AssetContainer>
            <Asset
              token={{
                address: "skdfj",
                name: "DAI",
                symbol: "DAI",
                decimals: 16,
              }}
              large
            />
          </AssetContainer>
          <ClaimableContainer>
            <Claimable>$430.00</Claimable>
          </ClaimableContainer>
          <Value>5.2%</Value>
          <ValueContainer>
            <ValueToken>40 BKD</ValueToken>
            <ValueUsd>=$3200.93</ValueUsd>
          </ValueContainer>
          <Value>$30,034</Value>
          <EndContainer>
            <Arrow open={open} src={accordionChevron} />
          </EndContainer>
        </Header>
      }
      content={<ContentContainer></ContentContainer>}
      open={open}
    />
  );
};

export default StakeAccordion;
