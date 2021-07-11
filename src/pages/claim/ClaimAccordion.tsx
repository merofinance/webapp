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

const AssetContainer = styled.div`
  flex: 1;
`;

const Claimable = styled(GradientText)`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const Apr = styled.div`
  flex: 1;
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
          <AssetContainer>
            <Asset
              token={{
                address: "skdfj",
                name: "DAI",
                symbol: "DAI",
                decimals: 16,
              }}
            />
          </AssetContainer>
          <Claimable>$430.00</Claimable>
          <Apr>5.2%</Apr>
        </Header>
      }
      content={<p>meow</p>}
      open={open}
      toggle={toggle}
    />
  );
};

export default ClaimAccordion;
