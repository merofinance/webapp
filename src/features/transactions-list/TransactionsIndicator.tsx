import React, { useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { TransactionsList } from "./TransactionsList";
import {
  fetchPendingTransactions,
  pendingTransactions,
  transactionsCount,
} from "./transactionsSlice";

export function TransactionsIndicator() {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const txCount = useSelector(transactionsCount);
  const pendingTxs = useSelector(pendingTransactions);
  const pendingTxCount = pendingTxs.length;
  const [showList, setShowList] = useState(false);
  const [baseText, value] =
    pendingTxCount > 0 ? ["pending transaction", pendingTxCount] : ["transaction", txCount];
  const text = value > 1 ? baseText + "s" : baseText;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (backd && pendingTxs.length > 0 && !loading) {
      setLoading(true);
      dispatch(
        fetchPendingTransactions({ backd, hashes: pendingTxs.map((tx) => tx.hash) })
      ).then(() => setLoading(false));
    }
  }, [backd, pendingTxs, dispatch, loading, setLoading]);

  return (
    <>
      <Nav.Link href="#" onClick={() => setShowList(!showList)}>
        {pendingTxCount > 0 ? (
          <Spinner size="sm" animation="border" variant="primary" className="mr-2" />
        ) : null}
        {value} {text}
      </Nav.Link>
      <TransactionsList show={showList} onClose={() => setShowList(false)} />
    </>
  );
}
