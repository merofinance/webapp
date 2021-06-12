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
      {
        label: "twitter",
        link: "",
      },
    ],
  },
  {
    header: "resources",
    links: [
      {
        label: "documentation",
        link: "https://google.com/",
      },
      {
        label: "blog",
        link: "https://google.com/",
      },
    ],
  },
];

const StyledFooter = styled.div`
  width: 100%;
  margin: var(--section-margin);
  margin-top: 8rem;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 13.5rem;
  margin-right: 7rem;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkHeaer = styled.div`
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
      {linkLists.map((linkList: LinkListType) => (
        <LinkList>
          <LinkHeaer>{linkList.header}</LinkHeaer>
          {linkList.links.map((link: LinkType) => (
            <Link href={link.link} target="_blank">
              {link.label}
            </Link>
          ))}
        </LinkList>
      ))}
      <div>meow</div>
    </StyledFooter>
  );
};

export default Footer;
