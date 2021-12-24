import styled from "styled-components";

import { useIsLive } from "../app/hooks/use-is-live";
import NavItem, { NavItemType } from "./NavItem";

// We can delete this after launch
const preLaunchItems: NavItemType[] = [
  {
    label: "header.tabs.docs",
    link: "https://docs.backd.fund/",
  },
  {
    label: "header.tabs.blog",
    link: "https://backdfund.medium.com/",
  },
  {
    label: "header.tabs.newsletter",
    link: "https://backd.substack.com/welcome",
  },
];

const navItems: NavItemType[] = [
  {
    label: "header.tabs.pools",
    link: "/pools",
  },
  {
    label: "header.tabs.actions",
    link: "/actions",
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

const NavItems = (): JSX.Element => {
  const { protocolLive } = useIsLive();

  return (
    <StyledNavItems id="nav-items">
      {protocolLive && navItems.map((navItem: NavItemType) => <NavItem navItem={navItem} />)}
      {!protocolLive && preLaunchItems.map((navItem: NavItemType) => <NavItem navItem={navItem} />)}
    </StyledNavItems>
  );
};

export default NavItems;
