import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import deleteIcon from "../../assets/ui/delete.svg";
import { Pool } from "../../lib";
import { removePosition } from "../../state/positionsSlice";
import { AppDispatch } from "../../app/store";
import { useBackd } from "../../app/hooks/use-backd";
import { Position } from "../../lib/types";
import { shortenAddress } from "../../lib/text";
import { useLoading } from "../../app/hooks/use-loading";

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
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const dispatch: AppDispatch = useDispatch();

  const handleRemovePosition = () => {
    if (!backd || loading) return;

    setLoading(true);
    dispatch(removePosition({ backd, pool, position })).then((v: any) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "remove" });
      setLoading(false);
    });
  };

  return (
    <StyledPosition>
      <Value>{position.protocol}</Value>
      <Value>{shortenAddress(position.account, 10)}</Value>
      <Value>{position.threshold}</Value>
      <Value>{`${position.singleTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
      <Value>{`${position.maxTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
      <Value>
        <DeleteButton>
          {loading && <CircularProgress size={17} />}
          {!loading && (
            <Delete src={deleteIcon} alt="delete button" onClick={() => handleRemovePosition()} />
          )}
        </DeleteButton>
      </Value>
    </StyledPosition>
  );
};

export default PositionRow;
