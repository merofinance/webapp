import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Position, Pool } from "../../lib/types";
import { selectPools } from "../../state/poolsListSlice";
import { selectPrice } from "../../state/selectors";
import TopupAction from "./lending/TopupAction";
import { GradientText } from "../../styles/GradientText";

const StyledRegisteredAction = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

interface ValueProps {
  flex: number;
}

const Value = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  flex: ${(props: ValueProps) => props.flex};
  text-align: left;
`;

const ViewButton = styled.button`
  cursor: pointer;
  flex: 2;
`;

const ViewText = styled(GradientText)`
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  text-align: left;
`;

interface Props {
  position: Position;
}

const ExistingAction = ({ position }: Props) => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const pool = pools.filter((pool: Pool) => pool.lpToken.address === position.depositToken)[0];
  const price = useSelector(selectPrice(pool));
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledRegisteredAction onClick={() => setOpen(true)}>
        <Value flex={5}>{t("actions.topup.label")}</Value>
        <Value flex={3}>{position.maxTopUp.toCompactUsdValue(price)}</Value>
        <ViewButton>
          <ViewText>{t("components.view")}</ViewText>
        </ViewButton>
      </StyledRegisteredAction>
      <TopupAction show={open} close={() => setOpen(false)} position={position} pool={pool} />
    </>
  );
};

export default ExistingAction;
