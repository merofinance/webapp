import { TransactionInfo } from "../lib/types";
import { sortTransactions } from "./transactionsSlice";

test("sort transactions", () => {
  const baseTx: TransactionInfo = {
    hash: "0x",
    chainId: 1,
    confirmations: 0,
    timestamp: 2,
    description: { action: "test" },
  };
  const txs: TransactionInfo[] = [
    Object.assign({}, baseTx, { hash: "0x03", timestamp: 3 }),
    Object.assign({}, baseTx, { hash: "0x01", blockNumber: 5 }),
    Object.assign({}, baseTx, { hash: "0x04", timestamp: 4 }),
    Object.assign({}, baseTx, { hash: "0x02", blockNumber: 6 }),
  ];
  const sorted = sortTransactions(txs);
  expect(sorted[0].hash).toEqual("0x04");
  expect(sorted[1].hash).toEqual("0x03");
  expect(sorted[2].hash).toEqual("0x02");
  expect(sorted[3].hash).toEqual("0x01");
});
