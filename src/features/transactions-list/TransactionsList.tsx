import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Table, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  clearTransactions,
  pendingTransactionsCount,
  transactions,
  transactionsCount,
} from "./transactionsSlice";
import { formatTransactionInfo, getExplorerLink } from "./transactionsUtils";

type TransactionsListProps = {
  show: boolean;
  onClose: () => void;
};

export function TransactionsList({ show, onClose }: TransactionsListProps) {
  const txCount = useSelector(transactionsCount);
  const pendingTxCount = useSelector(pendingTransactionsCount);
  const dispatch: AppDispatch = useDispatch();
  const txs = useSelector(transactions);
  const title = txCount > 1 ? "transactions" : "transaction";

  const handleClearTransactions = () => {
    dispatch(clearTransactions());
  };

  const statusIcon = (status?: number): IconProp => {
    switch (status) {
      case undefined:
        return ["fas", "clock"];
      case 0:
        return ["fas", "times-circle"];
      default:
        return ["fas", "check"];
    }
  };

  return (
    <Toast
      show={show}
      onClose={onClose}
      style={{ position: "absolute", top: 60, right: 150, zIndex: 1000 }}
    >
      <Toast.Header>
        <strong className="mr-auto">
          {txCount} {title}
          <small>
            <Button
              title="Clear transactions"
              className="ml-2 text-body"
              size="sm"
              variant="link"
              onClick={handleClearTransactions}
            >
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </Button>
          </small>
        </strong>
        <small>{pendingTxCount} pending</small>
      </Toast.Header>
      <Toast.Body>
        <Table>
          <tbody>
            {txs.map((tx) => {
              return (
                <tr key={tx.hash}>
                  <td>
                    <FontAwesomeIcon icon={statusIcon(tx.status)} />
                  </td>
                  <td>{tx.description.action}</td>
                  <td>{formatTransactionInfo(tx.description)}</td>
                  <td>
                    <a href={getExplorerLink(tx)} className="text-body">
                      <FontAwesomeIcon icon={["fas", "external-link-alt"]} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Toast.Body>
    </Toast>
  );
}
