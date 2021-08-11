import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { LIVE, STAKING_LIVE } from "../lib/constants";

type NavItemType = {
  label: string;
  link: string;
};

// We can delete this after launch
const preLaunchItems: NavItemType[] = [
  {
    label: "docs",
    link: "https://docs.backd.fund/",
  },
  {
    label: "header.tabs.blog",
    link: "https://backdfund.medium.com/",
  },
  {
    label: "newsletter",
    link: "https://backd.substack.com/welcome",
  },
];

const navItems: NavItemType[] = [
  {
    label: "header.tabs.claim",
    link: "/claim",
  },
  {
    label: "header.tabs.pools",
    link: "/pools",
  },
  {
    label: "header.tabs.stake",
    link: "/stake",
  },
];

const StyledNavItems = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  list-style-type: none;
  margin: 0 1rem;
`;

const NavItem = styled.li`
  margin: 0 4.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    margin: 0 1.7rem;
  }
`;

const InternalLink = styled(Link)`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 1.6rem;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ExternalLink = styled.a`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 1.6rem;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const NavItems = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledNavItems id="nav-items">
      {LIVE && !STAKING_LIVE && (
        <NavItem>
          <InternalLink to="/pools">{t("header.tabs.pools")}</InternalLink>
        </NavItem>
      )}
      {LIVE &&
        STAKING_LIVE &&
        navItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label}>
            <InternalLink to={navItem.link}>{t(navItem.label)}</InternalLink>
          </NavItem>
        ))}
      {!LIVE &&
        preLaunchItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label}>
            <ExternalLink id={navItem.label} href={navItem.link} target="_blank">
              {t(navItem.label)}
            </ExternalLink>
          </NavItem>
        ))}
    </StyledNavItems>
  );
};

export default NavItems;
