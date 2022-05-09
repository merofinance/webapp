import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { useDevice } from "../../app/hooks/use-device";
import { GradientLink } from "../../styles/GradientText";
import Button from "../../components/Button";
import bg from "../../assets/illustrations/light-bg.svg";

const StyledPoolMigrationPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TextSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  height: 184%;
`;

const Header = styled.h1`
  font-weight: 700;
  font-size: 3.8rem;
  margin-bottom: 1.7rem;
`;

const Description = styled.h3`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  max-width: 50rem;
  text-align: center;
  margin-bottom: 3.7rem;
`;

const Link = styled(GradientLink)`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
`;

const PoolMigrationPage = (): JSX.Element => {
  const { isMobile } = useDevice();
  const { t } = useTranslation();

  return (
    <StyledPoolMigrationPage>
      <TextSection>
        <Background src={bg} alt="Background" />

        <Header>{t("poolMigration.header")}</Header>
        <Description>
          {t("poolMigration.details")}{" "}
          <Link href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
            {t("components.moreInBlog")}
            <LaunchIcon
              fontSize={isMobile ? "small" : "medium"}
              style={{
                fill: "var(--secondary)",
                transform: "translateY(2px)",
                marginLeft: "3px",
              }}
            />
          </Link>
        </Description>
        <Button square primary width="25rem">
          {t("poolMigration.migrateAll")}
        </Button>
      </TextSection>
    </StyledPoolMigrationPage>
  );
};

export default PoolMigrationPage;
