import React, { useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import percent from "../../assets/benefits/percent.svg";
import plus from "../../assets/benefits/plus.svg";
import shield from "../../assets/benefits/shield.svg";
import { GradientLink } from "../../styles/GradientText";
import { Header4, Header6 } from "../../styles/Headers";
import useWindowPosition from "../../app/hooks/use-window-position";

type BenfitsType = {
  icon: string;
  header: string;
  description: string;
  url: string;
};

const benefits: BenfitsType[] = [
  {
    icon: shield,
    header: "benefits.reactiveLiquidity.header",
    description: "benefits.reactiveLiquidity.description",
    url: "https://docs.backd.fund/protocol-architecture/top-ups",
  },
  {
    icon: plus,
    header: "benefits.earnYield.header",
    description: "benefits.earnYield.description",
    url: "https://docs.backd.fund/protocol-architecture/pools",
  },
  {
    icon: percent,
    header: "benefits.feeShare.header",
    description: "benefits.feeShare.description",
    url: "https://docs.backd.fund/protocol-architecture/top-ups/backd-keepers",
  },
];

const StyledBenefits = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  @media (max-width: 600px) {
    align-items: center;
    margin: var(--mobile-section-margin);
    flex-direction: column;
  }
`;

const Benefit = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 3.9rem;

  @media (max-width: 600px) {
    margin: 2.9rem 0;
  }

  @media (min-width: 601px) and (max-width: 1224px) {
    margin: 0 1rem;
  }
`;

const IconContainer = styled.div`
  height: 7.9rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  margin-bottom: 3.5rem;

  @media (max-width: 600px) {
    height: 4.7rem;
    margin-bottom: 2rem;
  }
`;

const Icon = styled.img`
  width: 7.9rem;

  @media (max-width: 600px) {
    width: 4.7rem;
  }
`;

type IconGlassProps = {
  right: boolean;
  top: boolean;
};

const IconGlass = styled.div`
  position: absolute;
  top: ${(props: IconGlassProps) => (props.top ? "1rem" : "3.8rem")};
  left: calc(50% + ${(props: IconGlassProps) => (props.right ? "0.5rem" : "-4.5rem")});
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 13px;
  overflow: hidden;
  transition: transform 0.1s ease-out;

  backdrop-filter: blur(5px);

  @media (max-width: 600px) {
    top: ${(props: IconGlassProps) => (props.top ? "0rem" : "0.7rem")};
    left: calc(50% + ${(props: IconGlassProps) => (props.right ? "0.3rem" : "-2.7rem")});
    backdrop-filter: blur(3px);
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
  }
`;

type IconGlassGradientProps = {
  rotate: number;
};

const IconGlassGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(140.22deg, rgba(8, 200, 249, 0.55) 0%, rgba(247, 30, 204, 0.8) 100%);
  opacity: 0.6;
  transform: rotate(${(props: IconGlassGradientProps) => props.rotate}deg);
`;

const ReadMore = styled(GradientLink)`
  font-weight: 400;
  font-size: 2.1rem;
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-top: 1rem;
  }
`;

const Benefits = (): JSX.Element => {
  const { t } = useTranslation();
  const benefitsRef = useRef<HTMLDivElement>(null);
  const windowPosition = useWindowPosition();

  return (
    <StyledBenefits ref={benefitsRef}>
      {benefits.map((benefit: BenfitsType, index: number) => (
        <Benefit key={benefit.header} id={benefit.header}>
          <IconContainer>
            <Icon src={benefit.icon} alt="benefit icon" />
          </IconContainer>
          <IconGlass
            right={index % 2 === 0}
            top={index === 2}
            style={{
              transform: `translateY(${-(windowPosition - 380) / (window.innerHeight / 50)}px)`,
            }}
          >
            <IconGlassGradient rotate={index === 1 ? 90 : index === 2 ? -90 : 0} />
          </IconGlass>
          <Header4>{t(benefit.header)}</Header4>
          <Header6>{t(benefit.description)}</Header6>
          <ReadMore href={benefit.url} target="_blank" rel="noopener noreferrer">
            {`${t("benefits.readMore")} →`}
          </ReadMore>
        </Benefit>
      ))}
    </StyledBenefits>
  );
};

export default Benefits;
