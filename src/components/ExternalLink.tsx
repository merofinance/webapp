import { ReactNode } from "react";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";
import { useTranslation } from "react-i18next";

import { GradientLink } from "../styles/GradientText";

const LinkContainer = styled.div`
  margin-top: 0.3rem;
`;

const Link = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.46px;

  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

interface Props {
  children: ReactNode;
  link: string;
}

const ExternalLink = ({ children, link }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <LinkContainer>
      <Link id="overview-link" href={link} target="_blank" rel="noopener noreferrer">
        {children}
        <LaunchIcon
          fontSize="small"
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
