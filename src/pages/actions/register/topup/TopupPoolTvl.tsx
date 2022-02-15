import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectPrices } from "../../../../state/poolsListSlice";
import { Pool } from "../../../../lib";
import { Optional } from "../../../../lib/types";

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

const TopupPoolTvl = ({ pool }: Props): Optional<JSX.Element> => {
  const prices = useSelector(selectPrices);
  // TODO Update this

  if (!pool) return null;

  const price = prices[pool.underlying.symbol];
  return <Value>{price ? pool.totalAssets.toCompactUsdValue(price) : null}</Value>;
};

export default TopupPoolTvl;
