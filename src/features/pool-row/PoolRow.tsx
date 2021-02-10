import React from "react";
import { Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import tokenImages from "../../images/tokens";
import dogeCoin from "../../images/tokens/dogecoin.png";
import { Pool } from "../../lib";

type AmountCellProps = {
  asset: string;
  amount: number;
  price: number;
};

function AmountCell({ asset, amount, price }: AmountCellProps) {
  const totalUSD = Math.round(amount * price);
  return (
    <>
      <NumberFormat
        displayType={"text"}
        value={totalUSD}
        thousandSeparator={true}
        prefix="$"
      />

      <br />
      <small>
        <NumberFormat
          displayType={"text"}
          value={amount}
          thousandSeparator={true}
          suffix={` ${asset}`}
        />
      </small>
    </>
  );
}

export type PoolRowProps = {
  pool: Pool;
  balance: number;
  price: number;
};

export function PoolRow({ pool, balance, price }: PoolRowProps) {
  const image = pool.asset in tokenImages ? tokenImages[pool.asset] : dogeCoin;

  return (
    <tr>
      <td>
        <img height="40" src={image} alt={`${pool.asset} logo`} />
      </td>
      <td>{pool.name}</td>
      <td>{pool.asset}</td>
      <td>
        <NumberFormat displayType={"text"} value={pool.apy} suffix="%" />
      </td>
      <td>
        <AmountCell
          asset={pool.asset}
          amount={pool.totalAssets}
          price={price}
        />
      </td>
      <td>
        <AmountCell asset={pool.asset} amount={balance} price={price} />
      </td>
      <td>
        <Button size="sm" variant="secondary">
          Deposit
        </Button>
      </td>
      <td>
        <Button size="sm" variant="secondary">
          Positions
        </Button>
      </td>
    </tr>
  );
}
