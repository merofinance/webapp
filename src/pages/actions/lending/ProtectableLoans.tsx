import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Position } from "../../../lib/types";
import { selectAave, selectCompound } from "../../../state/lendingSlice";
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
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 4.2rem;
  letter-spacing: 0.25px;
  margin-bottom: 0.2rem;
`;

const SubHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.1rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
  margin-bottom: 0.4rem;
`;

const ProtectableLoans = () => {
  const { t } = useTranslation();
  const aave = useSelector(selectAave);
  const compound = useSelector(selectCompound);
  const positions = useSelector(selectPositions);

  const hasPositionForProtocol = (protocol: string) =>
    positions.some((position: Position) => position.protocol === protocol);

  const hasAave =
    aave?.totalCollateralETH?.isZero &&
    !aave.totalCollateralETH.isZero() &&
    !hasPositionForProtocol("Aave");

  const hasCompound =
    compound?.totalCollateralETH?.isZero &&
    !compound.totalCollateralETH.isZero() &&
    !hasPositionForProtocol("Compound");

  if (!hasAave && !hasCompound) return <></>;

  return (
    <StyledProtectableLoans>
      <Header>{t("actions.suggestions.topup.header")}</Header>
      <SubHeader>{t("actions.suggestions.topup.subHeader")}</SubHeader>
      {hasAave && <ProtectableLoan protocol="Aave" loan={aave} />}
      {hasCompound && <ProtectableLoan protocol="Compound" loan={compound} />}
    </StyledProtectableLoans>
  );
};

export default ProtectableLoans;
