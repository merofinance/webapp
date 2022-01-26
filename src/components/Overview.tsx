import styled from "styled-components";
import { useTranslation } from "react-i18next";

import InfoCard from "./InfoCard";
import ExternalLink from "./ExternalLink";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.8;

  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

interface Props {
  description: string;
  link: string;
  defaultClosed?: boolean;
}

const Overview = ({ description, link, defaultClosed }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <InfoCard
      id="overview"
      defaultOpen={!defaultClosed}
      collapsible
      header={t("components.overview")}
    >
      <Content>
        <Description id="overview-description">{description}</Description>
        <ExternalLink label="components.moreInDocs" link={link} />
      </Content>
    </InfoCard>
  );
};

export default Overview;
