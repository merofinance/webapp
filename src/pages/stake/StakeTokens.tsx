import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";
import { useTranslation } from "react-i18next";

import AmountInput from "../../components/AmountInput";
import ApproveThenAction from "../../components/ApproveThenAction";
import { Token } from "../../lib/types";
import { GradientLink } from "../../styles/GradientText";
import { useDevice } from "../../app/hooks/use-device";
import { ScaledNumber } from "../../lib/scaled-number";
import { selectEthBalance } from "../../state/userSlice";

const StyledStakeTokens = styled.div`
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

interface Props {
  token: Token;
}

const StakeTokens = ({ token }: Props): JSX.Element => {
  const { t } = useTranslation();
  const balance = useSelector(selectEthBalance); // TODO This is not the correct balance
  const { isMobile } = useDevice();

  const [value, setValue] = useState("");

  const stake = async () => {
    setValue("");
  };

  return (
    <StyledStakeTokens>
      <Description>
        {t("stake.tabs.stake.description")}{" "}
        <MoreLink href="" target="_blank" rel="noopener noreferrer">
          {t("stake.tabs.stake.more")}
          <LaunchIcon
            fontSize={isMobile ? "small" : "medium"}
            style={{ fill: "var(--secondary)", transform: "translateY(2px)" }}
          />
        </MoreLink>
      </Description>
      <Content>
        <AmountInput
          noSlider
          value={value}
          setValue={(v: string) => setValue(v)}
          label={isMobile ? t("stake.tabs.stake.inputMobile") : t("stake.tabs.stake.inputDesktop")}
          max={balance}
          error=""
          symbol="DAI"
        />
        <ApproveThenAction
          stepsOnTop
          label={t("stake.tabs.stake.action")}
          action={stake}
          value={ScaledNumber.fromUnscaled(value)}
          loading={false}
          disabled={!value}
          token={token}
          contract=""
        />
      </Content>
    </StyledStakeTokens>
  );
};

export default StakeTokens;
