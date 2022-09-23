import styled from "styled-components";
import { ScaledNumber } from "scaled-number";

import Accordion from "../../components/Accordion";
import Asset from "../../components/Asset";
import { GradientText } from "../../styles/GradientText";
import Tabs from "../../components/Tabs";
import StakeTokens from "./StakeTokens";
import { Token } from "../../lib/types";
import { ZERO_ADDRESS } from "../../lib/constants";
import UnstakeTokens from "./UnstakeTokens";
import AccordionChevron from "../../components/AccordionChevron";
import { useDevice } from "../../app/hooks/use-device";

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;

  height: 6.6rem;
  @media (max-width: 600px) {
    height: 5.6rem;

    > div:nth-child(2) {
      flex: 1.3;
    }
  }
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

  @media (max-width: 600px) {
    display: none;
  }
`;

const Claimable = styled(GradientText)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const Apr = styled.div`
  flex: 1;
  font-weight: 900;
  line-height: 2rem;
  letter-spacing: 0.15px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;

    background: var(--gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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

  @media (max-width: 600px) {
    display: none;
  }
`;

const ValueUsd = styled.div`
  font-weight: 400;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-left: 0.8rem;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const Tvl = styled.div`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const EndContainer = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  open: boolean;
  toggle: () => void;
}

const StakeAccordion = ({ open, toggle }: Props): JSX.Element => {
  const { isDesktop } = useDevice();

  const token: Token = {
    address: ZERO_ADDRESS,
    name: "DAI",
    symbol: "DAI",
    decimals: 16,
  };

  return (
    <Accordion
      header={
        <Header>
          <HeaderButton onClick={toggle} />
          <AssetContainer>
            <Asset token={token} large />
          </AssetContainer>
          <ClaimableContainer>
            <Claimable>$430.00</Claimable>
          </ClaimableContainer>
          <Apr>5.2%</Apr>
          <ValueContainer>
            <ValueToken>40 MERO</ValueToken>
            <ValueUsd>{`${
              isDesktop ? "=$3200.93" : ScaledNumber.fromUnscaled(3200.93).toCompactUsdValue(1)
            }`}</ValueUsd>
          </ValueContainer>
          <Tvl>$30,034</Tvl>
          <EndContainer>
            <AccordionChevron open={open} />
          </EndContainer>
        </Header>
      }
      open={open}
    >
      <ContentContainer>
        <Tabs
          tabs={[
            {
              label: "stake.tabs.stake.header",
              content: <StakeTokens token={token} />,
            },
            {
              label: "stake.tabs.unstake.header",
              content: <UnstakeTokens token={token} />,
            },
          ]}
        />
      </ContentContainer>
    </Accordion>
  );
};

export default StakeAccordion;
