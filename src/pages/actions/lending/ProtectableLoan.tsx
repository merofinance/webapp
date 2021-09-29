import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ETH_DUMMY_ADDRESS } from "../../../lib/constants";
import { Lending, selectAave, selectCompound } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";
import { selectPrice } from "../../../state/selectors";

const StyledProtectableLoan = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.4rem;
  padding: 1.4rem;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 3.3rem;
  letter-spacing: 0.2px;
  opacity: 0.6;
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 3.4rem;
  letter-spacing: 0.2px;
`;

interface Props {
  protocol: string;
  loan?: Lending;
}

const ProtectableLoan = ({ protocol, loan }: Props) => {
  const { t } = useTranslation();
  const ethPrice = useSelector(selectEthPrice);

  if (!loan) return <></>;

  return (
    <StyledProtectableLoan>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{protocol}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value>{loan.healthFactor.toCryptoString()}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value>{loan.totalCollateralETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value>{loan.totalDebtETH.toUsdValue(ethPrice)}</Value>
      </Column>
    </StyledProtectableLoan>
  );
};

export default ProtectableLoan;
