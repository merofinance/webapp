import React from "react";
import styled from "styled-components";
import logo from "../assets/full-logo.svg";
import EmailSignup from "./EmailSignup";

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
        label: "Twitter",
        link: "https://twitter.com/backdfund",
      },
      {
        label: "Discord",
        link: "https://google.com/",
      },
      {
        label: "GitHub",
        link: "https://github.com/backdfund",
      },
      {
        label: "Telegram Chat",
        link: "https://t.me/backdchat",
      },
      {
        label: "Telegram Ann.",
        link: "https://t.me/backdchat",
      },
    ],
  },
  {
    header: "resources",
    links: [
      {
        label: "Documentation",
        link: "https://google.com/",
      },
      {
        label: "Blog",
        link: "https://google.com/",
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
`;

const Logo = styled.img`
  width: 13.5rem;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Logo src={logo} />
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
      <EmailSignup />
    </StyledFooter>
  );
};

export default Footer;
