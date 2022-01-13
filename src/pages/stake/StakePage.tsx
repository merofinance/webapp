import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import StakeSummary from "./StakeSummary";
import StakeAccordion from "./StakeAccodion";

const pools: string[] = ["meow", "woof"];

const StyledStakePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    > div:first-child {
      flex: 1.3;
    }
  }
`;

interface HeaderProps {
  hideMobile?: boolean;
}

const Header = styled.div`
  flex: 1;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.6;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    display: ${(props: HeaderProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const ArrowHeader = styled.div`
  flex: 0.2;

  @media (min-width: 601px) {
    margin-right: 1.8rem;
  }
`;

const StakePage = (): JSX.Element => {
  const { t } = useTranslation();
  const [activePool, setActivePool] = useState<number | null>(0);

  const isOpen = (index: number): boolean => activePool !== null && activePool === index;

  return (
    <StyledStakePage>
      <Seo title={t("metadata.stake.title")} description={t("metadata.stake.description")} />
      <StakeSummary />
      <Headers>
        <Header>{t("headers.asset")}</Header>
        <Header hideMobile>{t("headers.claimable")}</Header>
        <Header>{t("headers.apr")}</Header>
        <Header>{t("headers.staked")}</Header>
        <Header hideMobile>{t("headers.tvl")}</Header>
        <ArrowHeader />
      </Headers>
      {pools.map((pool: string, index: number) => (
        <StakeAccordion
          key={pool}
          open={isOpen(index)}
          toggle={() => {
            if (isOpen(index)) setActivePool(null);
            else setActivePool(index);
          }}
        />
      ))}
    </StyledStakePage>
  );
};

export default StakePage;
