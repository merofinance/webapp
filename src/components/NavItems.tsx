import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DOCS_LINK, BLOG_LINK, NEWSLETTER_LINK } from "../lib/links";
import Dropdown from "./Dropdown";

import NavItem from "./NavItem";

export interface NavItemType {
  label: string;
  link?: string;
  comingSoon?: boolean;
  navItems?: NavItemType[];
}

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
    @media (max-width: 850px) {
      margin: 0 2.3rem;
    }
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
  const { chainId } = useWeb3React();

  const navItems: NavItemType[] = [
    {
      label: "header.tabs.pools",
      link: "/pools",
    },
    {
      label: "header.tabs.actions",
      link: "/actions",
      comingSoon: !chainId || chainId !== 42,
    },
    {
      label: "header.tabs.claim",
      link: "/claim",
      comingSoon: true,
    },
    {
      label: "header.tabs.more",
      navItems: [
        {
          label: "header.tabs.docs",
          link: DOCS_LINK,
        },
        {
          label: "header.tabs.blog",
          link: BLOG_LINK,
        },
        {
          label: "header.tabs.newsletter",
          link: NEWSLETTER_LINK,
        },
      ],
    },
  ];

  return (
    <StyledNavItems id="nav-items">
      {navItems.map((navItem: NavItemType) =>
        navItem.navItems ? (
          <Dropdown
            id={navItem.label}
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
