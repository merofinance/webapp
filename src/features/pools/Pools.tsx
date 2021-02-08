import { BigNumber } from "ethers";
import React from "react";
import { PoolCard } from "../pool-card/PoolCard";

export function Pools() {
  const pools = [
    {
      asset: "DAI",
      name: "bDAI3CRV",
      apy: BigNumber.from("237"),
      totalAssets: BigNumber.from("84203003"),
    },
  ];

  return (
    <>
      <header className="text-center m-4">
        <h1 className="display-3">Pools</h1>
      </header>
      <div className="pools">
        {pools.map((pool) => (
          <PoolCard pool={pool} />
        ))}
      </div>
    </>
  );
}
