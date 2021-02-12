import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { getImage } from "../../images/tokens";
import { Pool } from "../../lib";
import { AssetAmount } from "../asset-amount/AssetAmount";
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
        <img height="40" src={getImage(pool)} alt={`${pool.asset} logo`} />
      </td>
      <td>{pool.name}</td>
      <td>{pool.asset}</td>
      <td>
        <NumberFormat displayType={"text"} value={pool.apy} suffix="%" />
      </td>
      <td className={styles.shorter}>
        <AssetAmount
          asset={pool.asset}
          amount={pool.totalAssets}
          price={price}
          newLine={true}
        />
      </td>
      <td className={styles.shorter}>
        <AssetAmount
          asset={pool.asset}
          amount={balance}
          price={price}
          newLine={true}
        />
      </td>
      <td className={styles.actions}>
        <Link
          to={`/app/${pool.name}/deposit`}
          className="btn btn-sm btn-secondary"
        >
          Deposit
        </Link>
        <Link
          to={`/app/${pool.name}/withdraw`}
          className="btn btn-sm btn-secondary"
        >
          Withdraw
        </Link>

        <Link
          to={`/app/${pool.name}/positions`}
          className="btn btn-sm btn-secondary"
        >
          Positions
        </Link>
      </td>
    </tr>
  );
}
