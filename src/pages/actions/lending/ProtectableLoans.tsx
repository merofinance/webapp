import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Loan, Position } from "../../../lib/types";
import { selectLoans } from "../../../state/lendingSlice";
import { selectPositions } from "../../../state/positionsSlice";
import ProtectableLoan from "./ProtectableLoan";
import logo from "../../../assets/logo/logo.svg";

const StyledProtectableLoans = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  padding: 1.6rem;
  padding-bottom: 2.4rem;
  margin-bottom: 2.4rem;

  // Background
  border: 1px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(#252140, #252140),
    linear-gradient(to right, var(--primary-gradient), var(--secondary-gradient));
`;

const Header = styled.div`
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-left: 4rem;

  font-size: 2.4rem;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
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

const BackdHelper = styled.img`
  left: -1rem;
  top: -1rem;
  position: absolute;
  width: 4.8rem;
  margin-right: 1rem;
`;

const ProtectableLoans = () => {
  const { t } = useTranslation();
  const loans = useSelector(selectLoans);
  const positions = useSelector(selectPositions);

  const protectableLoans = loans.filter(
    (loan: Loan) =>
      loan.totalCollateralETH?.isZero &&
      !loan.totalCollateralETH.isZero() &&
      !positions.some((position: Position) => position.protocol === loan.protocol)
  );

  if (protectableLoans.length === 0) return <></>;

  return (
    <StyledProtectableLoans>
      <Header id="protectable-loans-header">{t("actions.suggestions.topup.header")}</Header>
      <SubHeader>{t("actions.suggestions.topup.subHeader")}</SubHeader>
      {protectableLoans.map((loan: Loan) => (
        <ProtectableLoan key={loan.protocol} loan={loan} />
      ))}
      <BackdHelper src={logo} />
    </StyledProtectableLoans>
  );
};

export default ProtectableLoans;
