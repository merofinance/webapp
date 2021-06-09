import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

type NavItemType = {
  label: string;
  link: string;
  isExternal: boolean;
};

const navItems: NavItemType[] = [
  {
    label: "Pools",
    link: "/pools",
    isExternal: false,
  },
  {
    label: "GitHub",
    link: "https://github.com/backdfund",
    isExternal: true,
  },
  {
    label: "Blog",
    link: "https://backd.fund/blog/",
    isExternal: true,
  },
  {
    label: "Twitter",
    link: "https://twitter.com/backdfund",
    isExternal: true,
  },
];

const StyledNavItems = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0 1rem;
`;

const NavItem = styled.li`
  font-weight: 400;
  font-size: 1.6rem;
  margin: 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.button``;

const NavItems = () => {
  const history = useHistory();

  return (
    <StyledNavItems>
      {navItems.map((navItem: NavItemType) => (
        <NavItem>
          <Link
            onClick={() => {
              if (navItem.isExternal) (window as any).open(navItem.link, "_blank").focus();
              else history.push(navItem.link);
            }}
          >
            {navItem.label}
          </Link>
        </NavItem>
      ))}
    </StyledNavItems>
  );
};

export default NavItems;
