import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export type NavItemType = {
  label: string;
  link: string;
};

const StyledNavItem = styled.li`
  margin: 0 3.1rem;
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 600px) {
    margin: 0 1.7rem;
  }
`;

interface LinkProps {
  active: boolean;
}

const InternalLink = styled(Link)`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  letter-spacing: 0.15px;
  font-weight: 500;

  opacity: ${(props: LinkProps) => (props.active ? "1" : "0.8")};

  transition: 0.3s opacity;
  :hover {
    opacity: 1;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ExternalLink = styled.a`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  letter-spacing: 0.15px;

  opacity: ${(props: LinkProps) => (props.active ? "1" : "0.8")};
  font-weight: ${(props: LinkProps) => (props.active ? "700" : "500")};

  transition: 0.3s opacity;
  :hover {
    opacity: 1;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

interface Props {
  navItem: NavItemType;
  setActive: (v: string) => void;
}

const NavItem = ({ navItem, setActive }: Props): JSX.Element => {
  const { t } = useTranslation();
  const match = useMatch(`${navItem.link}/*`);

  const isExternal = navItem.link.substring(0, 4).toLowerCase() === "http";

  useEffect(() => {
    if (!!match && !isExternal) setActive(navItem.label);
  }, [match]);

  return (
    <StyledNavItem>
      {!isExternal && (
        <InternalLink active={!!match} id={navItem.label} to={navItem.link}>
          {t(navItem.label)}
        </InternalLink>
      )}
      {isExternal && (
        <ExternalLink
          id={navItem.label}
          href={navItem.link}
          target="_blank"
          rel="noopener noreferrer"
          active={!!match}
        >
          {t(navItem.label)}
        </ExternalLink>
      )}
    </StyledNavItem>
  );
};

export default NavItem;
