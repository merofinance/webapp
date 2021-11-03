import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
  Paragraph,
} from "../../styles/Headers";
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

const SubHeader = styled(Header5)`
  text-align: left;
  margin-top: 3rem;
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
        title="Backd Litepaper"
        description="How Backd combines actions (e.g. Aave & Compound liquidation protection) with yield-farming (Curve & Convex)"
      />
      <Header1>{t("litepaper.header")}</Header1>
      <Header>{t("litepaper.introduction.header")}</Header>
      <Paragraph>{t("litepaper.introduction.paragraph1")}</Paragraph>

      <Header>{t("litepaper.capitalEfficiency.header")}</Header>
      <Paragraph>{t("litepaper.capitalEfficiency.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.capitalEfficiency.paragraph2")}</Paragraph>
      <SubHeader>{t("litepaper.capitalEfficiency.notEfficient.header")}</SubHeader>
      <Paragraph>{t("litepaper.capitalEfficiency.notEfficient.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.capitalEfficiency.notEfficient.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.capitalEfficiency.notEfficient.paragraph3")}</Paragraph>
      <SubHeader>{t("litepaper.capitalEfficiency.earnYield.header")}</SubHeader>
      <Paragraph>{t("litepaper.capitalEfficiency.earnYield.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.capitalEfficiency.earnYield.paragraph2")}</Paragraph>

      <Header>{t("litepaper.reactiveLiquidity.header")}</Header>
      <Paragraph>{t("litepaper.reactiveLiquidity.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.reactiveLiquidity.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.reactiveLiquidity.paragraph3")}</Paragraph>

      <Header>{t("litepaper.action.header")}</Header>
      <Paragraph>{t("litepaper.action.paragraph1")}</Paragraph>
      <SubHeader>{t("litepaper.action.what.header")}</SubHeader>
      <Paragraph>{t("litepaper.action.what.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.action.what.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.action.what.paragraph3")}</Paragraph>

      <Header>{t("litepaper.fees.header")}</Header>
      <Paragraph>{t("litepaper.fees.paragraph1")}</Paragraph>
      <SubHeader>{t("litepaper.fees.action.header")}</SubHeader>
      <Paragraph>{t("litepaper.fees.action.paragraph1")}</Paragraph>
      <SubHeader>{t("litepaper.fees.strategies.header")}</SubHeader>
      <Paragraph>{t("litepaper.fees.strategies.paragraph1")}</Paragraph>

      <Header>{t("litepaper.token.header")}</Header>
      <Paragraph>{t("litepaper.token.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.token.paragraph2")}</Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.token.paragraph3")}</Bold>
      </Paragraph>
      <List>
        <Item>
          <Paragraph>{t("litepaper.token.governance.actions")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.governance.protocols")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.governance.strategies")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.governance.parameters")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.governance.reserve")}</Paragraph>
        </Item>
      </List>
      <SubHeader>{t("litepaper.token.community.header")}</SubHeader>
      <Paragraph>{t("litepaper.token.community.paragraph1")}</Paragraph>
      <Paragraph>
        <Bold>{t("litepaper.token.community.paragraph2")}</Bold>
      </Paragraph>
      <List>
        <Item>
          <Paragraph>{t("litepaper.token.community.contributions.strategy")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.community.contributions.keeper")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.community.contributions.general")}</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t("litepaper.token.community.contributions.investment")}</Paragraph>
        </Item>
      </List>
      <Paragraph>{t("litepaper.token.community.paragraph3")}</Paragraph>
    </StyledLitepaperPage>
  );
};

export default LitepaperPage;
