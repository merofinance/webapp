import React from "react";
import styled from "styled-components";
import deleteIcon from "../../assets/ui/delete.svg";
import { Pool } from "../../lib";
import { useDispatch } from "react-redux";
import { removePosition } from "../../features/positions/positionsSlice";
import { AppDispatch } from "../../app/store";
import { useBackd } from "../../app/hooks/use-backd";
import { Position } from "../../lib/types";
import { shortenAddress } from "../../lib/text";
import { useLoading } from "../../app/hooks/use-loading";

export type PositionType = {
  protocol: string;
  borrower: string;
  threshold: number;
  single: number;
  total: number;
};

const StyledPosition = styled.div`
  width: 100%;
  display: flex;
  background: #2c2846;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1.2rem;
  padding: 1.7rem 2rem;
  margin-top: 0.6rem;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const PositionRow = ({ position, pool }: Props) => {
  const backd = useBackd();
  const { setLoading, handleTxDispatch } = useLoading();
  const dispatch: AppDispatch = useDispatch();

  const handleRemovePosition = () => {
    if (!backd) return;

    setLoading(true);
    dispatch(removePosition({ backd, pool, position })).then((v: any) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "remove" });
    });
  };

  return (
    <StyledPosition>
      <Value>{position.protocol}</Value>
      <Value>{shortenAddress(position.account, 10)}</Value>
      <Value>{position.threshold}</Value>
      <Value>{`${position.singleTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
      <Value>{`${position.totalTopUp} ${pool.underlying.symbol.toUpperCase()}`}</Value>
      <Value>
        <DeleteButton>
          <Delete src={deleteIcon} alt="delete button" onClick={() => handleRemovePosition()} />
        </DeleteButton>
      </Value>
    </StyledPosition>
  );
};

export default PositionRow;
