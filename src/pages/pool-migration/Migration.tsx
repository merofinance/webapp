import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import Asset from "../../components/Asset";
import Loader from "../../components/Loader";
import { Pool } from "../../lib";
import { GradientText } from "../../styles/GradientText";
import {
  selectUsersPoolUnderlyingEverywhere,
  selectProtocolPoolUnderlyingEverywhere,
} from "../../state/valueSelectors";
import { selectPrice } from "../../state/poolsListSlice";

const StyledMigration = styled.div`
  width: 100%;
  height: 7.2rem;
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--row-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 1.7rem;

  transition: background-color 0.3s;
  :hover {
    background-color: #1a1438;
  }

  @media (max-width: 1387px) {
    > div:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 1076px) {
    > div:nth-child(2) {
      display: none;
    }
  }
`;

const Item = styled.div`
  flex: 1;
`;

const Apy = styled(GradientText)`
  letter-spacing: 0.15px;

  font-weight: 900;
  font-size: 1.6rem;
  line-height: 2rem;
  @media (max-width: 600px) {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Data = styled.div`
  letter-spacing: 0.15px;

  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
  @media (max-width: 600px) {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Buttons = styled.div`
  flex: 2.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-left: 1.6rem;
  }
`;

interface Props {
  pool: Pool;
}

const Migration = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const totalDeposits = useSelector(selectProtocolPoolUnderlyingEverywhere(pool));
  const deposits = useSelector(selectUsersPoolUnderlyingEverywhere(pool));

  return (
    <StyledMigration>
      <Item>
        <Asset token={pool.underlying} />
      </Item>
      <Item>
        <Apy>{pool.apy ? pool.apy.toPercent() : <Loader />}</Apy>
      </Item>
      <Item>
        <Data>{price && totalDeposits ? totalDeposits.toCompactUsdValue(price) : <Loader />}</Data>
      </Item>
      <Item>
        <Data>{price && deposits ? deposits.toCompactUsdValue(price) : <Loader />}</Data>
      </Item>
      <Buttons>
        <Button borderless medium width="13rem">
          {t("poolMigration.withdraw")}
        </Button>
        <Button primary medium width="13rem">
          {t("poolMigration.approve")}
        </Button>
        <Button primary medium width="13rem">
          {t("poolMigration.migrate")}
        </Button>
      </Buttons>
    </StyledMigration>
  );
};

export default Migration;
