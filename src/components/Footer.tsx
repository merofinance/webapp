import React from "react";
import styled from "styled-components";
import logo from "../assets/full-logo.svg";

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
    header: "community",
    links: [
      {
        label: "Discord",
        link: "https://discord.gg/jpGvaFV3Rv",
      },
      {
        label: "Twitter",
        link: "https://twitter.com/backdfund",
      },
      {
        label: "GitHub",
        link: "https://github.com/backdfund",
      },
      {
        label: "Telegram Chat",
        link: "https://t.me/backdchat",
      },
    ],
  },
  {
    header: "resources",
    links: [
      {
        label: "Litepaper",
        link: "/litepaper",
      },
      {
        label: "Blog",
        link: "https://backdfund.medium.com/",
      },
      {
        label: "Fact Sheet",
        link: "/fact-sheet.pdf",
      },
    ],
  },
  {
    header: "updates",
    links: [
      {
        label: "Newsletter",
        link: "https://backd.substack.com/welcome",
      },
      {
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

const Footer = () => {
  return (
    <StyledFooter>
      <Logo src={logo} alt="Backd logo" />
      <div></div>
      {linkLists.map((linkList: LinkListType) => (
        <LinkList key={linkList.header}>
          <LinkHeader>{linkList.header}</LinkHeader>
          {linkList.links.map((link: LinkType) => (
            <Link key={link.label} href={link.link} target="_blank">
              {link.label}
            </Link>
          ))}
        </LinkList>
      ))}
      <div></div>
    </StyledFooter>
  );
};

export default Footer;
