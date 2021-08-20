import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";
import { useTranslation } from "react-i18next";

import AmountInput from "../../components/AmountInput";
import MultiStepButtons from "../../components/MultiStepButtons";
import { selectBalance } from "../../state/userSlice";
import { Token } from "../../lib/types";
import { GradientLink } from "../../styles/GradientText";
import { useDevice } from "../../app/hooks/use-device";

const StyledUnstakeTokens = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;

  font-size: 1.8rem;
  line-height: 2.6rem;
  margin-bottom: 3.7rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.9rem;
    margin-bottom: 1.7rem;
  }
`;

const MoreLink = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.46px;
  cursor: pointer;

  font-size: 1.8rem;
  line-height: 2.6rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.9rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  grid-gap: 1.8rem;

  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

type Props = {
  token: Token;
};

const UnstakeTokens = ({ token }: Props): JSX.Element => {
  const { t } = useTranslation();
  const balance = useSelector(selectBalance(token.address));
  const { isMobile } = useDevice();

  const [value, setValue] = useState("");
  const [approved, setApproved] = useState(false);

  const approve = async () => {
    setApproved(true);
  };

  const unstake = async () => {
    setApproved(false);
    setValue("");
  };

  return (
    <StyledUnstakeTokens>
      <Description>
        {t("stake.tabs.unstake.description")}{" "}
        <MoreLink href="" target="_blank" rel="noopener noreferrer">
          {t("stake.tabs.unstake.more")}
          <LaunchIcon
            fontSize={isMobile ? "small" : "medium"}
            style={{ fill: "var(--secondary)", transform: "translateY(2px)" }}
          />
        </MoreLink>
      </Description>
      <Content>
        <AmountInput
          token={token}
          noSlider
          value={value}
          setValue={(v: string) => setValue(v)}
          label={
            isMobile ? t("stake.tabs.unstake.inputMobile") : t("stake.tabs.unstake.inputDesktop")
          }
          max={balance}
        />
        <MultiStepButtons
          stepsOnTop
          disabled={!value}
          firstText={t("amountInput.approve", { asset: token.symbol })}
          firstAction={approve}
          firstComplete={approved}
          firstHoverText={t("amountInput.enter")}
          secondText={t("stake.tabs.unstake.action")}
          secondAction={unstake}
          secondHoverText={t("amountInput.approve", { asset: token.symbol })}
        />
      </Content>
    </StyledUnstakeTokens>
  );
};

export default UnstakeTokens;
