import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";

import ContentSection from "../../components/ContentSection";
import Radio, { RadioOptionType } from "../../components/Radio";
import icon from "../../assets/logo/white-logo.svg";
import Button from "../../components/Button";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 3rem;
`;

const NoteContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1.5rem;
`;

const BackdIcon = styled.img`
  width: 2.2rem;
  margin-right: 1rem;
`;

const Note = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.3rem;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterAction = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [action, setAction] = useState("topup");

  const actions: RadioOptionType[] = [
    {
      value: "topup",
      label: t("actions.topup.label"),
    },
    {
      value: "uniswap",
      label: t("actions.uniswap.label"),
      disabledText: t("components.comingSoon"),
    },
    {
      value: "limit",
      label: t("actions.limitOrder.label"),
      disabledText: t("components.comingSoon"),
    },
    {
      value: "curve",
      label: t("actions.curve.label"),
      disabledText: t("components.comingSoon"),
    },
    {
      value: "nfts",
      label: t("actions.nfts.label"),
      disabledText: t("components.comingSoon"),
    },
  ];

  return (
    <ContentSection
      header={t("actions.register.header")}
      content={
        <Content>
          <Header>{t("actions.register.choose")}</Header>
          <Radio
            options={actions}
            active={action}
            setOption={(value: string) => setAction(value)}
          />
          <NoteContainer>
            <BackdIcon src={icon} />
            <Note>{t("actions.topup.description")}</Note>
          </NoteContainer>
          <ButtonContainer>
            <Button
              primary
              medium
              width="44%"
              text={t("components.continue")}
              click={() => history.push(`/actions/register/${action}`)}
            />
          </ButtonContainer>
        </Content>
      }
    />
  );
};

export default RegisterAction;
