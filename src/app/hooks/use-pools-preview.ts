import { useEffect, useState } from "react";
import { ScaledNumber } from "scaled-number";
import POOL_METADATA, { PoolMetadata } from "../../lib/data/pool-metadata";
import { Optional, Pool } from "../../lib/types";

interface DataResponse {
  timestamp: string;
  tvlUsd: number;
  apy: number;
  apyBase: number;
  apyReward: number;
  il7d: number;
  apyBase7d: number;
  symbol: string;
}

const usePoolsPreview = (): Optional<Pool[]> => {
  const [pools, setPools] = useState<Optional<Pool[]>>(null);

  const fetchPools = async () => {
    const queries = POOL_METADATA.filter((metadata: PoolMetadata) => metadata.id).map(
      async (data) => {
        const response = await fetch(`https://yields.llama.fi/chart/${data.id}`);
        const json = await response.json();
        return {
          symbol: data.symbol,
          ...json.data.slice(-1)[0],
        };
      }
    );
    const response = await Promise.all(queries);
    const pools_: Pool[] = response.map((poolResponse: DataResponse) => {
      const pool_: Pool = {
        address: "",
        apy: ScaledNumber.fromUnscaled(poolResponse.apy / 100),
        exchangeRate: ScaledNumber.fromUnscaled(1),
        feeDecreasePeriod: ScaledNumber.fromUnscaled(1),
        lpToken: {
          address: "",
          decimals: 18,
          name: "",
          symbol: poolResponse.symbol,
        },
        maxWithdrawalFee: ScaledNumber.fromUnscaled(1),
        minWithdrawalFee: ScaledNumber.fromUnscaled(1),
        name: "",
        stakerVaultAddress: "",
        totalAssets: ScaledNumber.fromUnscaled(poolResponse.tvlUsd),
        underlying: {
          address: "",
          decimals: 18,
          name: "",
          symbol: poolResponse.symbol,
        },
        strategyInfo: null,
        isPaused: false,
      };
      return pool_;
    });
    setPools(pools_);
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return pools;
};

export default usePoolsPreview;
