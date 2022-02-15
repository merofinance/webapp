import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectEthPrice, selectPools, selectPrices } from "../../../../state/poolsListSlice";
import { Pool } from "../../../../lib";
import { selectBalances } from "../../../../state/userSlice";
import { selectPositions } from "../../../../state/positionsSlice";
import { ScaledNumber } from "../../../../lib/scaled-number";
import { Optional, Position } from "../../../../lib/types";
import Loader from "../../../../components/Loader";

const Value = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  text-align: left;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

interface Props {
  pool: Optional<Pool>;
}

const TopupPoolDeposits = ({ pool }: Props): Optional<JSX.Element> => {
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);
  const prices = useSelector(selectPrices);
  // TODO Update this

  if (!pool) return null;

  const price = prices[pool.underlying.symbol];
  return (
    <Value>
      {price && positions
        ? (balances[pool.lpToken.address] || ScaledNumber.fromUnscaled(0, pool.underlying.decimals))
            .add(
              positions
                .filter((position: Position) => position.depositToken === pool.lpToken.symbol)
                .reduce(
                  (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
                  ScaledNumber.fromUnscaled(0, pool.underlying.decimals)
                )
            )
            .toCompactUsdValue(price)
        : null}
    </Value>
  );
};

export default TopupPoolDeposits;
