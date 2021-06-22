import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { LIVE } from "../lib/constants";

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

const Link = styled.button`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 1.6rem;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const NavItems = () => {
  const history = useHistory();

  return (
    <StyledNavItems>
      {LIVE &&
        navItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label}>
            <Link onClick={() => history.push(navItem.link)}>{navItem.label}</Link>
          </NavItem>
        ))}
      {!LIVE && (
        <>
          <NavItem>
            <Link
              onClick={() => {
                (window as any).open("https://backdfund.medium.com/", "_blank").focus();
              }}
            >
              blog
            </Link>
          </NavItem>
          <NavItem>
            <Link onClick={() => history.push("/docs")}>docs</Link>
          </NavItem>
        </>
      )}
    </StyledNavItems>
  );
};

export default NavItems;
