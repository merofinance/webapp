import { ContractTransaction } from "@ethersproject/contracts";
import { batch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  parseTransactionReceipt,
  Position,
  TransactionDescription,
  TransactionInfo,
} from "../../lib/types";
import { addTransaction, confirmTransaction } from "./transactionsSlice";

export async function handleTransactionConfirmation(
  tx: ContractTransaction,
  txDescription: TransactionDescription,
  dispatch: AppDispatch,
  // FIXME: Parameters<AppDispatch>[0] does not seem to work with non-thunk actions
  actions: any[] = []
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
      actions.forEach((action) => dispatch(action));
    });
  });
}

export const formatTransactionInfo = (txDescription: TransactionDescription) => {
  switch (txDescription.action) {
    case "Approve":
      return txDescription.args?.amount.toLocaleString() + " " + txDescription.args?.token.symbol;
    case "Deposit":
      return (
        txDescription.args?.amount.toLocaleString() +
        " " +
        txDescription.args?.pool.underlying.symbol
      );
    case "Withdraw":
      return (
        txDescription.args?.amount.toLocaleString() + " " + txDescription.args?.pool.lpToken.symbol
      );
    case "Unstake":
      return (
        txDescription.args?.amount.toLocaleString() + " " + txDescription.args?.pool.lpToken.symbol
      );
    case "Register": {
      const position: Position = txDescription.args?.position;
      return position.account.slice(0, 8) + "... on " + position.protocol;
    }
    case "Remove": {
      const position: Position = txDescription.args?.position;
      return position.account.slice(0, 8) + "... on " + position.protocol;
    }
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
