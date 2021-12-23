import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Optional } from "../lib/types";

const StyledBanner = styled.div`
  width: 100%;
  height: 5.2rem;
  background: var(--gradient);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    height: auto;
    padding: 0.9rem 0;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  margin-left: 0.4rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-left: 0;
  }
`;

const Link = styled.a`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  text-decoration: underline;
  margin-left: 0.6rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-left: 0.4rem;
  }
`;

const Banner = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
    <StyledBanner>
      <Content>
        <Text>{t("banner.testnet.live")}</Text>
        <Text>
          {t("banner.testnet.connect")}
          <Link
            href="https://backdfund.medium.com/backd-testnet-guide-16540e09c46"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("banner.testnet.blogPost")}
          </Link>
        </Text>
      </Content>
    </StyledBanner>
  );
};

export default Banner;
