import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Address, Position } from "../../lib/types";

type PositionsState = Record<Address, Position[]>;

interface PositionsWithPool {
  poolAddress: Address;
  positions: Position[];
}

const initialState: PositionsState = {};

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setPoolPositions: (state, action: PayloadAction<PositionsWithPool>) => {
      state[action.payload.poolAddress] = action.payload.positions;
    },
  },
});

export const { setPoolPositions } = positionsSlice.actions;

export const fetchPositions = (backd: Backd, pool: Pool): AppThunk => (
  dispatch
) => {
  backd
    .getPositions(pool.address)
    .then((positions) =>
      dispatch(setPoolPositions({ poolAddress: pool.address, positions }))
    );
};

export function selectPositions(pool: Pool): (state: RootState) => Position[] {
  return (state: RootState) => state.positions[pool.address] || [];
}

export default positionsSlice.reducer;
