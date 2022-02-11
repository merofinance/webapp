import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { Optional, Pool } from "../../lib/types";
import {
  selectPoolDeposits,
  selectPoolTotalDeposits,
  selectPoolUnderlyingLocked,
  selectPrice,
} from "../../state/selectors";

interface Props {
  pool: Optional<Pool>;
}

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const locked = useSelector(selectPoolUnderlyingLocked(pool));
  const deposits = useSelector(selectPoolDeposits(pool));
  const totalDeposits = useSelector(selectPoolTotalDeposits(pool));

  return (
    <Statistics
      statistics={[
        {
          header: t("pool.statistics.deposits.header"),
          tooltip: t("pool.statistics.deposits.tooltip"),
          value:
            pool && deposits && deposits.toCryptoString
              ? `${deposits.toCryptoString()} ${pool.underlying.symbol}`
              : null,
          usd: pool && price && deposits && deposits.toUsdValue ? deposits.toUsdValue(price) : null,
        },
        {
          header: t("pool.statistics.locked.header"),
          tooltip: t("pool.statistics.locked.tooltip"),
          value:
            pool && locked && locked.toCryptoString
              ? `${locked.toCryptoString()} ${pool.underlying.symbol}`
              : null,
          usd: price && locked && locked.toUsdValue ? locked.toUsdValue(price) : null,
        },
        {
          header: t("pool.statistics.tvl.header"),
          tooltip: t("pool.statistics.tvl.tooltip"),
          value:
            pool && totalDeposits && totalDeposits.toCryptoString
              ? `${totalDeposits.toCryptoString()} ${pool.underlying.symbol}`
              : null,
          usd:
            price && totalDeposits && totalDeposits.toUsdValue
              ? totalDeposits.toUsdValue(price)
              : null,
        },
      ]}
    />
  );
};

export default PoolStatistics;
