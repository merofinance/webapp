import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "./Dropdown";

import NavItem from "./NavItem";

export interface NavItemType {
  label: string;
  link?: string;
  live?: boolean;
  navItems?: NavItemType[];
}

const navItems: NavItemType[] = [
  {
    label: "header.tabs.pools",
    link: "/pools",
    live: true,
  },
  {
    label: "header.tabs.actions",
    link: "/actions",
    live: false,
  },
  {
    label: "header.tabs.claim",
    link: "/claim",
    live: false,
  },
  {
    label: "header.tabs.more",
    navItems: [
      {
        label: "header.tabs.docs",
        link: "https://docs.backd.fund/",
        live: true,
      },
      {
        label: "header.tabs.blog",
        link: "https://backdfund.medium.com/",
        live: true,
      },
      {
        label: "header.tabs.newsletter",
        link: "https://backd.substack.com/welcome",
        live: true,
      },
    ],
  },
];

const StyledNavItems = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0 1rem;

  > div {
    margin: 0 3rem;
    @media (max-width: 600px) {
      margin: 0 1.5rem;
    }
  }

  @media (max-width: 600px) {
    > div:last-child {
      display: none;
    }
  }
`;

const NavItems = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <StyledNavItems id="nav-items">
      {navItems.map((navItem: NavItemType) =>
        navItem.navItems ? (
          <Dropdown
            key={navItem.label}
            label={t(navItem.label)}
            options={navItem.navItems.map((navItem: NavItemType) => {
              const isExternal = navItem.link && navItem.link.startsWith("http");
              const action = () => {
                if (!navItem.link) return;
                if (isExternal) (window as any).open(navItem.link, "_blank").focus();
                else navigate(navItem.link);
              };
              return {
                label: t(navItem.label),
                action,
              };
            })}
          />
        ) : (
          <NavItem key={navItem.label} navItem={navItem as NavItemType} />
        )
      )}
    </StyledNavItems>
  );
};

export default NavItems;
