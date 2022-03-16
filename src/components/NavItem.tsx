import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import HoverFeedback from "./HoverFeedback";
import { NavItemType } from "./NavItems";
import { Optional } from "../lib/types";

interface NavItemProps {
  comingSoon?: boolean;
}

const LinkContainer = styled.div`
  a {
    cursor: ${(props: NavItemProps) => (!props.comingSoon ? "pointer" : "default")};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.15px;
  opacity: ${(props: NavItemProps) => (!props.comingSoon ? "1" : "0.4")};

  transition: 0.3s opacity;
  :hover {
    opacity: ${(props: NavItemProps) => (!props.comingSoon ? "0.8" : "0.4")};
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

interface Props {
  navItem: NavItemType;
}

const NavItem = ({ navItem }: Props): Optional<JSX.Element> => {
  const { t } = useTranslation();

  if (!navItem.link) return null;

  return (
    <HoverFeedback text={navItem.comingSoon ? t("components.comingSoon") : ""}>
      <LinkContainer comingSoon={navItem.comingSoon}>
        <StyledLink id={navItem.label} to={navItem.comingSoon ? "#" : navItem.link}>
          <Text comingSoon={navItem.comingSoon}>{t(navItem.label)}</Text>
        </StyledLink>
      </LinkContainer>
    </HoverFeedback>
  );
};

export default NavItem;
