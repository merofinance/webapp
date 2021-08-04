import React from "react";
import styled from "styled-components";
import Accordion from "../../components/Accordion";
import AccordionChevron from "../../components/AccordionChevron";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import { useDevice } from "../../lib/hooks";
import GradientText from "../../styles/GradientText";
import ClaimRow from "./ClaimRow";

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
  line-height: 2.7rem;
  letter-spacing: 0.15px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const Apr = styled.div`
  flex: 1;
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const EndContainer = styled.div`
  flex: 1.8;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }

  @media (max-width: 600px) {
    flex: 0.3;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.9rem 0;
`;

const Breakdown = styled.div`
  font-weight: 500;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-bottom: 2.4rem;
  margin-left: 1.6rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

interface Props {
  open: boolean;
  toggle: () => void;
  rows: string[];
}

const ClaimAccordion = ({ open, toggle, rows }: Props) => {
  const { isMobile, isDesktop } = useDevice();

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
          <Apr>5.2%</Apr>
          <EndContainer>
            {isDesktop && (
              <Button
                text="Claim all"
                background="#1c0c37"
                width="12rem"
                small={isMobile}
                primary={isMobile}
              />
            )}
            {isDesktop && <Button primary text="Claim all & Stake" width="18rem" />}
            <AccordionChevron open={open} />
          </EndContainer>
        </Header>
      }
      content={
        <ContentContainer>
          <Breakdown>Breakdown of claimable earnings:</Breakdown>
          {rows.map((row: string, index: number) => (
            <ClaimRow key={row} index={index} />
          ))}
        </ContentContainer>
      }
      open={open}
    />
  );
};

export default ClaimAccordion;
