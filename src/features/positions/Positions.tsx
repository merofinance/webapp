import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackdContext } from "../../app/providers/backd";
import { AppDispatch } from "../../app/store";
import { Pool } from "../../lib";
import { fetchPositions, selectPositions } from "./positionsSlice";

type PositionsProps = {
  pool: Pool;
};

export function Positions({ pool }: PositionsProps) {
  const positions = useSelector(selectPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useContext(BackdContext);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions(backd, pool));
  }, [backd, dispatch, pool]);

  return (
    <>
      <h4>Positions</h4>
      <p>You have {positions.length} positions registered</p>
    </>
  );
}
