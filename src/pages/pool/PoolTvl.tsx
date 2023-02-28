import dateFormat from "dateformat";

import useHistoricStats from "../../app/hooks/use-historic-stats";
import InfoChart from "../../components/InfoChart";
import { Pool } from "../../lib";
import { Optional } from "../../lib/types";

interface Props {
  pool: Pool | null;
}

const PoolTvl = ({ pool }: Props): Optional<JSX.Element> => {
  const stats = useHistoricStats(pool ? pool.underlying.symbol : null);

  if (!stats) return null;

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - 12);
  const recentStats = stats?.filter((stat) => stat.date > cutoffDate);

  const data = recentStats.map((stat) => stat.tvlUsd);
  const labels = recentStats.map((stat) => dateFormat(stat.date, "d mmm"));

  return <InfoChart header="Historic TVL" data={data} labels={labels} />;
};

export default PoolTvl;
