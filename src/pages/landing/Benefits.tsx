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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 7.9rem;
  margin-bottom: 3.5rem;
`;

type IconGlassProps = {
  right: boolean;
  top: boolean;
};

const IconGlass = styled.div`
  position: absolute;
  top: ${(props: IconGlassProps) => (props.top ? "-1rem" : "3.8rem")};
  left: 50%;
  transform: translateX(calc(-50% + ${(props: IconGlassProps) => (props.right ? "3rem" : "-2rem")}))
    rotate(${(props: IconGlassProps) => (!props.right ? "90" : props.top ? "-90" : "0")}deg);
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 13px;
  overflow: hidden;

  backdrop-filter: blur(5px);
  /* Note: backdrop-filter has minimal browser support */
`;

const IconGlassGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(140.22deg, rgba(8, 200, 249, 0.55) 0%, rgba(247, 30, 204, 0.8) 100%);
  opacity: 0.6;
`;

const ReadMoreButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ReadMoreText = styled(GradientText)`
  font-weight: 400;
  font-size: 2.1rem;
`;

const ReadMoreIcon = styled.img``;

const Benefits = () => {
  return (
    <StyledBenefits>
      {benefits.map((benefit: BenfitsType, index: number) => (
        <Benefit>
          <Icon src={benefit.icon} />
          <IconGlass right={index % 2 === 0} top={index === 2}>
            <IconGlassGradient />
          </IconGlass>
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
