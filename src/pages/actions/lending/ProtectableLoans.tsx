import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Loan, Position } from "../../../lib/types";
import { selectLoans } from "../../../state/lendingSlice";
import { selectPositions } from "../../../state/positionsSlice";
import ProtectableLoan from "./ProtectableLoan";

const StyledProtectableLoans = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  padding: 2.4rem 1.6rem;
  margin-bottom: 2.4rem;
`;

const Header = styled.div`
  font-weight: 700;
  letter-spacing: 0.25px;

  font-size: 2.4rem;
  line-height: 4.2rem;
  margin-bottom: 0.2rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
    line-height: 2.2rem;
    margin-bottom: 0.3rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.8;
  margin-bottom: 0.4rem;

  font-size: 1.5rem;
  line-height: 2.1rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const ProtectableLoans = (): JSX.Element => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const loans = useSelector(selectLoans(account));
  const positions = useSelector(selectPositions);

  const protectableLoans = loans.filter(
    (loan: Loan) =>
      loan.totalCollateralETH?.isZero &&
      !loan.totalCollateralETH.isZero() &&
      !positions.some((position: Position) => position.protocol === loan.protocol)
  );

  if (protectableLoans.length === 0) return <div />;

  return (
    <StyledProtectableLoans>
      <Header id="protectable-loans-header">{t("actions.suggestions.topup.header")}</Header>
      <SubHeader>{t("actions.suggestions.topup.subHeader")}</SubHeader>
      {protectableLoans.map((loan: Loan) => (
        <ProtectableLoan key={loan.protocol} loan={loan} />
      ))}
    </StyledProtectableLoans>
  );
};

export default ProtectableLoans;
