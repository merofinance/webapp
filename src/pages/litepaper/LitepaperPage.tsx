import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";

import { Header1, Header2, Header5, Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";
import capitalEfficiency from "../../assets/litepaper/capital-efficiency.png";
import topUp from "../../assets/litepaper/top-up.png";
import backdFlow from "../../assets/litepaper/backd-flow.png";
import { DISCORD_LINK, DOCS_LINK } from "../../lib/constants";

const StyledLitepaperPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 770px;
  margin: auto;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const Header = styled(Header5)`
  text-align: left;
  margin-top: 8rem;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const SubHeader = styled(Header2)`
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

const Link = styled.a`
  font-weight: 400;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  text-decoration: underline;

  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const Image = styled.img`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SmallImage = styled.img`
  width: 50%;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    width: 100%;
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
      <Paragraph>
        <Trans i18nKey="litepaper.introduction.paragraph1">
          <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
            Backd
          </Link>
        </Trans>
      </Paragraph>

      <Header>{t("litepaper.capitalEfficiency.header")}</Header>
      <Paragraph>{t("litepaper.capitalEfficiency.paragraph1")}</Paragraph>
      <Paragraph>{t("litepaper.capitalEfficiency.paragraph2")}</Paragraph>
      <SubHeader>{t("litepaper.capitalEfficiency.notEfficient.header")}</SubHeader>
      <Paragraph>{t("litepaper.capitalEfficiency.notEfficient.paragraph1")}</Paragraph>
      <SectionContainer>
        <SmallImage src={capitalEfficiency} alt="Capital Efficiency Diagram" />
        <Paragraph>{t("litepaper.capitalEfficiency.notEfficient.paragraph2")}</Paragraph>
      </SectionContainer>
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
      <Image src={topUp} alt="Top-up Action Diagram" />
      <Paragraph>{t("litepaper.action.what.paragraph2")}</Paragraph>
      <Paragraph>{t("litepaper.action.what.paragraph3")}</Paragraph>
      <Image src={backdFlow} alt="Backd Flow Diagram" />

      <Header>{t("litepaper.fees.header")}</Header>
      <Paragraph>{t("litepaper.fees.paragraph1")}</Paragraph>
      <SubHeader>{t("litepaper.fees.action.header")}</SubHeader>
      <Paragraph>{t("litepaper.fees.action.paragraph1")}</Paragraph>
      <SubHeader>{t("litepaper.fees.strategies.header")}</SubHeader>
      <Paragraph>{t("litepaper.fees.strategies.paragraph1")}</Paragraph>

      <Header>{t("litepaper.token.header")}</Header>
      <Paragraph>
        <Trans i18nKey="litepaper.token.paragraph1">
          <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
            docs
          </Link>
        </Trans>
      </Paragraph>
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
          <Paragraph>
            <Trans i18nKey="litepaper.token.community.contributions.general">
              <Link
                href="https://docs.backd.fund/resources/contributions"
                target="_blank"
                rel="noopener noreferrer"
              >
                contributions
              </Link>
            </Trans>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Trans i18nKey="litepaper.token.community.contributions.investment">
              <Link
                href="https://docs.backd.fund/resources/cookbook"
                target="_blank"
                rel="noopener noreferrer"
              >
                strategies
              </Link>
            </Trans>
          </Paragraph>
        </Item>
      </List>
      <Paragraph>
        <Trans i18nKey="litepaper.token.community.paragraph3">
          <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            discord channel
          </Link>
        </Trans>
      </Paragraph>
    </StyledLitepaperPage>
  );
};

export default LitepaperPage;
