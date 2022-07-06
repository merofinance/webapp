import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { LinkListType, LinkType } from "./Footer";

import arrow from "../assets/ui/arrow.svg";

const StyledFooterSubMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s opacity;

  :hover {
    opacity: 0.7;
  }
`;

const HeaderText = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--sub);
  line-height: 2.4rem;
  transition: opacity 0.3s;
`;

interface OpenProps {
  open: boolean;
}

const HeaderIcon = styled.img`
  width: 1rem;
  margin-left: 1rem;
  transform: ${(props: OpenProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: all 0.3s;
`;

const AccordionContainer = styled.div`
  width: 100%;
  transition: max-height 0.2s ease-out;
  overflow: hidden;

  max-height: ${(props: OpenProps) => (props.open ? "5rem" : "0")};
`;

const AccordionContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0rem;
`;

const ExternalLink = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--sub);
  line-height: 2.4rem;
  transition: opacity 0.3s;
  margin-left: 0.6rem;

  :hover {
    opacity: 0.7;
  }
`;

interface Props {
  linkList: LinkListType;
}

const FooterSubMenu = ({ linkList }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <StyledFooterSubMenu>
      <Header onClick={() => setOpen(!open)}>
        <HeaderText>{t(linkList.header)}</HeaderText>
        <HeaderIcon src={arrow} alt="arrow" open={open} />
      </Header>
      <AccordionContainer open={open}>
        <AccordionContent>
          {linkList.links.map((link: LinkType | LinkListType) => {
            if ("links" in link) throw new Error("FooterSubMenu: LinkListType is not supported");
            return (
              <ExternalLink
                id={link.label}
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(link.label)}
              </ExternalLink>
            );
          })}
        </AccordionContent>
      </AccordionContainer>
    </StyledFooterSubMenu>
  );
};

export default FooterSubMenu;
