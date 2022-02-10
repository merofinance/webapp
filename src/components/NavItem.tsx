import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import HoverFeedback from "./HoverFeedback";

export interface NavItemType {
  label: string;
  link: string;
  live: boolean;
}

interface NavItemProps {
  isActive?: boolean;
  live?: boolean;
}

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props: NavItemProps) => (props.live ? "pointer" : "default")};

  width: 7rem;
  margin: 0 3.1rem;
  @media (max-width: 600px) {
    width: 5rem;
    margin: 0 1.7rem;
  }
`;

const Text = styled.div`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.15px;
  opacity: ${(props: NavItemProps) => (props.isActive ? "1" : props.live ? "0.8" : "0.4")};

  transition: 0.3s opacity;
  :hover {
    opacity: ${(props: NavItemProps) => (props.live ? "1" : "0.4")};
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

interface Props {
  navItem: NavItemType;
  setActive: (v: string) => void;
}

const NavItem = ({ navItem, setActive }: Props): JSX.Element => {
  const { t } = useTranslation();
  const match = useMatch(`${navItem.link}/*`);

  useEffect(() => {
    if (match) setActive(navItem.label);
  }, [match]);

  return (
    <HoverFeedback text={navItem.live ? "" : t("components.comingSoon")}>
      <StyledLink id={navItem.label} to={navItem.live ? navItem.link : "#"} live={navItem.live}>
        <Text isActive={!!match} live={navItem.live}>
          {t(navItem.label)}
        </Text>
      </StyledLink>
    </HoverFeedback>
  );
};

export default NavItem;
