import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import logo from "../assets/logo/full-logo.svg";
import LanguageSelector from "./LanguageSelector";

type LinkType = {
  internal: boolean;
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
        internal: false,
        label: "footer.community.links.discord",
        link: "https://discord.gg/jpGvaFV3Rv",
      },
      {
        internal: false,
        label: "footer.community.links.twitter",
        link: "https://twitter.com/backdfund",
      },
      {
        internal: false,
        label: "footer.community.links.github",
        link: "https://github.com/backdfund",
      },
      {
        internal: false,
        label: "footer.community.links.telegram",
        link: "https://t.me/backdchat",
      },
    ],
  },
  {
    header: "footer.resources.header",
    links: [
      {
        internal: true,
        label: "footer.resources.links.litepaper",
        link: "/litepaper",
      },
      {
        internal: false,
        label: "footer.resources.links.docs",
        link: "https://docs.backd.fund/",
      },
      {
        internal: false,
        label: "footer.resources.links.blog",
        link: "https://backdfund.medium.com/",
      },
      {
        internal: false,
        label: "footer.resources.links.factSheet",
        link: "/fact-sheet.pdf",
      },
    ],
  },
  {
    header: "footer.updates.header",
    links: [
      {
        internal: false,
        label: "footer.updates.links.newsletter",
        link: "https://backd.substack.com/welcome",
      },
      {
        internal: false,
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

const ExternalLink = styled.a`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--sub);
  line-height: 2.4rem;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.7;
  }
`;

const InternalLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--sub);
  line-height: 2.4rem;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.7;
  }
`;

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Logo src={logo} alt="Backd logo" />
      <div />
      {linkLists.map((linkList: LinkListType) => (
        <LinkList key={linkList.header}>
          <LinkHeader>{t(linkList.header)}</LinkHeader>
          {linkList.links.map((link: LinkType) =>
            link.internal ? (
              <InternalLink id={link.label} key={link.label} to={link.link}>
                {t(link.label)}
              </InternalLink>
            ) : (
              <ExternalLink
                id={link.label}
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(link.label)}
              </ExternalLink>
            )
          )}
        </LinkList>
      ))}
      <LanguageSelector />
    </StyledFooter>
  );
};

export default Footer;
