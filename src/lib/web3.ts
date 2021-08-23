export const changeNetwork = (chainId: number): void => {
  (window as any).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${chainId.toString(16)}` }],
  });
};
