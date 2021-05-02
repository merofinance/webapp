import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Position } from "../../lib/types";
import { logout } from "../account/accountSlice";

type PositionsState = Position[];

const initialState: PositionsState = [];

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<Position[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state, action) => {
      return initialState;
    });
  },
});

export const { setPositions } = positionsSlice.actions;

export const fetchPositions = (backd: Backd): AppThunk => (dispatch) => {
  backd.getPositions().then((positions) => dispatch(setPositions(positions)));
};

export function selectPositions(pool: Pool): (state: RootState) => Position[] {
  return (state: RootState) =>
    state.positions.filter((p) => p.actionToken === pool.underlying.address);
}

export default positionsSlice.reducer;
