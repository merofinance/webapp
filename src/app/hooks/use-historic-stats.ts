import { useEffect, useState } from "react";
import POOL_METADATA from "../../lib/data/pool-metadata";

interface DataResponse {
  timestamp: string;
  tvlUsd: number;
  apy: number;
}

interface HistoricStat {
  date: Date;
  tvlUsd: number;
  apy: number;
}

const useHistoricStats = (poolSymbol: string | null): HistoricStat[] | null => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!poolSymbol) return null;
    const id = POOL_METADATA.find((pool) => pool.symbol === poolSymbol)?.id;
    if (!id) return null;
    const response = await fetch(`https://yields.llama.fi/chart/${id}`);
    const json = await response.json();
    const data_ = json.data.map((data: DataResponse) => {
      const stat: HistoricStat = {
        date: new Date(data.timestamp),
        tvlUsd: data.tvlUsd,
        apy: data.apy,
      };
      return stat;
    });
    setData(data_);
  };

  useEffect(() => {
    fetchData();
  }, [poolSymbol]);

  return data;
};

export default useHistoricStats;
