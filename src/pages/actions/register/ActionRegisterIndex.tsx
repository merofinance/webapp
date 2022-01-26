import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ContentSection from "../../../components/ContentSection";
import Radio, { RadioOptionType } from "../../../components/Radio";
import icon from "../../../assets/logo/white-logo.svg";
import Button from "../../../components/Button";
import { useDevice } from "../../../app/hooks/use-device";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  margin-bottom: 3rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`;

const NoteContainer = styled.div`
  display: flex;
  align-items: flex-start;

  margin-top: 1.5rem;
  @media (max-width: 600px) {
    margin-top: 1.2rem;
  }
`;

const BackdIcon = styled.img`
  margin-right: 1rem;

  width: 2.2rem;
  @media (max-width: 600px) {
    width: 2rem;
  }
`;

const Note = styled.div`
  font-weight: 500;
  opacity: 0.8;

  font-size: 1.6rem;
  line-height: 2.3rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const ActionRegisterIndex = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const [actionOption, setActionOption] = useState("topup");

  const actions: RadioOptionType[] = [
    {
      value: "topup",
      label: t("actions.topup.label"),
    },
    {
      value: "null",
      label: isMobile ? t("components.comingSoon") : t("actions.more.label"),
      disabledText: t("components.comingSoon"),
    },
  ];

  return (
    <ContentSection
      header={t("actions.register.header")}
      nav="1/4"
      content={
        <Content>
          <Header>{t("actions.register.choose")}</Header>
          <Radio
            gradient
            options={actions}
            active={actionOption}
            setOption={(value: string) => setActionOption(value)}
          />
          <NoteContainer>
            <BackdIcon src={icon} />
            <Note id="top-up-note">{t("actions.topup.description")}</Note>
          </NoteContainer>
          <ButtonContainer>
            <Button
              id="register-action-button"
              primary
              medium
              width={isMobile ? "100%" : "44%"}
              click={() => navigate(`/actions/register/${actionOption}`)}
            >
              {t("components.continue")}
            </Button>
          </ButtonContainer>
        </Content>
      }
    />
  );
};

export default ActionRegisterIndex;
