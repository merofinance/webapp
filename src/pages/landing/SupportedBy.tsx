import React from "react";
import styled from "styled-components";
import { Header2 } from "../../styles/Headers";
import divergence from "../../assets/protocols/divergence.svg";
import curve from "../../assets/protocols/curve.svg";
import aave from "../../assets/protocols/aave.svg";

type ProtocolType = {
  name: string;
  image: string;
  link: string;
};

const protocols: ProtocolType[] = [
  {
    name: "Divergence",
    image: divergence,
    link: "https://www.div.vc/",
  },
  {
    name: "Curve",
    image: curve,
    link: "https://curve.fi/",
  },
  {
    name: "Aave",
    image: aave,
    link: "http://aave.com/",
  },
];

const StyledSupportedBy = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Protocols = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;

  @media (max-width: 1224px) {
    flex-direction: column;
    margin: 0;

    div:nth-child(1) {
      order: 0;
    }

    div:nth-child(3) {
      order: 1;
    }
  }
`;

const ProtocolContainer = styled.a`
  width: 32.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5.4rem;
  cursor: pointer;
  order: 2;

  transition: opacity 0.3s;
  :hover {
    opacity: 0.8;
  }

  @media (max-width: 1224px) {
    margin: 2.3rem 0;
    width: auto;
  }
`;

type ProtocolImageType = {
  maxWidthMobile: string;
};

const Protocol = styled.img`
  max-width: 32.2rem;
  max-height: 7.7rem;

  @media (max-width: 600px) {
    max-width: ${(props: ProtocolImageType) =>
      props.maxWidthMobile ? props.maxWidthMobile : "16.6rem"};
    max-height: 4rem;
  }
`;

const SupportedBy = (): JSX.Element => {
  return (
    <StyledSupportedBy>
      <Header2>supported by</Header2>
      <Protocols>
        {protocols.map((protocol: ProtocolType, index: number) => (
          <ProtocolContainer
            key={index}
            id={`Supported By - ${protocol.name}`}
            href={protocol.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Protocol
              src={protocol.image}
              maxWidthMobile={index === 2 ? "12rem" : ""}
              alt={`${protocol.name} logo`}
            />
          </ProtocolContainer>
        ))}
      </Protocols>
    </StyledSupportedBy>
  );
};

export default SupportedBy;
