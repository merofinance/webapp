import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export interface NavItemType {
  label: string;
  link: string;
}

const StyledNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 7rem;
  margin: 0 3.1rem;
  @media (max-width: 600px) {
    width: 5rem;
    margin: 0 1.7rem;
  }
`;

interface LinkProps {
  isActive: boolean;
}

const Text = styled.div`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.15px;
  opacity: ${(props: LinkProps) => (props.isActive ? "1" : "0.8")};

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
        <Link id={navItem.label} to={navItem.link}>
          <Text isActive={!!match}>{t(navItem.label)}</Text>
        </Link>
      )}
      {isExternal && (
        <a id={navItem.label} href={navItem.link} target="_blank" rel="noopener noreferrer">
          <Text isActive={!!match}>{t(navItem.label)}</Text>
        </a>
      )}
    </StyledNavItem>
  );
};

export default NavItem;
