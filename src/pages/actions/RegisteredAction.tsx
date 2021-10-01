import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Position, Pool } from "../../lib/types";
import { selectPools } from "../../state/poolsListSlice";
import chevron from "../../assets/ui/chevron.svg";
import { selectPrice } from "../../state/selectors";
import Popup from "../../components/Popup";

const StyledRegisteredAction = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #2b293d;
  background-color: rgba(20, 17, 40, 1);
  border-radius: 1.4rem;
  padding: 1.3rem 1.4rem;
  margin-top: 1rem;
  cursor: pointer;

  transition: background-color 0.3s;
  :hover {
    background-color: #1a1438;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const ChevronData = styled.td`
  width: 2.4rem;

  @media (max-width: 600px) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

interface Props {
  position: Position;
}

const RegisteredAction = ({ position }: Props) => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const pool = pools.filter((pool: Pool) => pool.lpToken.address === position.depositToken)[0];
  const price = useSelector(selectPrice(pool));
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledRegisteredAction onClick={() => setOpen(true)}>
        <Column>
          <Header>{t("actions.registered.columns.type")}</Header>
          <Value>{t("actions.topup.label")}</Value>
        </Column>
        <Column>
          <Header>{t("actions.registered.columns.locked")}</Header>
          <Value>{position.maxTopUp.toCompactUsdValue(price)}</Value>
        </Column>
        <Column>
          <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
          <Value>{position.protocol}</Value>
        </Column>
        <Column>
          <Header>{t("pool.tabs.positions.fields.threshold.label")}</Header>
          <Value>{position.threshold.toCryptoString()}</Value>
        </Column>
        <ChevronData>
          <Chevron src={chevron} alt="right arrow" />
        </ChevronData>
      </StyledRegisteredAction>
      <Popup show={open} close={() => setOpen(false)} header="test" content={<p>test</p>} />
    </>
  );
};

export default RegisteredAction;
