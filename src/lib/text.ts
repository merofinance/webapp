export const shortenAddress = (address: string, length: number) => {
  if (address.length <= length) return address;
  const sideLength = Math.round(length / 2);
  return address.slice(0, sideLength) + "..." + address.slice(address.length - sideLength);
};

export const formatAmountInput = (number: number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 16 });
};
