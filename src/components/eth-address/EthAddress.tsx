import React from "react";
import { Address } from "../../lib/types";

const defaultMaxLength = 10;
const ethAddressLength = 40;
const defaultEllipsis = "...";
const addressPrefix = "0x";

type EthAddressProps = {
  value: Address;
  truncate?: "middle" | "end";
  maxLength?: number;
  ellipsis?: string;
  etherscanLink?: boolean;
};

export function EthAddress({
  value,
  truncate,
  maxLength = defaultMaxLength,
  ellipsis = defaultEllipsis,
  etherscanLink = false,
}: EthAddressProps) {
  // TODO: support other networks
  const etherscanURL = `https://etherscan.io/address/${value}`;

  const hasPrefix = value.startsWith(addressPrefix);
  if (hasPrefix) {
    value = value.slice(2);
  }
  const addressLength = value.length;

  if (addressLength !== ethAddressLength) {
    throw new Error(`invalid address: ${value}`);
  }

  if (truncate === "middle") {
    const takeUntil = Math.ceil(maxLength / 2);
    const takeFrom = addressLength - Math.floor(maxLength / 2);
    value =
      value.slice(0, takeUntil) +
      ellipsis +
      value.slice(takeFrom, value.length);
  } else if (truncate === "end") {
    value = value.slice(0, maxLength);
  }

  value = addressPrefix + value;
  return etherscanLink ? <a href={etherscanURL}>{value}</a> : <>{value}</>;
}
