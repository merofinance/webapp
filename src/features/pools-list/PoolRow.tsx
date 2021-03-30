import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { getImage } from "../../images/tokens";
import { Pool } from "../../lib";
import { AssetAmount } from "../../components/asset-amount/AssetAmount";
import styles from "./PoolRow.module.scss";

export type PoolRowProps = {
  pool: Pool;
  balance: number;
  price: number;
};

export function PoolRow({ pool, balance, price }: PoolRowProps) {
  return (
    <tr>
      <td>
        <img height="40" src={getImage(pool)} alt={`${pool.lpToken.symbol} logo`} />
      </td>
      <td>{pool.name}</td>
      <td>{pool.underlying.symbol}</td>
      <td>
        <NumberFormat displayType={"text"} value={pool.apy} suffix="%" />
      </td>
      <td className={styles.shorter}>
        <AssetAmount
          asset={pool.underlying.symbol}
          amount={pool.totalAssets}
          price={price}
          newLine={true}
        />
      </td>
      <td className={styles.shorter}>
        <AssetAmount asset={pool.underlying.symbol} amount={balance} price={price} newLine={true} />
      </td>
      <td className={styles.actions}>
        <Link to={`/${pool.lpToken.symbol}/deposit`} className="btn btn-sm btn-secondary">
          Deposit
        </Link>
        <Link to={`/${pool.lpToken.symbol}/withdraw`} className="btn btn-sm btn-secondary">
          Withdraw
        </Link>

        <Link to={`/${pool.lpToken.symbol}/positions`} className="btn btn-sm btn-secondary">
          Positions
        </Link>
      </td>
    </tr>
  );
}
