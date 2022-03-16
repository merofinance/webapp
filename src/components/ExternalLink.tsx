import { ReactNode } from "react";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { GradientLink } from "../styles/GradientText";

const LinkContainer = styled.div`
  cursor: pointer;
`;

interface LinkProps {
  large?: boolean;
}

const Link = styled(GradientLink)`
  font-weight: ${(props: LinkProps) => (props.large ? 400 : 500)};
  letter-spacing: 0.3px;

  font-size: ${(props: LinkProps) => (props.large ? "1.6rem" : "1.5rem")};
  @media (max-width: 1220px) {
    font-size: ${(props: LinkProps) => (props.large ? "1.4rem" : "1.2rem")};
  }
`;

interface Props {
  children: ReactNode;
  link: string;
  id?: string;
  large?: boolean;
}

const ExternalLink = ({ id, children, link, large }: Props): JSX.Element => {
  return (
    <LinkContainer>
      <Link large={large} id={id} href={link} target="_blank" rel="noopener noreferrer">
        {children}
        <LaunchIcon
          fontSize={large ? "medium" : "small"}
          style={{
            fill: "var(--secondary)",
            transform: "translateY(2px)",
            marginLeft: "3px",
          }}
        />
      </Link>
    </LinkContainer>
  );
};

export default ExternalLink;
