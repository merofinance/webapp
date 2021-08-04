import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useIsLive } from "../lib/hooks";
import { STAKING_LIVE } from "../lib/constants";

type NavItemType = {
  label: string;
  link: string;
};

const navItems: NavItemType[] = [
  {
    label: "claim",
    link: "/claim",
  },
  {
    label: "pools",
    link: "/pools",
  },
  {
    label: "stake BKD",
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

const NavItems = () => {
  const live = useIsLive();

  return (
    <StyledNavItems id="nav-items">
      {live && !STAKING_LIVE && (
        <NavItem>
          <InternalLink to="/pools">pools</InternalLink>
        </NavItem>
      )}
      {live &&
        STAKING_LIVE &&
        navItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label}>
            <InternalLink to={navItem.link}>{navItem.label}</InternalLink>
          </NavItem>
        ))}
      {!live && (
        <NavItem>
          <ExternalLink href="https://backdfund.medium.com/" target="_blank">
            blog
          </ExternalLink>
        </NavItem>
      )}
    </StyledNavItems>
  );
};

export default NavItems;
