import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import logo from "../assets/logo/full-logo.svg";

type LinkType = {
  label: string;
  link: string;
};

type LinkListType = {
  header: string;
  links: LinkType[];
};

const linkLists: LinkListType[] = [
  {
    header: "footer.community.header",
    links: [
      {
        label: "footer.community.links.discord",
        link: "https://discord.gg/jpGvaFV3Rv",
      },
      {
        label: "footer.community.links.twitter",
        link: "https://twitter.com/backdfund",
      },
      {
        label: "footer.community.links.github",
        link: "https://github.com/backdfund",
      },
      {
        label: "footer.community.links.telegram",
        link: "https://t.me/backdchat",
      },
    ],
  },
  {
    header: "footer.resources.header",
    links: [
      {
        label: "footer.resources.links.litepaper",
        link: "/litepaper",
      },
      {
        label: "footer.resources.links.blog",
        link: "https://backdfund.medium.com/",
      },
      {
        label: "footer.resources.links.factSheet",
        link: "/fact-sheet.pdf",
      },
    ],
  },
  {
    header: "footer.updates.header",
    links: [
      {
        label: "footer.updates.links.newsletter",
        link: "https://backd.substack.com/welcome",
      },
      {
        label: "footer.updates.links.telegram",
        link: "https://t.me/backdfund",
      },
    ],
  },
];

const StyledFooter = styled.div`
  position: relative;
  width: 100%;
  margin-top: 8rem;
  margin-bottom: 3.7rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;

    div:nth-child(5) {
      order: -1;
    }
  }
`;

const Logo = styled.img`
  width: 13.5rem;

  @media (max-width: 600px) {
    margin-bottom: 6.2rem;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    margin-bottom: 5.6rem;
  }
`;

const LinkHeader = styled.div`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
`;

const Link = styled.a`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--sub);
  line-height: 2.4rem;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.7;
  }
`;

const TestChangeLanguage = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: pink;
`;

const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <StyledFooter>
      <Logo src={logo} alt="Backd logo" />
      <div />
      {linkLists.map((linkList: LinkListType) => (
        <LinkList key={linkList.header}>
          <LinkHeader>{t(linkList.header)}</LinkHeader>
          {linkList.links.map((link: LinkType) => (
            <Link id={link.label} key={link.label} href={link.link} target="_blank">
              {t(link.label)}
            </Link>
          ))}
        </LinkList>
      ))}
      <TestChangeLanguage onClick={() => i18n.changeLanguage("jp")} />
    </StyledFooter>
  );
};

export default Footer;
