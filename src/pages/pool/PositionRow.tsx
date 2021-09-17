import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import deleteIcon from "../../assets/ui/delete.svg";
import { Pool } from "../../lib";
import { Position, TransactionInfo } from "../../lib/types";
import { shortenAddress } from "../../lib/text";
import { selectTransactions } from "../../state/transactionsSlice";
import DeletePositionConfirmation from "./DeletePositionConfirmation";

const StyledPosition = styled.div`
  width: 100%;
  display: flex;
  background: #2c2846;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin-top: 0.6rem;

  > div:last-child {
    justify-content: flex-end;
  }

  padding: 1.7rem 2rem;
  border-radius: 1.2rem;
  @media (max-width: 600px) {
    padding: 0 1.6rem;
    height: 3.8rem;
    border-radius: 0;
  }
`;

const Value = styled.div`
  flex: 1;
  font-weight: 400;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const Delete = styled.img`
  height: 1.4rem;
`;

type Props = {
  position: Position;
  pool: Pool;
};

const PositionRow = ({ position, pool }: Props): JSX.Element => {
  const pendingTx = useSelector(selectTransactions);
  const [deleting, setDeleting] = useState(false);

  const loading = pendingTx.some(
    (tx: TransactionInfo) =>
      tx.confirmations === 0 &&
      tx.description.action === "Remove" &&
      tx.description.args?.position.account === position.account &&
      tx.description.args?.position.protocol === position.protocol
  );

  return (
    <>
      <StyledPosition>
        <Value>{position.protocol}</Value>
        <Value>{shortenAddress(position.account, 10)}</Value>
        <Value>{position.threshold.toString()}</Value>
        <Value>{`${position.singleTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
        <Value>{`${position.maxTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
        <Value>
          <DeleteButton>
            {loading && <CircularProgress size={17} />}
            {!loading && (
              <Delete
                src={deleteIcon}
                alt="delete button"
                onClick={() => {
                  if (!loading) setDeleting(true);
                }}
              />
            )}
          </DeleteButton>
        </Value>
      </StyledPosition>
      <DeletePositionConfirmation
        show={deleting}
        close={() => setDeleting(false)}
        position={position}
        pool={pool}
        loading={loading}
      />
    </>
  );
};

export default PositionRow;
