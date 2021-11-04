import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header1, Header2, Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";

const StyledLitepaperPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 770px;
  margin: auto;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const Header = styled(Header2)`
  text-align: left;
  margin-top: 8rem;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const List = styled.ul`
  margin-left: 3rem;
  font-size: 20rem;
  list-style-type: none;
`;

const Item = styled.li`
  position: relative;

  :before {
    content: "";
    position: absolute;
    top: 0.8rem;
    left: -2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: var(--main);
  }
`;

const Bold = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const LitepaperPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledLitepaperPage>
      <Seo
        title={t("metadata.litepaper.title")}
        description={t("metadata.litepaper.description")}
      />
      <Header1>{t("litepaper.header")}</Header1>
      <Header>{t("litepaper.introduction.header")}</Header>
      <Paragraph>{t("litepaper.introduction.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.introduction.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.introduction.paragraph3")}</Paragraph>

      <Header>{t("litepaper.pools.header")}</Header>
      <Paragraph>{t("litepaper.pools.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.pools.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.pools.paragraph3")}</Paragraph>
      <List>
        <Item>
          <Paragraph>
            <Bold>{t("litepaper.pools.differences.assets.header")}</Bold>{" "}
            {t("litepaper.pools.differences.assets.description")}
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Bold>{t("litepaper.pools.differences.parameterization.header")}</Bold>{" "}
            {t("litepaper.pools.differences.parameterization.description")}
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Bold>{t("litepaper.pools.differences.strategy.header")}</Bold>{" "}
            {t("litepaper.pools.differences.strategy.description")}
          </Paragraph>
        </Item>
      </List>

      <Header>{t("litepaper.topUps.header")}</Header>
      <Paragraph>{t("litepaper.topUps.paragraph1")}</Paragraph>
      <List>
        <Item>
          <Paragraph>{t("litepaper.topUps.parameters.protocol")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.topUps.parameters.address")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.topUps.parameters.threshold")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.topUps.parameters.single")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.topUps.parameters.max")}</Paragraph>
        </Item>
      </List>
      <Paragraph>{t("litepaper.topUps.paragraph2")}</Paragraph>

      <Header>{t("litepaper.keepers.header")}</Header>
      <Paragraph>{t("litepaper.keepers.paragraph")}</Paragraph>

      <Header>{t("litepaper.farming.header")}</Header>
      <Paragraph>{t("litepaper.farming.paragraph")}</Paragraph>

      <Header>{t("litepaper.components.header")}</Header>
      <Paragraph>{t("litepaper.components.paragraph")}</Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.components.components.pools.header")}</Bold>{" "}
        {t("litepaper.components.components.pools.decription")}
      </Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.components.components.vaults.header")}</Bold>{" "}
        {t("litepaper.components.components.vaults.decription")}
      </Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.components.components.strategies.header")}</Bold>{" "}
        {t("litepaper.components.components.strategies.decription")}
      </Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.components.components.handlers.header")}</Bold>{" "}
        {t("litepaper.components.components.handlers.decription")}
      </Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.components.components.keepers.header")}</Bold>{" "}
        {t("litepaper.components.components.keepers.decription")}
      </Paragraph>

      <Header>{t("litepaper.governance.header")}</Header>
      <Paragraph>{t("litepaper.governance.paragraph")}</Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.governance.disclaimer")}</Bold>
      </Paragraph>
    </StyledLitepaperPage>
  );
};

export default LitepaperPage;
