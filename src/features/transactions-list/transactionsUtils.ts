import { ContractTransaction } from "@ethersproject/contracts";
import { batch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { parseTransactionReceipt, TransactionDescription, TransactionInfo } from "../../lib/types";
import { addTransaction, confirmTransaction } from "./transactionsSlice";

export async function handleTransactionConfirmation(
  tx: ContractTransaction,
  txDescription: TransactionDescription,
  dispatch: AppDispatch,
  // FIXME: Parameters<AppDispatch>[0] does not seem to work with non-thunk actions
  action?: any
) {
  const txInfo = {
    hash: tx.hash,
    chainId: tx.chainId,
    confirmations: tx.confirmations,
    description: txDescription,
    blockNumber: tx.blockNumber,
    timestamp: tx.timestamp || new Date().getTime(),
  };

  dispatch(addTransaction(txInfo));
  tx.wait().then((receipt) => {
    batch(() => {
      dispatch(confirmTransaction(parseTransactionReceipt(receipt)));
      if (action) {
        dispatch(action);
      }
    });
  });
}

export const formatTransactionInfo = (txDescription: TransactionDescription) => {
  switch (txDescription.action) {
    case "Approve":
      return txDescription.args?.amount.toLocaleString() + " " + txDescription.args?.token.symbol;
    case "Deposit":
      return txDescription.args?.amount.toLocaleString() + " " + txDescription.args?.pool.name;
    default:
      return "";
  }
};

export const getExplorerLink = ({ chainId, hash }: Pick<TransactionInfo, "chainId" | "hash">) => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`;
    case 3:
      return `https://ropsten.etherscan.io/tx/${hash}`;
    case 42:
      return `https://kovan.etherscan.io/tx/${hash}`;
    default:
      return `https://etherscan.io/tx/${hash}`;
  }
};
