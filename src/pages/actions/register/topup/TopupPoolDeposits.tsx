import styled from "styled-components";
import { useSelector } from "react-redux";

import { Pool } from "../../../../lib";
import { Optional } from "../../../../lib/types";
import { selectUsersPoolUsdUnlocked } from "../../../../state/valueSelectors";

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
  const usersPoolUsdUnlocked = useSelector(selectUsersPoolUsdUnlocked(pool));

  if (!usersPoolUsdUnlocked) return null;

  return <Value>{usersPoolUsdUnlocked.toCompactUsdValue(1)}</Value>;
};

export default TopupPoolDeposits;
