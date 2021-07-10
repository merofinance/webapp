import React from "react";
import styled from "styled-components";
import Accordion from "../../components/Accordion";
import Asset from "../../components/Asset";
import GradientText from "../../styles/GradientText";

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Claimable = styled(GradientText)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const Apr = styled.div`
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
`;

interface Props {
  open: boolean;
  toggle: () => void;
}

const ClaimAccordion = ({ open, toggle }: Props) => {
  return (
    <Accordion
      header={
        <Header>
          <Asset
            token={{
              address: "skdfj",
              name: "DAI",
              symbol: "DAI",
              decimals: 16,
            }}
          />
          <Claimable>$430.00</Claimable>
        </Header>
      }
      content={<p>meow</p>}
      open={open}
      toggle={toggle}
    />
  );
};

export default ClaimAccordion;
