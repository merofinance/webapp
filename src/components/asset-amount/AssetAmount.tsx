import React from "react";
import NumberFormat from "react-number-format";

type AssetAmountProps = {
  asset: string;
  amount: number;
  price: number;
  newLine?: boolean;
  parenthesis?: boolean;
  nativeFirst?: boolean;
  smallSecondary?: boolean;
};

export function AssetAmount({
  asset,
  amount,
  price,
  newLine = false,
  parenthesis = false,
  nativeFirst = false,
  smallSecondary = true,
}: AssetAmountProps) {
  const totalUSD = Math.round(amount * price);
  const usdAmount = (
    <NumberFormat
      displayType={"text"}
      value={totalUSD}
      thousandSeparator={true}
      prefix="$"
    />
  );

  const nativeAmount = (
    <NumberFormat
      displayType={"text"}
      value={amount}
      thousandSeparator={true}
      suffix={` ${asset}`}
    />
  );

  const innerElem = (
    <>
      {parenthesis ? " (" : null}
      {nativeFirst ? usdAmount : nativeAmount}
      {parenthesis ? ")" : null}
    </>
  );

  return (
    <>
      {nativeFirst ? nativeAmount : usdAmount}

      {newLine ? <br /> : null}
      {smallSecondary ? <small>{innerElem}</small> : innerElem}
    </>
  );
}
