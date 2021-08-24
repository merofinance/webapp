import React from "react";
import styled from "styled-components";
import { GradientLink } from "../styles/GradientText";
import InfoCard from "./InfoCard";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.8;

  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 1439px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const LinkContainer = styled.div`
  margin-top: 0.2rem;
  @media (max-width: 1439px) {
    margin-top: 0.4rem;
  }
`;

const Link = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.46px;

  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 1439px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

interface Props {
  description: string;
  link: string;
}

const Overview = ({ description, link }: Props) => {
  return (
    <InfoCard
      collapsible
      header="Overview"
      content={
        <Content>
          <Description>{description}</Description>
          <LinkContainer>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              Find out more in the docs.
            </Link>
          </LinkContainer>
        </Content>
      }
    />
  );
};

export default Overview;
