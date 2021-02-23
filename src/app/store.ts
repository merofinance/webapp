import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import poolsReducer from "../features/pools-list/poolsListSlice";
import userReducer from "../features/user/userSlice";
import positionsReducer from "../features/positions/positionsSlice";

export const store = configureStore({
  reducer: {
    pools: poolsReducer,
    user: userReducer,
    positions: positionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
