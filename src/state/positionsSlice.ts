import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";

import { RootState } from "../app/store";
import { Pool } from "../lib";
import { Mero } from "../lib/mero";
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
import { fetchAllowances, fetchBalances, fetchGasBankBalance } from "./userSlice";

interface PositionsState {
  positions: PlainPosition[];
  fees: Optional<PlainActionFees>;
  loaded: boolean;
  estimatedGasUsage: Optional<PlainScaledNumber>;
}

const initialState: PositionsState = {
  positions: [],
  fees: null,
  loaded: false,
  estimatedGasUsage: null,
};

export const fetchPositions = createAsyncThunk("positions/fetch", ({ mero }: { mero: Mero }) =>
  mero.getPositions()
);

export const fetchEstimatedGasUsage = createAsyncThunk(
  "positions/fetch-estimated-gas-usage",
  ({ mero }: { mero: Mero }) => mero.getEstimatedGasUsage()
);

export const fetchActionFees = createAsyncThunk(
  "positions/fetch-action-fees",
  ({ mero }: { mero: Mero }) => mero.getActionFees()
);

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setPositionsLoaded: (state) => {
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchActionFees.fulfilled, (state, action) => {
      state.fees = action.payload;
    });
    builder.addCase(fetchEstimatedGasUsage.fulfilled, (state, action) => {
      state.estimatedGasUsage = action.payload;
    });
  },
});

export const { setPositionsLoaded } = positionsSlice.actions;

type RegisterArgs = { mero: Mero; pool: Pool; position: Position; value: BigNumber };
type RemoveArgs = { mero: Mero; pool: Pool; position: Position };

export const registerPosition = createAsyncThunk(
  "positions/register",
  async ({ mero, pool, position, value }: RegisterArgs, { dispatch }) => {
    const tx = await mero.registerPosition(pool, position, value);
    handleTransactionConfirmation(
      tx,
      { action: "Register", args: { plainPosition: toPlainPosition(position) } },
      dispatch,
      [
        fetchPositions({ mero }),
        fetchBalances({ mero, pools: [pool] }),
        fetchAllowances({ mero, pools: [pool] }),
        fetchGasBankBalance({ mero }),
      ]
    );
    return tx.hash;
  }
);

export const removePosition = createAsyncThunk(
  "positions/remove",
  async ({ mero, pool, position }: RemoveArgs, { dispatch }) => {
    const tx = await mero.removePosition(position.account, position.protocol);
    handleTransactionConfirmation(
      tx,
      { action: "Remove", args: { plainPosition: toPlainPosition(position) } },
      dispatch,
      [
        fetchPositions({ mero }),
        fetchBalances({ mero, pools: [pool] }),
        fetchAllowances({ mero, pools: [pool] }),
        fetchGasBankBalance({ mero }),
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

export const selectEstimatedGasUsage = (state: RootState): Optional<ScaledNumber> =>
  state.positions.estimatedGasUsage
    ? ScaledNumber.fromPlain(state.positions.estimatedGasUsage)
    : null;

export default positionsSlice.reducer;
