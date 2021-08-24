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
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
`;

const Link = styled(GradientLink)`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.1rem;
  letter-spacing: 0.46px;
  margin-top: 0.2rem;
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
          <div>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              Find out more in the docs.
            </Link>
          </div>
        </Content>
      }
    />
  );
};

export default Overview;
