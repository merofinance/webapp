import { ETHERSCAN_URL } from "./constants";

export function openAndFocusWindow(address: string, target?: string) {
  const newWindow = window.open(address, target);
  if (newWindow) {
    newWindow.focus();
  }
}

export function openEtherscanAddress(address: string, target?: string) {
  const newWindow = window.open(`${ETHERSCAN_URL}${address}`, target);
  if (newWindow) {
    newWindow.focus();
  }
}
