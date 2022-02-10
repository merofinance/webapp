import { UnsupportedNetwork } from "../app/errors";
import { etherscanUrls } from "./constants";

export const changeNetwork = (chainId: number): void => {
  (window as any).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${chainId.toString(16)}` }],
  });
};

export const getEtherscanAddressLink = (chainId: number | undefined, address: string): string => {
  return getEtherscanLink(chainId, "address", address);
};

export const getEtherscanTransactionLink = (
  chainId: number | undefined,
  transactionHash: string
): string => {
  return getEtherscanLink(chainId, "tx", transactionHash);
};

const getEtherscanLink = (chainId: number | undefined, type: string, data: string): string => {
  if (!chainId) return "";
  const url = etherscanUrls[chainId];
  if (!url) throw new UnsupportedNetwork();
  return `${url}${type}/${data}`;
};
