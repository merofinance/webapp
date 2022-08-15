export const shortenAddress = (address: string, length: number): string => {
  if (address.length <= length) return address;
  const sideLength = Math.round(length / 2);
  return `${address.slice(0, sideLength)}...${address.slice(address.length - sideLength)}`;
};

export const encodeAddress = (address: string): string => {
  return address + "0".repeat(66 - address.length);
};
