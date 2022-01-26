import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Pool } from "../lib";
import { Backd } from "../lib/backd";
import {
  fromPlainPosition,
  Position,
  PlainPosition,
  toPlainPosition,
  Optional,
  PlainActionFees,
  ActionFees,
  fromPlainActionFees,
} from "../lib/types";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";
import { fetchAllowances, fetchBalances } from "./userSlice";

interface PositionsState {
  positions: PlainPosition[];
  fees: Optional<PlainActionFees>;
  loaded: boolean;
}

const initialState: PositionsState = {
  positions: [],
  fees: null,
  loaded: false,
};

export const fetchPositions = createAsyncThunk("positions/fetch", ({ backd }: { backd: Backd }) =>
  backd.getPositions()
);

export const fetchActionFees = createAsyncThunk(
  "positions/fetch-action-fees",
  ({ backd }: { backd: Backd }) => backd.getActionFees()
);

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchActionFees.fulfilled, (state, action) => {
      state.fees = action.payload;
    });
  },
});

type RegisterArgs = { backd: Backd; pool: Pool; position: Position };
type RemoveArgs = { backd: Backd; pool: Pool; position: Position };

export const registerPosition = createAsyncThunk(
  "positions/register",
  async ({ backd, pool, position }: RegisterArgs, { dispatch }) => {
    const tx = await backd.registerPosition(pool, position);
    handleTransactionConfirmation(
      tx,
      { action: "Register", args: { pool, plainPosition: toPlainPosition(position) } },
      dispatch,
      [
        fetchPositions({ backd }),
        fetchBalances({ backd, pools: [pool] }),
        fetchAllowances({ backd, pools: [pool] }),
      ]
    );
    return tx.hash;
  }
);

export const removePosition = createAsyncThunk(
  "positions/remove",
  async ({ backd, pool, position }: RemoveArgs, { dispatch }) => {
    const tx = await backd.removePosition(position.account, position.protocol);
    handleTransactionConfirmation(
      tx,
      { action: "Remove", args: { plainPosition: toPlainPosition(position) } },
      dispatch,
      [
        fetchPositions({ backd }),
        fetchBalances({ backd, pools: [pool] }),
        fetchAllowances({ backd, pools: [pool] }),
      ]
    );
    return tx.hash;
  }
);

export const selectPositions = (state: RootState): Optional<Position[]> =>
  state.positions.loaded
    ? state.positions.positions.map((position: PlainPosition) => fromPlainPosition(position))
    : null;

export function selectPoolPositions(
  pool: Optional<Pool>
): (state: RootState) => Optional<Position[]> {
  return (state: RootState) =>
    pool && state.positions.loaded
      ? state.positions.positions
          .filter((p) => p.actionToken === pool.underlying.address)
          .map((position: PlainPosition) => fromPlainPosition(position))
      : null;
}

export const selectActionFees = (state: RootState): Optional<ActionFees> =>
  state.positions.fees ? fromPlainActionFees(state.positions.fees) : null;

export default positionsSlice.reducer;
