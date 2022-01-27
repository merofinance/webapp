import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import { useDevice } from "../../../app/hooks/use-device";
import icon from "../../../assets/logo/white-logo.svg";
import RowSelector from "../../../components/RowSelector";
import zap from "../../../assets/benefits/zap.svg";

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionIcon = styled.img`
  height: 1.8rem;
  margin-right: 0.6rem;
`;

const ActionValue = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  text-align: left;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const NoteContainer = styled.div`
  display: flex;
  align-items: flex-start;

  margin-top: 2.5rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
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
  const [actionOption, setActionOption] = useState("");

  return (
    <ContentSection header={t("actions.register.header")} nav="1/4">
      <Header>{t("actions.register.choose")}</Header>

      <RowSelector
        options={[
          {
            id: "action-topup-option",
            value: "topup",
            columns: [
              {
                label: "Action",
                value: (
                  <ActionContainer>
                    <ActionIcon src={zap} alt="Action icon" />
                    <ActionValue>Top-up</ActionValue>
                  </ActionContainer>
                ),
              },
              {
                label: "Description",
                value: t("actions.topup.description"),
                large: true,
              },
            ],
          },
        ]}
        value={actionOption}
        setValue={(value: string) => setActionOption(value)}
      />
      <NoteContainer>
        <BackdIcon src={icon} />
        <Note id="top-up-note">{t("actions.more.label")}</Note>
      </NoteContainer>
      <ButtonContainer>
        <Button
          id="register-action-button"
          disabled={!actionOption}
          hoverText={t("actions.register.choose")}
          primary
          medium
          width={isMobile ? "100%" : "44%"}
          click={() => navigate(`/actions/register/${actionOption}`)}
        >
          {t("components.continue")}
        </Button>
      </ButtonContainer>
    </ContentSection>
  );
};

export default ActionRegisterIndex;
