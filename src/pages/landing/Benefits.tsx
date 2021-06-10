import React from "react";
import styled from "styled-components";
import GradientText from "../../styles/GradientText";
import shield from "../../assets/benefits/shield.svg";
import plus from "../../assets/benefits/plus.svg";
import percent from "../../assets/benefits/percent.svg";
import { Header5, Header6 } from "../../styles/Headers";

type BenfitsType = {
  icon: string;
  header: string;
  content: string;
};

const benefits: BenfitsType[] = [
  {
    icon: shield,
    header: "Avoid Liquidation",
    content:
      "Liquidity deposited in Backd and marked as back-up collateral will be automatically shifted when needed for collateral top-ups.",
  },
  {
    icon: plus,
    header: "Earn Yield",
    content: "Earn interest on liquidity via yield-farming strategies such as Curve and Convex.",
  },
  {
    icon: percent,
    header: "Fee share",
    content: "Fixed percentage fee of x% is charged on the top-up amount & distributed among LPs",
  },
];

const StyledBenefits = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 7.9rem;
  margin-bottom: 2rem;
`;

const ReadMoreButton = styled.button`
  display: flex;
  align-items: center;
`;

const ReadMoreText = styled(GradientText)``;

const ReadMoreIcon = styled.img``;

const Benefits = () => {
  return (
    <StyledBenefits>
      {benefits.map((benefit: BenfitsType) => (
        <Benefit>
          <Icon src={benefit.icon} />
          <Header5>{benefit.header}</Header5>
          <Header6>{benefit.content}</Header6>
          <ReadMoreButton>
            <ReadMoreText>Read more</ReadMoreText>
            <ReadMoreIcon />
          </ReadMoreButton>
        </Benefit>
      ))}
    </StyledBenefits>
  );
};

export default Benefits;
