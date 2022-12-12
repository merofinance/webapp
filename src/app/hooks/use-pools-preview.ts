import { useEffect, useState } from "react";
import { ScaledNumber } from "scaled-number";
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

interface PoolData {
  id: string;
  symbol: string;
}

const POOL_DATA: PoolData[] = [
  {
    id: "42cd9ead-de9e-4878-99a1-a984e2ffb4d9",
    symbol: "FRAX",
  },
  {
    id: "2e9d6ab7-4329-48fd-b962-2ae0e58fc162",
    symbol: "USDT",
  },
  {
    id: "d9b38ffb-b796-454c-a115-7643fee20f5d",
    symbol: "ETH",
  },
  {
    id: "65f68bad-18ed-45a7-b089-813780516cdd",
    symbol: "DAI",
  },
  {
    id: "9078aa8f-7378-4969-925e-567e0c9b8da9",
    symbol: "USDC",
  },
];

const usePoolsPreview = (): Optional<Pool[]> => {
  const [pools, setPools] = useState<Optional<Pool[]>>(null);

  const fetchPools = async () => {
    const queries = POOL_DATA.map(async (data) => {
      const response = await fetch(`https://yields.llama.fi/chart/${data.id}`);
      const json = await response.json();
      return {
        symbol: data.symbol,
        ...json.data.slice(-1)[0],
      };
    });
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
        harvestable: ScaledNumber.fromUnscaled(1),
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
