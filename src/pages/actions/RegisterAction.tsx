import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import Radio, { RadioOptionType } from "../../components/Radio";

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

const RegisterAction = () => {
  const { t } = useTranslation();
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
      value: "limitOrder",
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
        </Content>
      }
    />
  );
};

export default RegisterAction;
