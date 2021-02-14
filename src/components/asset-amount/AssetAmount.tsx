import React from "react";
import NumberFormat from "react-number-format";

type AssetAmountProps = {
  asset: string;
  amount: number;
  price: number;
  newLine?: boolean;
  parenthesis?: boolean;
};

export function AssetAmount({
  asset,
  amount,
  price,
  newLine,
  parenthesis,
}: AssetAmountProps) {
  const totalUSD = Math.round(amount * price);
  return (
    <>
      <NumberFormat
        displayType={"text"}
        value={totalUSD}
        thousandSeparator={true}
        prefix="$"
      />

      {newLine ? <br /> : null}
      <small>
        {parenthesis ? " (" : null}
        <NumberFormat
          displayType={"text"}
          value={amount}
          thousandSeparator={true}
          suffix={` ${asset}`}
        />
        {parenthesis ? ")" : null}
      </small>
    </>
  );
}
