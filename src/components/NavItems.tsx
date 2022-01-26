import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

interface UnderlineProps {
  show: boolean;
  index: number;
}

const Underline = styled.div`
  height: 2px;
  border-radius: 1px;
  position: absolute;
  background: var(--gradient);
  transition: all 0.3s;
  display: ${(props: UnderlineProps) => (props.show ? "flex" : "none")};

  width: 7rem;
  left: 3.1rem;
  bottom: -0.8rem;
  transform: translateX(${(props: UnderlineProps) => `${props.index * (7 + 6.2)}rem`});
  @media (max-width: 600px) {
    width: 5rem;
    left: 1.7rem;
    bottom: -0.6rem;
    transform: translateX(${(props: UnderlineProps) => `${props.index * (5 + 3.4)}rem`});
  }
`;

const NavItems = (): JSX.Element => {
  const { protocolLive } = useIsLive();
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setActive(null);
  }, [location.pathname]);

  return (
    <StyledNavItems id="nav-items">
      <Underline
        show={!!active}
        index={active ? navItems.map((navItem: NavItemType) => navItem.label).indexOf(active) : 0}
      />
      {protocolLive &&
        navItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label} navItem={navItem} setActive={(v: string) => setActive(v)} />
        ))}
      {!protocolLive &&
        preLaunchItems.map((navItem: NavItemType) => (
          <NavItem key={navItem.label} navItem={navItem} setActive={(v: string) => setActive(v)} />
        ))}
    </StyledNavItems>
  );
};

export default NavItems;
