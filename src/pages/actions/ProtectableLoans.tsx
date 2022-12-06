import { useWeb3React } from "@web3-react/core";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import logo from "../../assets/logo/logo.svg";
import { useDevice } from "../../app/hooks/use-device";
import { Loan, Optional, Position } from "../../lib/types";
import { selectLoans } from "../../state/lendingSlice";
import { selectPositions } from "../../state/positionsSlice";
import ProtectableLoan from "./register/topup/ProtectableLoan";

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
  background-image: linear-gradient(var(--bg-light), var(--bg-light)),
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
    margin-bottom: 0.7rem;
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

const MeroHelper = styled.img`
  left: -1rem;
  top: -1rem;
  position: absolute;
  width: 4.8rem;
  margin-right: 1rem;
`;

const ProtectableLoans = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const loans = useSelector(selectLoans(account));
  const positions = useSelector(selectPositions);
  const { isMobile } = useDevice();

  const protectableLoans = loans.filter(
    (loan: Loan) =>
      loan.totalCollateralETH?.isZero &&
      !loan.totalCollateralETH.isZero() &&
      positions &&
      !positions.some((position: Position) => position.protocol === loan.protocol)
  );

  if (protectableLoans.length === 0) return null;

  return (
    <StyledProtectableLoans>
      <Header id="protectable-loans-header">
        {isMobile
          ? t("actions.suggestions.topup.headerMobile")
          : t("actions.suggestions.topup.header")}
      </Header>
      <SubHeader>{t("actions.suggestions.topup.subHeader")}</SubHeader>
      {protectableLoans.map((loan: Loan) => (
        <ProtectableLoan key={loan.protocol} loan={loan} />
      ))}
      <MeroHelper src={logo} />
    </StyledProtectableLoans>
  );
};

export default ProtectableLoans;
