import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo/full-logo.svg";

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
    header: "community",
    links: [
      {
        internal: false,
        label: "Discord",
        link: "https://discord.gg/jpGvaFV3Rv",
      },
      {
        internal: false,
        label: "Twitter",
        link: "https://twitter.com/backdfund",
      },
      {
        internal: false,
        label: "GitHub",
        link: "https://github.com/backdfund",
      },
      {
        internal: false,
        label: "Telegram Chat",
        link: "https://t.me/backdchat",
      },
    ],
  },
  {
    header: "resources",
    links: [
      {
        internal: true,
        label: "Litepaper",
        link: "/litepaper",
      },
      {
        internal: false,
        label: "Docs",
        link: "https://docs.backd.fund/",
      },
      {
        internal: false,
        label: "Blog",
        link: "https://backdfund.medium.com/",
      },
      {
        internal: false,
        label: "Fact Sheet",
        link: "/fact-sheet.pdf",
      },
    ],
  },
  {
    header: "updates",
    links: [
      {
        internal: false,
        label: "Newsletter",
        link: "https://backd.substack.com/welcome",
      },
      {
        internal: false,
        label: "Telegram Ann.",
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
  return (
    <StyledFooter>
      <Logo src={logo} alt="Backd logo" />
      <div />
      {linkLists.map((linkList: LinkListType) => (
        <LinkList key={linkList.header}>
          <LinkHeader>{linkList.header}</LinkHeader>
          {linkList.links.map((link: LinkType) =>
            link.internal ? (
              <InternalLink id={`Footer - ${link.label}`} key={link.label} to={link.link}>
                {link.label}
              </InternalLink>
            ) : (
              <ExternalLink
                id={`Footer - ${link.label}`}
                key={link.label}
                href={link.link}
                target="_blank"
              >
                {link.label}
              </ExternalLink>
            )
          )}
        </LinkList>
      ))}
      <div />
    </StyledFooter>
  );
};

export default Footer;
